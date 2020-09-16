import BaseSchema from '@ioc:Adonis/Lucid/Schema'

export default class UsersSchema extends BaseSchema {
  protected tableUser = 'users'
  protected tableUserData = 'user_data'

  public async up () {

    // Users
    this.schema.createTable(this.tableUser, (table) => {
      table.increments('id').primary()
      table.string('email', 255).notNullable()
      table.boolean('email_confirmed').nullable()
      table.string('password', 100).notNullable()
      table.string('remember_me_token').nullable()
      table.timestamps(true,true)
      table.timestamp('date_confirmed').nullable();
    })

    // User data
    this.schema.createTable(this.tableUserData, (table) => {
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
    this.schema.dropTable(this.tableUser)
    this.schema.dropTable(this.tableUserData)
  }
}
