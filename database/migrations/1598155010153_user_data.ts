import BaseSchema from '@ioc:Adonis/Lucid/Schema'

export default class UserData extends BaseSchema {
  protected tableName = 'user_data'

  public async up () {
    this.schema.createTable(this.tableName, (table) => {
      table.increments('id').primary()
      table.integer('user_id').unsigned().references('id').inTable('users').onDelete('CASCADE').notNullable()
      table.string('name',100).notNullable()
      table.string('country',100).nullable()
      table.string('city',100).nullable()
      table.integer('phone',15).nullable()
      table.integer('phone_code',10).nullable()
      table.timestamps(true,true)
    })
  }

  public async down () {
    this.schema.dropTable(this.tableName)
  }
}
