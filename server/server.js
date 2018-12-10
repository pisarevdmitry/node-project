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
//const cors = require('cors')
const PORT = process.env.PORT || 5000;
const app = express()
const server = http.createServer(app);
const chatService = new chat();
chatService.listen(server)
//app.use(cors())
app.use(cookie())
app.use(bodyParser.text());
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: false }));
require('./services/sequelize');
require('./models');



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
