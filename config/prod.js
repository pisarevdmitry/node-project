const parseDatabaseUrl = require('../lib/parseDatabaseUrl')
const dbconfig = parseDatabaseUrl(process.env.DATABASE_URL)

module.exports = {
    db:{
        database: dbconfig.db,
        login: dbconfig.user,
        password: dbconfig.password,
        host: dbconfig.host,
        dialect:'postgres',
        port:dbconfig.port,
        pool: {
            max: 5,
            min: 0,
            acquire: 30000,
            idle: 10000,
          },
        
    },
    upload: process.env.UPLOAD_PATH,
    jwt:{
        secret: process.env.JWT
    },
    production: {
        username: dbconfig.user,
        password: dbconfig.password,
        database: dbconfig.db,
        host: dbconfig.host,
        ssl: true,
        dialect: "postgres",
        dialectOptions: {
            ssl: true
        }
      }      
}