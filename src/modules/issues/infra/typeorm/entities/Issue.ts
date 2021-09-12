import { Transform } from 'class-transformer';
import { Entity, Column, PrimaryGeneratedColumn, CreateDateColumn, UpdateDateColumn } from 'typeorm';
import { v4 as uuid } from 'uuid';

import uploadConfig from '@config/upload';

@Entity('issues')
export default class Issue {
 @PrimaryGeneratedColumn('uuid')
 id = uuid();

 @Column()
 title: string;

 @Column()
 volume: number;

 @Column()
 number: number;

 @Column()
 description: string;

 @Column()
 publishing_date: Date;

 @Column()
 is_special: boolean;

 @CreateDateColumn()
 created_at = new Date();

 @UpdateDateColumn()
 updated_at = new Date();

 @Column()
 @Transform(({ value: cover }) => {
  if (!cover) {
   return null;
  }

  // Determines which mask to apply based on storage solution
  switch (uploadConfig.driver) {
   case 'disk':
    return `${process.env.APP_API_URL}/files/${cover}`;
   default:
    return null;
  }
 })
 cover: string;
}
