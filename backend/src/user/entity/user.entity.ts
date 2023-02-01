import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  Name: string;

  @Column()
  Username: string;

  @Column()
  Email: string;

  @Column({type: 'bigint'})
  Phone: number;

  @Column()
  Password: string;
}
