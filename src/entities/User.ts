import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

@Entity()
export class User {
  @PrimaryGeneratedColumn('uuid')
  userId: string;

  @Column({ unique: true })
  email: string;

  @Column({ unique: true })
  passwordHash: string;

  @Column({ default: 3000 })
  balance: number;

  @Column({ default: 3000 })
  prevBalance: number;

  @Column({ default: 0 })
  profit: number;
}
