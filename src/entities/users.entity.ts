// type orm entity
import { Exclude } from 'class-transformer';
import {
  BaseEntity,
  Column,
  CreateDateColumn,
  DeleteDateColumn,
  Entity,
  OneToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { Post } from './posts.entity';
import { Notification } from './notifications.entity';

@Entity({ name: 'users' })
export class User extends BaseEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ type: 'varchar', length: 200 })
  name: string;

  @Column({ type: 'varchar', unique: true })
  email: string;

  @Column({ type: 'varchar', unique: true })
  username: string;

  @Column({ type: 'varchar', length: 200, nullable: true })
  member_id: string;

  @Column({ type: 'varchar', length: 200, default: 'personal' })
  profileType: 'brand' | 'personal';

  @Column({ type: 'json', nullable: true })
  items: {
    [key: string]: any;
  }[];

  // @Exclude()
  @Column({ type: 'varchar' })
  password: string;

  @Column({ type: 'varchar', unique: true })
  phone: string;

  @Column({ type: 'longtext', nullable: true })
  sessionToken: string;

  @OneToMany(() => User, (user) => user.following)
  following: User[];

  @OneToMany(() => Post, (post) => post.postedBy)
  posts: Post[];

  @OneToMany(() => Notification, (notification) => notification.user)
  notifications: Notification[];

  @DeleteDateColumn()
  deletedAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;

  @CreateDateColumn()
  createdAt: string;
}
