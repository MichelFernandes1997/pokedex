import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';
//import crypto from 'crypto';

export type UserDocument = User & Document;

@Schema()
export class User {
  @Prop({ required: true })
  nickname: string;

  @Prop({
    required: true,
  })
  password: string;

  @Prop({
    unique: true,
    required: true,
  })
  mail: string;
}

export const UserSchema = SchemaFactory.createForClass(User);
