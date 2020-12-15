import { Migration } from '@mikro-orm/migrations';
export class Migration20201104231209 extends Migration {
  async up(): Promise<void> {
    return this.getKnex()
      .schema.hasTable('allowed_user_ipsv4')
      .then(exists => {
        if (exists) return;
        return this.getKnex()
          .schema // **** udpate
          .createTable('allowed_user_ipsv4', async table => {
            table.uuid('employee_id').primary().notNullable().unique();
            table.string('ip_address');
            table.boolean('valid').notNullable()
          });
      });
  }
  async down(): Promise<void> {
    return this.getKnex().schema.dropTable('allowed_user_ipsv4');
  }
}
