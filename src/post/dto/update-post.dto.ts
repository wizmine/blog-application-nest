import { IsOptional, IsString } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class UpdatePostDto {
  @ApiProperty({
    type: 'string',
    description: 'Title of the post',
    required: false,
  })
  @IsString()
  @IsOptional()
  title?: string;

  @ApiProperty({
    type: 'string',
    description: 'Description of the post',
    required: false,
  })
  @IsString()
  @IsOptional()
  description?: string;

  @ApiProperty({
    type: 'string',
    description: 'Image URL of the post',
    required: false,
  })
  @IsString()
  @IsOptional()
  image?: string;
}
