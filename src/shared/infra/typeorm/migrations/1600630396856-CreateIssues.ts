import { MigrationInterface, QueryRunner, Table } from 'typeorm';

export default class CreateIssues1600630396856 implements MigrationInterface {
 public async up(queryRunner: QueryRunner): Promise<void> {
  await queryRunner.createTable(
   new Table({
    name: 'issues',
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
      name: 'volume',
      type: 'integer',
     },
     {
      name: 'number',
      type: 'integer',
      isNullable: true,
     },
     {
      name: 'description',
      type: 'varchar',
      isNullable: true,
     },
     {
      name: 'publishing_date',
      type: 'timestamp',
      isNullable: true,
     },
     {
      name: 'is_special',
      type: 'boolean',
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
  await queryRunner.dropTable('issues');
 }
}
