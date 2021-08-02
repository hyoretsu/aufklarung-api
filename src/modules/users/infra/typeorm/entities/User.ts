import { Column, CreateDateColumn, Entity, PrimaryGeneratedColumn, UpdateDateColumn } from 'typeorm';

@Entity('users')
export default class User {
 @PrimaryGeneratedColumn('uuid')
 id: string;

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
 created_at: Date;

 @UpdateDateColumn()
 updated_at: Date;
}
