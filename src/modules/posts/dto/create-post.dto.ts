import { ApiProperty } from '@nestjs/swagger';
import { Exclude, Expose } from 'class-transformer';
import { IsNotEmpty, IsOptional } from 'class-validator';
import { PostType } from 'src/entities/posts.entity';
import { User } from 'src/entities/users.entity';

export class CreatePostDto {
  @Expose()
  @ApiProperty()
  @IsNotEmpty()
  title: string;

  @Expose()
  @ApiProperty()
  @IsNotEmpty()
  body: string;

  @Expose()
  @ApiProperty()
  @IsOptional()
  media: string[];

  @Expose()
  @ApiProperty()
  @IsOptional()
  tags: string[];

  @Expose()
  @ApiProperty()
  @IsOptional()
  info: Record<string, any> | null;

  @Expose()
  @ApiProperty()
  @IsOptional()
  likes: number;

  @Expose()
  @ApiProperty()
  @IsOptional()
  postType: PostType;

  @Expose()
  @ApiProperty()
  @IsOptional()
  location: string;

  @Expose()
  @ApiProperty()
  @IsNotEmpty()
  postedBy: User;

  @Expose()
  @ApiProperty()
  @IsOptional()
  comments: Comment[];
}
