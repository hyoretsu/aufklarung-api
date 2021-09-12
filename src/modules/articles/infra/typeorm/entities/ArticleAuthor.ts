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

import Article from '@modules/articles/infra/typeorm/entities/Article';
import User from '@modules/users/infra/typeorm/entities/User';

@Entity('articles_authors')
export default class ArticleAuthor {
 @PrimaryGeneratedColumn('uuid')
 id = uuid();

 @Column()
 article_id: string;

 @ManyToOne(() => Article)
 @JoinColumn({ name: 'article_id' })
 article: Article;

 @Column()
 user_id: string;

 @ManyToOne(() => User)
 @JoinColumn({ name: 'user_id' })
 user: User;

 @CreateDateColumn()
 created_at = new Date();

 @UpdateDateColumn()
 updated_at = new Date();
}
