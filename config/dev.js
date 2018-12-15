module.exports = {
    db:{
        database: 'project-prod',
        login: 'postgres',
        password: 'admin',
        host: '127.0.0.1',
        dialect:'postgres',
        port:5432,
        pool: {
            max: 10,
            min: 0,
            acquire: 30000,
            idle: 10000,
          },
    },
    upload: './server/public/upload',
    jwt:{
        secret: 'jwt'
    },
    development: {
        username: "postgres",
        password: "admin",
        database: "project-prod",
        host: "127.0.0.1",
        dialect: "postgres"
      }   
}