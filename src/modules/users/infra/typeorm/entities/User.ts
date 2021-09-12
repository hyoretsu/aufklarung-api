import { Column, CreateDateColumn, Entity, PrimaryGeneratedColumn, UpdateDateColumn } from 'typeorm';
import { v4 as uuid } from 'uuid';

@Entity('users')
export default class User {
 @PrimaryGeneratedColumn('uuid')
 id = uuid();

 @Column()
 first_name: string;

 @Column()
 last_name: string;

 @Column()
 email: string;

 @Column()
 password: string;

 @Column()
 university: string;

 @Column()
 country: string;

 @Column()
 phone?: number;

 @Column()
 orcid?: number;

 @Column()
 lattes?: string;

 @Column()
 is_admin?: boolean;

 @CreateDateColumn()
 created_at = new Date();

 @UpdateDateColumn()
 updated_at = new Date();
}
