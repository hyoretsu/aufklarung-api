import { Column, CreateDateColumn, Entity, PrimaryGeneratedColumn, UpdateDateColumn } from 'typeorm';

@Entity('news')
export default class News {
 @PrimaryGeneratedColumn('uuid')
 id: string;

 @Column()
 title: string;

 @Column()
 description: string;

 @Column()
 body: string;

 @Column()
 publishing_date?: Date;

 @CreateDateColumn()
 created_at: Date;

 @UpdateDateColumn()
 updated_at: Date;
}
