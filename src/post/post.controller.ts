import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  HttpCode,
  ValidationPipe,
  UsePipes,
  UseInterceptors,
  UploadedFile,
} from '@nestjs/common';
import { PostService } from './post.service';
import { CreatePostDto } from './dto/create-post.dto';
import { UpdatePostDto } from './dto/update-post.dto';
import { ApiTags, ApiOperation, ApiBody } from '@nestjs/swagger';
import { FileInterceptor } from '@nestjs/platform-express';
import { diskStorage } from 'multer';
import { extname } from 'path';

@ApiTags('posts')
@Controller('post')
export class PostController {
  constructor(private readonly postService: PostService) {}

  @UsePipes(new ValidationPipe())
  @HttpCode(200)
  @Post()
  @ApiOperation({ summary: 'Create a new post' })
  @ApiBody({ type: CreatePostDto })
  async addPost(@Body() createPostDto: CreatePostDto) {
    const generatedId = await this.postService.createPost(
      createPostDto.title,
      createPostDto.description,
      createPostDto.image,
    );
    return { id: generatedId };
  }

  @Post('upload')
  @HttpCode(200)
  @UseInterceptors(
    FileInterceptor('file', {
      storage: diskStorage({
        destination: './uploads',
        filename: (req, file, cb) => {
          const uniqueSuffix =
            Date.now() + '-' + Math.round(Math.random() * 1e9);
          const ext = extname(file.originalname);
          const filename = `${uniqueSuffix}${ext}`;
          cb(null, filename);
        },
      }),
      limits: { fileSize: 1024 * 1024 * 5 },
    }),
  )
  @ApiOperation({ summary: 'Upload a file' })
  uploadFile(@UploadedFile() file: Express.Multer.File) {
    return {
      message: 'File uploaded successfully',
      filePath: `/uploads/${file.filename}`,
    };
  }

  @UsePipes(new ValidationPipe())
  @HttpCode(200)
  @Get()
  @ApiOperation({ summary: 'Get all posts' })
  getAllPosts() {
    return this.postService.getPosts();
  }

  @UsePipes(new ValidationPipe())
  @HttpCode(200)
  @Get(':id')
  @ApiOperation({ summary: 'Get post by ID' })
  getPost(@Param('id') postId: string) {
    return this.postService.getSinglePost(postId);
  }

  @UsePipes(new ValidationPipe())
  @HttpCode(200)
  @Patch(':id')
  @ApiOperation({ summary: 'Update a post by ID' })
  @ApiBody({ type: UpdatePostDto })
  updatePost(
    @Param('id') postId: string,
    @Body() updatePostDto: UpdatePostDto,
  ) {
    return this.postService.updatePost(
      postId,
      updatePostDto.title,
      updatePostDto.description,
      updatePostDto.image,
    );
  }

  @UsePipes(new ValidationPipe())
  @HttpCode(200)
  @Delete(':id')
  @ApiOperation({ summary: 'Delete a post by ID' })
  removePost(@Param('id') postId: string) {
    return this.postService.deletePost(postId);
  }
}
