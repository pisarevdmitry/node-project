module.exports = {
    db:{
        database: 'loftschool-project',
        login: 'postgres',
        password: 'admin',
        host: 'localhost',
        dialect:'postgres',
        pool: {
            max: 5,
            min: 0,
            acquire: 30000,
            idle: 10000,
          },
    }   
}