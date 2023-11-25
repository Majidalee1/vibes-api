import { Injectable } from '@nestjs/common';
import { CreatePostDto } from './dto/create-post.dto';
import { UpdatePostDto } from './dto/update-post.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Post } from 'src/entities/posts.entity';
import { Repository } from 'typeorm';
import { User } from 'src/entities/users.entity';

@Injectable()
export class PostsService {
  constructor(
    @InjectRepository(Post)
    private readonly postRepository: Repository<Post>,
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
  ) {}

  async create(createPostDto: CreatePostDto) {
    const post = this.postRepository.create(createPostDto);

    post.postedBy = await this.userRepository.findOneOrFail({
      where: {
        member_id: createPostDto.postedBy.member_id,
      },
    });

    return this.postRepository.save(post);
  }

  findAll() {
    const response = this.postRepository.find({
      relations: {
        postedBy: true,
      },
    });
    return response;
  }

  findOne(id: string) {
    return this.postRepository.findOne({
      where: {
        id,
      },
      relations: {
        postedBy: true,
      },
    });
  }

  update(id: string, updatePostDto: UpdatePostDto) {
    return this.postRepository.update(id, updatePostDto);
  }

  remove(id: string) {
    return this.postRepository.softDelete(id);
  }
}
