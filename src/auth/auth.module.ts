import { JwtStrategy } from './strategy/jwt.strategy';
import { JwtModule } from '@nestjs/jwt';
import { MongooseModule } from '@nestjs/mongoose';
import { Module } from '@nestjs/common';
import * as bcrypt from 'bcrypt';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { Auth, AuthSchema } from './schemas/auth.schema';

@Module({
  imports: [
    MongooseModule.forFeatureAsync([
      {
        name: Auth.name,
        useFactory: () => {
          const schema = AuthSchema;
          schema.pre('save', async function (next) {
            const auth = this as any as Auth;
            if (!this.isModified('password')) return next();
            auth.password = await bcrypt.hash(auth.password, 12);
            auth.confirmPassword = undefined;
          });
          return schema;
        },
      },
    ]),
    JwtModule.register({
      secret: 'secret',
      signOptions: { expiresIn: '600s' },
    }),
  ],
  controllers: [AuthController],
  providers: [AuthService, JwtStrategy],
})
export class AuthModule {}
