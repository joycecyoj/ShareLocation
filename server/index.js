const path = require('path')
const express = require('express')
const morgan = require('morgan')
const http = require('http')
const bodyParser = require('body-parser')
const compression = require('compression')
const WebSocket = require('ws');
// const passport = require('passport')

// const db = require('./db')

const PORT = process.env.PORT || 3000
const app = express();
const server = http.createServer(app)


if (process.env.NODE_ENV !== 'production') require('../secrets') //Put the keys in secrets file then put the secrets file in the .gitignore file

// passport registration
// passport.serializeUser((user, done) => done(null, user.id))
// passport.deserializeUser((id, done) =>
//   db.models.user.findById(id)
//     .then(user => done(null, user))
//     .catch(done))

// const createApp = () => {
  // logging middleware
  app.use(morgan('dev'))

  // body parsing middleware
  app.use(bodyParser.json())
  app.use(bodyParser.urlencoded({ extended: true }))

  // compression middleware
  app.use(compression())
  //when we're sending datas back to the client, we will compress it then send it so it will make the quicker by 1/5 the time

  // session middleware with passport
  // app.use(session({
  //   secret: process.env.SESSION_SECRET || 'my best friend is Cody',
  //   store: sessionStore,
  //   resave: false,
  //   saveUninitialized: false
  // }))
  // app.use(passport.initialize())
  // app.use(passport.session())


  // auth and api routes
  // app.use('/auth', require('./auth'))
  // app.use('/api', require('./api'))

  // static file-serving middleware
  // app.use(express.static(path.join(__dirname, '..', 'public')))
  //path.join is just an utility method that tells our dir
  // any remaining requests with an extension (.js, .css, etc.) send 404
  app.use((req, res, next) => {
    if (path.extname(req.path).length) {
      const err = new Error('Not found')
      err.status = 404
      next(err)
    } else {
      next()
    }
  })

  // sends index.html
  // app.use('*', (req, res) => {
  //   res.sendFile(path.join(__dirname, '..', 'public/index.html'))
  // })

  // error handling endware
  app.use((err, req, res, next) => {
    console.error(err)
    console.error(err.stack)
    res.status(err.status || 500).send(err.message || 'Internal server error.')
  })
// }


// Map objects to map sockets and users
// let clients = {};
// let users = {};


// The event will be called when a client is connected.
// websocket.on('connection', (socket) => {
//   console.log('A client just joined on', socket.id);
//   clients[socket.id] = socket;
//   socket.on('userLocationData', (userlocationData) => onUserLocationReceived(userLocationData, socket));
// });

const wss = new WebSocket.Server({ server });

wss.on('connection', function connection(ws) {
  // ws.on('message', function incoming(message) {
  //   console.log('received: %s', message);
  // });
  ws.send('something from server===================');
});

  // start listening (and create a 'server' object representing our server)
  server.listen(PORT, () => console.log(`Mixing it up on port ${PORT}`))

  module.exports = app;



// Event Listeners
// When user sends location
function onUserLocationReceived(userlocation, senderSocket) {
  _sendAndSaveUserLocation(userlocation, senderSocket);
}



// Helper Functions
function _sendAndSaveUserLocation(userlocation, socket, fromServer) {
  let userLocationData = {
    latitude: userlocation.latitude,
    longitude: userlocation.longitude,
    timestamp: userlocation.timestamp
  };


(err, userlocationData) => {
    // if userLocationData is from server, send to everyone
    let emitter = fromServer ? websocket : socket.broadcast;
    emitter.emit('userLocationData', userlocationData)
  }
}


// This evaluates as true when this file is run directly from the command line,
// i.e. when we say 'node server/index.js' (or 'nodemon server/index.js', or 'nodemon server', etc)
// It will evaluate false when this module is required by another module - for example,
// if we wanted to require our app in a test spec
// if (require.main === module) {
//   sessionStore.sync()
//     .then(syncDb)
//     .then(createApp)
//     .then(startListening)
// } else {
//   createApp()
// }
