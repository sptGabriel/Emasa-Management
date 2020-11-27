import { Migration } from '@mikro-orm/migrations';

export class Migration20201104231203 extends Migration {

  async up(): Promise<void> {
    this.addSql('alter table "supplied_products" add constraint "supplied_products _pkey" primary key ("product_id", "supply_id");');
 }

}
