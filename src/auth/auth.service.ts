import { LoginAuthDto } from './dto/login-auth.dto';
import { CreateAuthDto } from './dto/create-auth.dto';
import { JwtService } from '@nestjs/jwt';
import {
  HttpException,
  HttpStatus,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { isValidObjectId, Model } from 'mongoose';
import { Auth, AuthDocument } from './schemas/auth.schema';
import * as moment from 'moment';
import * as bcrypt from 'bcrypt';

@Injectable()
export class AuthService {
  constructor(
    @InjectModel(Auth.name) private authModel: Model<AuthDocument>,
    private jwtService: JwtService,
  ) {}

  async isUserExist(email, username?) {
    return await this.authModel.findOne({
      $or: [{ username: username || email }, { email }],
    });
  }

  isValidId(id) {
    if (!isValidObjectId(id)) {
      throw new HttpException('Invalid id', HttpStatus.BAD_REQUEST);
    }
    return true;
  }

  async signUp(user: CreateAuthDto): Promise<any> {
    if (user.password !== user.confirmPassword) {
      throw new HttpException(
        'Password and confirm password are not same',
        HttpStatus.BAD_REQUEST,
      );
    }

    if (await this.isUserExist(user.email, user.username)) {
      throw new HttpException('User already exist', HttpStatus.BAD_REQUEST);
    }

    if (!moment(user.dob, 'YYYY-MM-DD', true).isValid()) {
      throw new HttpException(
        'Please provide valid date',
        HttpStatus.BAD_REQUEST,
      );
    }
    const newUser = new this.authModel(user);
    return await newUser.save();
  }

  async signin(credentials: LoginAuthDto): Promise<any> {
    if (!credentials.email || !credentials.password) {
      throw new HttpException(
        'Please use email / username and password to lgin',
        HttpStatus.BAD_REQUEST,
      );
    }

    const user = await this.isUserExist(credentials?.email);

    if (!user) {
      throw new UnauthorizedException('Invalid Credential');
    }

    const isSame = await bcrypt.compare(credentials.password, user.password);
    if (!isSame) {
      throw new UnauthorizedException('Invalid Credentials');
    }
    return this.signPayload(user.id);
  }

  async getUsers(): Promise<any> {
    return await this.authModel.find().select('-password');
  }

  async updateUser(id, gender): Promise<any> {
    if (!id) {
      throw new HttpException('Invalid id', HttpStatus.BAD_REQUEST);
    }
    const isValid = this.isValidId(id);
    if (isValid) {
      return this.authModel
        .findByIdAndUpdate(id, gender, { new: true })
        .select('-password');
    }
  }

  signPayload(id) {
    return { token: this.jwtService.sign({ sub: id }) };
  }
}
