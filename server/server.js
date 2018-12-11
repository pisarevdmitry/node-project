const express = require('express');
const path = require('path');
const cookie = require('cookie-parser');
const bodyParser = require('body-parser');
const http = require('http');
const routes = require('./routes');
const staticPath = path.join(__dirname, 'public');
const { upload } = require('../config');
const fs = require('fs');
const chat = require('./services/chat');

const PORT = process.env.PORT || 5000;
const app = express()
const server = http.createServer(app);
const chatService = new chat();
chatService.listen(server)

app.use(cookie())
app.use(bodyParser.text());
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: false }));
require('./services/sequelize');
require('./models');

const userService = require('./services/userService');
const Service = new userService()
const created = await Service.signUp({
  username :'admin',
  password :'123',
},{
  chat_create: true,
  chat_read: true,
  chat_update: true,
  chat_delete: true,
  news_create: true,
  news_read: true,
  news_update: true,
  news_delete: true,
  setting_create: true,
  setting_read: true,
  setting_update: true,
  setting_delete: true,
})


app.use('/api', routes);

app.use(express.static(staticPath));

app.use('*', (req, res) => {
  res.sendFile(path.resolve(__dirname, staticPath, 'index.html'));
});

server.listen(PORT, () => {
    const uploadPath = path.resolve(process.cwd(), upload);
    if (!fs.existsSync(uploadPath)) {
      fs.mkdirSync(uploadPath);
    }
    console.log(`server listen on Port ${PORT}`)
  });
