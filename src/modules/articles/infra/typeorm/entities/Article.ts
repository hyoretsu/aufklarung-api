import {
 Column,
 CreateDateColumn,
 Entity,
 JoinColumn,
 ManyToOne,
 PrimaryGeneratedColumn,
 UpdateDateColumn,
} from 'typeorm';
import { v4 as uuid } from 'uuid';

import Issue from '@modules/issues/infra/typeorm/entities/Issue';

@Entity('articles')
export default class Article {
 @PrimaryGeneratedColumn('uuid')
 id = uuid();

 @Column()
 title: string;

 @Column()
 file: string;

 @Column()
 section: string;

 @Column()
 sponsor?: string;

 @Column()
 reference_list: string;

 @Column()
 issue_id?: string;

 @ManyToOne(() => Issue)
 @JoinColumn({ name: 'issue_id' })
 issue: Issue;

 @CreateDateColumn()
 created_at = new Date();

 @UpdateDateColumn()
 updated_at = new Date();
}
