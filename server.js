const http = require('http');
const app = require('./app');
const usersRouter = require('./routes/User');
const indexRouter = require('./routes/index');

const port = process.env.PORT || 3000;

const server = http.createServer(app);

server.listen(port);



module.exports=server;