/* eslint-disable camelcase */
import { Entity, Column, PrimaryGeneratedColumn, CreateDateColumn, UpdateDateColumn } from 'typeorm';

@Entity('issues')
export default class Issue {
 @PrimaryGeneratedColumn('uuid')
 id: string;

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
 created_at: Date;

 @UpdateDateColumn()
 updated_at: Date;
}
