import { UpdateAuthDto } from './dto/update-auth.dto';
import { LoginAuthDto } from './dto/login-auth.dto';
import { CreateAuthDto } from './dto/create-auth.dto';
import { AuthService } from './auth.service';
import {
  Body,
  Controller,
  Get,
  HttpStatus,
  Param,
  Patch,
  Post,
  Res,
} from '@nestjs/common';
import { ErrorResponseDTO } from 'src/utils/helpers';
import { Public } from './decorator';
import { ApiCookieAuth } from '@nestjs/swagger';

@ApiCookieAuth()
@Controller('auth')
export class AuthController {
  constructor(private authserVice: AuthService) {}

  @Public()
  @Post('/signup')
  async singup(@Body() body: CreateAuthDto, @Res() res): Promise<any> {
    try {
      const user = await this.authserVice.signUp(body);
      return res.status(HttpStatus.CREATED).json({
        message: 'Signup Successfull...!',
      });
    } catch (error) {
      return res.status(HttpStatus.BAD_REQUEST).json({
        message: 'fail',
        error: new ErrorResponseDTO(error),
        // error,
      });
    }
  }

  @Public()
  @Post('/login')
  async login(@Body() body: LoginAuthDto, @Res() res): Promise<any> {
    try {
      const { token } = await this.authserVice.signin(body);
      res.cookie('jwt', token, {
        secure: true,
        httpOnly: true,
        Path: '/',
        domain: 'localhost',
        expires: new Date(Date.now() + 1000 * 60 * 10),
      });
      return res.status(HttpStatus.OK).json({
        message: 'success',
      });
    } catch (error) {
      return res.status(HttpStatus.BAD_REQUEST).json({
        message: 'fail',
        error: new ErrorResponseDTO(error),
      });
    }
  }

  // @Public()
  @Get('/users')
  async getUsers(@Res() res): Promise<any> {
    try {
      const users = await this.authserVice.getUsers();
      return res.status(HttpStatus.OK).json({
        message: 'success',
        users,
      });
    } catch (error) {
      return res.status(HttpStatus.BAD_REQUEST).json({
        message: 'fail',
        error: new ErrorResponseDTO(error),
      });
    }
  }

  @Public()
  @Patch('/gender/:id')
  async updateGender(
    @Body() gender: UpdateAuthDto,
    @Param() id,
    @Res() res,
  ): Promise<any> {
    try {
      const user = await this.authserVice.updateUser(id.id, gender);
      if (user) {
        return res.status(HttpStatus.OK).json({
          message: 'success',
          user,
        });
      }
    } catch (error) {
      return res.status(HttpStatus.BAD_REQUEST).json({
        message: 'fail',
        error: new ErrorResponseDTO(error),
      });
    }
  }
}
