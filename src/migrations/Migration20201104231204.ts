// import { Migration } from '@mikro-orm/migrations';
// export class Migration20201104231204 extends Migration {
//   async up(): Promise<void> {
//     return this.getKnex()
//       .schema.hasTable('departament_has_components')
//       .then(exists => {
//         if (exists) return;
//         return this.getKnex()
//           .schema // **** udpate
//           .createTable('departament_has_components', async table => {
//             table
//               .uuid('departament_id')
//               .references('departaments.id')
//               .notNullable();
//             table
//               .uuid('component_id')
//               .references('components.id')
//               .notNullable();
//             table.unique(['departament_id', 'component_id']);
//             table.timestamp('created_at').defaultTo(this.getKnex().fn.now());
//             table.timestamp('updated_at').defaultTo(this.getKnex().fn.now());
//             table.timestamp('deleted_at');
//           });
//       });
//   }
//   async down(): Promise<void> {
//     return this.getKnex().schema.dropTable('departament_has_components');
//   }
// }
