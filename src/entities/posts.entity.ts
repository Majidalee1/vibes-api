import { Exclude } from 'class-transformer';
import {
  BaseEntity,
  Column,
  CreateDateColumn,
  DeleteDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

import { Comment } from './comments.entity';
import { User } from './users.entity';

export enum PostType {
  TIMELINE = 'timeline',
  DISCUSSION = 'discussion',
  SHARING = 'sharing',
}

@Entity({ name: 'posts', orderBy: { createdAt: 'DESC' } })
export class Post extends BaseEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ type: 'varchar', length: 200 })
  title: string;

  @Column({ type: 'varchar' })
  body: string;

  @Column({ type: 'json' })
  media: string[];

  @Column({ type: 'json', nullable: true })
  tags: string[];

  @Column({ type: 'json', nullable: true })
  info: Record<string, any> | null;

  @Column({ type: 'integer', default: 0 })
  likes: number;

  @Column({ type: 'boolean', default: false })
  isPrivate: boolean;

  @Column({ type: 'enum', enum: PostType, default: PostType.TIMELINE })
  postType: PostType;

  @Column({ type: 'varchar', length: 200, nullable: true })
  location: string;

  @ManyToOne(() => User, (user) => user.member_id)
  @JoinColumn({ name: 'member_id' })
  postedBy: User;

  @OneToMany(() => Comment, (comment) => comment.post)
  comments: Comment[];

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;

  @DeleteDateColumn()
  deletedAt: Date;
}
