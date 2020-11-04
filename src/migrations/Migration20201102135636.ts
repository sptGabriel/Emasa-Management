import { Migration } from '@mikro-orm/migrations';
export class Migration20201102135636 extends Migration {
  async up(): Promise<void> {
    return this.getKnex()
      .schema.hasTable('employees')
      .then(exists => {
        if (exists) return;
        return this.getKnex()
          .schema // **** udpate
          .createTable('employees', async table => {
            table.uuid('id').notNullable().primary();
            table
              .string('matricula', 100)
              .notNullable()
              .unique('matricula_idx');
            table.string('first_name', 100).notNullable();
            table.string('last_name', 100).notNullable();
            table
              .uuid('departament_id')
              .notNullable()
              .references('departaments.id')
              .onUpdate('CASCADE') // if Article primary key is changed, update this foreign key.
              .onDelete('NO ACTION');
            table
              .enu('position', ['diretor', 'gerente', 'tecnico'])
              .notNullable();
              table.timestamp('created_at').defaultTo(this.getKnex().fn.now());
              table.timestamp('updated_at').defaultTo(this.getKnex().fn.now());
              table.timestamp('deleted_at');
          })
          .then(() =>
            this.getKnex().raw(
              "create unique index employeePosition on employees(position, departament_id) where position <> 'tecnico'",
            ),
          );
      });
  }
  async down(): Promise<void> {
    return this.getKnex().schema.dropTable('employees');
  }
}
