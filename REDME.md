Welcome to api rest for "animalfriends"

Package installled :

    #Database :
        *npm i @adonisjs/lucid@alpha
        
        *node ace invoke @adonisjs/lucid

        *npm install mysql or npm install mysql
        (If your driver is another, define in config/database.ts file)

        *Verify config params in .env file

        #Migrations :
            If do you have problems with timestamp when try migrate with mysql

            table.timestamps(true,true) or table.timestamp('created_at').notNullable().defaultTo(this.raw('CURRENT_TIMESTAMP'))
        
    #Auth

        *npm i @adonisjs/auth@alpha

        *node ace invoke @adonisjs/auth

        node ace migration:run

        *npm i @adonisjs/session

        *npm i phc-argon2

