import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type AuthDocument = Auth & Document;

@Schema({ timestamps: true })
export class Auth {
  @Prop({
    required: [true, 'Please provide first name'],
    type: String,
    trim: true,
  })
  firstName: string;
  @Prop({ type: String, trim: true })
  middleName: string;
  @Prop({
    required: [true, 'Please provide lastname'],
    trim: true,
    type: String,
  })
  lastName: string;
  @Prop({
    required: [true, 'Please provide username'],
    unique: true,
    trim: true,
    lowercase: true,
  })
  username: string;
  @Prop({
    required: [true, 'Please provide email'],
    trim: true,
    unique: true,
    lowercase: true,
  })
  email: string;
  @Prop({ required: [true, 'Please provide dob'], trim: true, type: Date })
  dob: Date;
  @Prop({
    required: [true, 'Please provide your gender'],
    trim: true,
    enum: {
      values: ['Male', 'Female'],
      message: 'Gender should be either male or female',
    },
  })
  gender: string;
  @Prop({
    required: [true, 'Please provide password'],
    trim: true,
    type: String,
  })
  password: string;
  @Prop({
    required: [true, 'Please provide confirm string'],
    trim: true,
    type: String,
    validate: {
      validator: function (cp) {
        return this.password === cp;
      },
      message: 'Password and confirm password are not same',
    },
  })
  confirmPassword: string;
  @Prop({
    enum: {
      values: ['admin', 'user'],
      message: 'Role should be either admin or user',
    },
    default: 'user',
  })
  role: string;
}

export const AuthSchema = SchemaFactory.createForClass(Auth);
