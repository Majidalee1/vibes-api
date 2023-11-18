import { ApiProperty } from '@nestjs/swagger';
import { Exclude, Expose } from 'class-transformer';
import { PostType } from 'src/entities/posts.entity';
import { User } from 'src/entities/users.entity';

export class CreatePostDto {
  @Expose()
  @ApiProperty()
  id: string;

  @Expose()
  @ApiProperty()
  title: string;

  @Expose()
  @ApiProperty()
  body: string;

  @Expose()
  @ApiProperty()
  media: string[];

  @Expose()
  @ApiProperty()
  tags: string[];

  @Expose()
  @ApiProperty()
  info: Record<string, any> | null;

  @Expose()
  @ApiProperty()
  likes: number;

  @Expose()
  @ApiProperty()
  postType: PostType;

  @Expose()
  @ApiProperty()
  location: string;

  @Expose()
  @ApiProperty()
  @Exclude() // Exclude from the response, as it's not needed when creating or updating
  postedBy: User;

  @Expose()
  @ApiProperty()
  comments: Comment[];

  @Expose()
  createdAt: Date;

  @Expose()
  updatedAt: Date;

  @Expose()
  deletedAt: Date;
}
