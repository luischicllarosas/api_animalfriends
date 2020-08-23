import BaseSchema from '@ioc:Adonis/Lucid/Schema'

export default class Adoptions extends BaseSchema {
  protected tableName = 'adoptions'

  public async up () {
    this.schema.createTable(this.tableName, (table) => {
      table.increments('id').primary()
      table.integer('user_data_id').unsigned().references('id').inTable('user_data').onDelete('CASCADE').notNullable()
      table.string('title',50).notNullable()
      table.string('content',250).notNullable()
      table.json('images').notNullable()
      table.timestamps(true,true)
    })
  }

  public async down () {
    this.schema.dropTable(this.tableName)
  }
}
