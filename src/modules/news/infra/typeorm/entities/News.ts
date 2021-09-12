import { Column, CreateDateColumn, Entity, PrimaryGeneratedColumn, UpdateDateColumn } from 'typeorm';
import { v4 as uuid } from 'uuid';

@Entity('news')
export default class News {
 @PrimaryGeneratedColumn('uuid')
 id = uuid();

 @Column()
 title: string;

 @Column()
 description: string;

 @Column()
 body: string;

 @Column()
 publishing_date?: Date;

 @CreateDateColumn()
 created_at = new Date();

 @UpdateDateColumn()
 updated_at = new Date();
}
