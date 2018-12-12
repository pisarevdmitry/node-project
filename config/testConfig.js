module.exports = {
    db:{
        database: 'travis_ci_test',
        login: 'postgres',
        password: '',
        host: '127.0.0.1',
        dialect:'postgres',
        port:5432,
        pool: {
            max: 5,
            min: 0,
            acquire: 30000,
            idle: 10000,
          },
    },
    upload: './server/public/upload',
    jwt:{
        secret: 'jwt'
    },
    test: {
        username: "postgres",
        password: "",
        database: "travis_ci_test",
        host: "127.0.0.1",
        dialect: "postgres"
      }   
}