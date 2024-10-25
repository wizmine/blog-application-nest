import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export interface IPost extends Document {
  id: string;
  image: string;
  title: string;
  description: string;
}

@Schema()
export class Post extends Document {
  @Prop({ required: true })
  image: string;

  @Prop({ required: true })
  title: string;

  @Prop({ required: true })
  description: string;
}

export const PostSchema = SchemaFactory.createForClass(Post);
