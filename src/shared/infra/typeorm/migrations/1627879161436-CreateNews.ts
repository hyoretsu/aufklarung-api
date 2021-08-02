import { MigrationInterface, QueryRunner, Table } from 'typeorm';

export default class CreateNews1627879161436 implements MigrationInterface {
 public async up(queryRunner: QueryRunner): Promise<void> {
  await queryRunner.createTable(
   new Table({
    name: 'news',
    columns: [
     {
      name: 'id',
      type: 'uuid',
      isPrimary: true,
      generationStrategy: 'uuid',
      default: 'uuid_generate_v4()',
     },
     {
      name: 'title',
      type: 'varchar',
     },
     {
      name: 'description',
      type: 'varchar',
     },
     {
      name: 'body',
      type: 'varchar',
     },
     {
      name: 'publishing_date',
      type: 'timestamp',
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
 }

 public async down(queryRunner: QueryRunner): Promise<void> {
  await queryRunner.dropTable('news');
 }
}
