const axios = require('axios');
const cheerio = require('cheerio');
const cors = require('cors')
const app = require('express')();
app.use(cors());
const http = require('http').createServer(app);

const dotenv = require('dotenv');

var io = require('socket.io')(http, {
    cors: {
      origin: "http://localhost:4401",
      methods: ["GET", "POST"],
      allowedHeaders: ["my-custom-header"],
      credentials: true
    }
  });


dotenv.config();

var port = normalizePort(process.env.PORT || '3005');

io.on('connection', (socket) => {
    console.log('a user connected');
    socket.on('disconnect', () => {
      console.log('user disconnected');
    });

    socket.on('client-get-ip', (msg) => {
      getIpFromPingEu().then((ip)=> {
        io.sockets.emit('server-send-ip', ip);
        console.log(ip);
      })
    });
});
  
http.listen(port, () => {
console.log(`server list port : ${port}`);
});

const getIpFromPingEu = async () => {
  const url = 'https://ping.eu/';
  const response = await axios.get(url);
  const html = response.data;
  const $ = cheerio.load(html);
  const iptext = $('.txt14').text().trim();
  let ip = iptext.replace("Your IP is ", "").trim();
  return ip;
};

function normalizePort(val) {
    var port = parseInt(val, 10);
  
    if (isNaN(port)) {
      // named pipe
      return val;
    }
  
    if (port >= 0) {
      // port number
      return port;
    }
  
    return false;
}

getIpFromPingEu().then((ip) => console.log(ip)).catch((err) => console.error(err));