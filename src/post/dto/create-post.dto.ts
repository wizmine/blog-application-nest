import { IsString, IsNotEmpty } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreatePostDto {
  @ApiProperty({ type: 'string', description: 'Title of the post' })
  @IsString()
  @IsNotEmpty()
  title: string;

  @ApiProperty({ type: 'string', description: 'Description of the post' })
  @IsString()
  @IsNotEmpty()
  description: string;

  @ApiProperty({ type: 'string', description: 'Image URL of the post' })
  @IsString()
  @IsNotEmpty()
  image: string;
}
