import { MigrationInterface, QueryRunner, Table, TableForeignKey } from 'typeorm';

export default class CreateArticles1628561164255 implements MigrationInterface {
 public async up(queryRunner: QueryRunner): Promise<void> {
  await queryRunner.createTable(
   new Table({
    name: 'articles',
    columns: [
     {
      name: 'id',
      type: 'uuid',
      isPrimary: true,
      generationStrategy: 'uuid',
      default: 'uuid_generate_v4()',
     },
     { name: 'title', type: 'varchar' },
     { name: 'file', type: 'varchar' },
     { name: 'section', type: 'varchar' },
     {
      name: 'sponsor',
      type: 'varchar',
      isNullable: true,
     },
     { name: 'reference_list', type: 'varchar' },
     {
      name: 'issue_id',
      type: 'uuid',
      isNullable: true,
     },
     {
      name: 'created_at',
      type: 'timestamp',
      default: 'now()',
     },
     {
      name: 'updated_at',
      type: 'timestamp',
      default: 'now()',
     },
    ],
   }),
  );

  await queryRunner.createForeignKey(
   'articles',
   new TableForeignKey({
    name: 'ArticleIssue',
    columnNames: ['issue_id'],
    referencedTableName: 'issues',
    referencedColumnNames: ['id'],
    onDelete: 'SET NULL',
    onUpdate: 'CASCADE',
   }),
  );

  await queryRunner.createTable(
   new Table({
    name: 'articles_authors',
    columns: [
     {
      name: 'id',
      type: 'uuid',
      isPrimary: true,
      generationStrategy: 'uuid',
      default: 'uuid_generate_v4()',
     },
     {
      name: 'article_id',
      type: 'uuid',
      isNullable: true,
     },
     {
      name: 'user_id',
      type: 'uuid',
      isNullable: true,
     },
     {
      name: 'created_at',
      type: 'timestamp',
      default: 'now()',
     },
     {
      name: 'updated_at',
      type: 'timestamp',
      default: 'now()',
     },
    ],
   }),
  );

  await queryRunner.createForeignKeys('articles_authors', [
   new TableForeignKey({
    name: 'ArticleAuthor',
    columnNames: ['user_id'],
    referencedTableName: 'users',
    referencedColumnNames: ['id'],
    onDelete: 'SET NULL',
    onUpdate: 'CASCADE',
   }),
   new TableForeignKey({
    name: 'ArticleArticle',
    columnNames: ['article_id'],
    referencedTableName: 'articles',
    referencedColumnNames: ['id'],
    onDelete: 'SET NULL',
    onUpdate: 'CASCADE',
   }),
  ]);
 }

 public async down(queryRunner: QueryRunner): Promise<void> {
  await queryRunner.dropForeignKey('articles_authors', 'ArticleArticle');
  await queryRunner.dropForeignKey('articles_authors', 'ArticleAuthor');

  await queryRunner.dropTable('articles_authors');

  await queryRunner.dropForeignKey('articles', 'ArticleIssue');

  await queryRunner.dropTable('articles');
 }
}
