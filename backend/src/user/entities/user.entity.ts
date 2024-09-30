import { ApiProperty } from '@nestjs/swagger';
import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  UpdateDateColumn,
} from 'typeorm';

@Entity('users')
export class User {
  @ApiProperty({ example: 1, description: 'The unique identifier of the user' })
  @PrimaryGeneratedColumn()
  id: number;

  @ApiProperty({ example: 'user@example.com', description: 'The email of the user' })
  @Column({ unique: true })
  email: string;

  @ApiProperty({ example: 'hashed_password', description: 'The hashed password of the user' })
  @Column()
  password: string;

  @ApiProperty({ example: 'user', description: 'The role of the user (e.g., user, admin)' })
  @Column({ default: 'user' })
  role: string;

  @ApiProperty({ example: '2024-09-27T20:19:34.485Z', description: 'The date the user was created' })
  @CreateDateColumn()
  createdAt: Date;

  @ApiProperty({ example: '2024-09-27T20:19:34.485Z', description: 'The date the user was last updated' })
  @UpdateDateColumn()
  updatedAt: Date;
}