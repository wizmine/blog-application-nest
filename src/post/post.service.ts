import { Injectable, NotFoundException } from '@nestjs/common';
import { Post } from './schema/post.schema';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';

@Injectable()
export class PostService {
  constructor(@InjectModel('Post') private readonly postModel: Model<Post>) {}

  async createPost(title: string, desc: string, image: string) {
    const newPost = new this.postModel({
      title: title,
      description: desc,
      image: image,
    });
    const result = await newPost.save();
    return result.id as string;
  }

  async getPosts() {
    const posts = await this.postModel.find().exec();
    return posts.map((post) => ({
      id: post.id,
      title: post.title,
      description: post.description,
      image: post.image,
    }));
  }

  async getSinglePost(postId: string) {
    const post = await this.findPost(postId);
    return {
      id: post.id,
      title: post.title,
      description: post.description,
      image: post.image,
    };
  }

  async updatePost(postId: string, title: string, desc: string, image: string) {
    const updatedPost = await this.findPost(postId);
    if (title) {
      updatedPost.title = title;
    }
    if (desc) {
      updatedPost.description = desc;
    }
    if (image) {
      updatedPost.image = image;
    }
    await updatedPost.save();

    return updatedPost;
  }

  async deletePost(postId: string) {
    const result = await this.postModel.deleteOne({ _id: postId }).exec();
    if (result.deletedCount === 0) {
      throw new NotFoundException('Could not find post.');
    }

    return { message: 'Post deleted successfully' };
  }

  private async findPost(id: string): Promise<Post> {
    const post = await this.postModel.findById(id).exec();
    if (!post) {
      throw new NotFoundException('Could not find post.');
    }
    return post;
  }
}
