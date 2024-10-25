import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { PostModule } from './post/post.module';

@Module({
  imports: [
    MongooseModule.forRoot(
      'mongodb+srv://admin:wwwwww@cluster0.hdqzm.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0',
    ),
    PostModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
