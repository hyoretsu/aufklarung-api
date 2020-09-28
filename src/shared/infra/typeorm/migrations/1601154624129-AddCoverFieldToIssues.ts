import { MigrationInterface, QueryRunner, TableColumn } from 'typeorm';

export default class AddCoverFieldToIssues1601154624129 implements MigrationInterface {
 public async up(queryRunner: QueryRunner): Promise<void> {
  await queryRunner.addColumn(
   'issues',
   new TableColumn({
    name: 'cover',
    type: 'varchar',
    isNullable: true,
   }),
  );
 }

 public async down(queryRunner: QueryRunner): Promise<void> {
  await queryRunner.dropColumn('issues', 'cover');
 }
}
