const path = require('path')
const express = require('express')
const morgan = require('morgan')
const bodyParser = require('body-parser')
const compression = require('compression')
// const passport = require('passport')
// const db = require('./db')

const PORT = process.env.PORT || 3000
const app = express();
const server = require('http').Server(app);
const io = require('socket.io')(server);

if (process.env.NODE_ENV !== 'production') require('../secrets')

// passport registration
// passport.serializeUser((user, done) => done(null, user.id))
// passport.deserializeUser((id, done) =>
//   db.models.user.findById(id)
//     .then(user => done(null, user))
//     .catch(done))

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

app.use((req, res, next) => {
  if (path.extname(req.path).length) {
    const err = new Error('Not found')
    err.status = 404
    next(err)
  } else {
    next()
  }
})

// error handling endware
app.use((err, req, res, next) => {
  console.error(err)
  console.error(err.stack)
  res.status(err.status || 500).send(err.message || 'Internal server error.')
})


server.listen(3000, () => console.log(`Mixing it up on port ${PORT}`));

// The event will be called when a client is connected.
io.on('connection', (socket) => {
  io.clients((error, clients) => {
    if (error) throw error;
    console.log(clients); // => [6em3d4TJP8Et9EMNAAAA, G5p55dHhGgUnLUctAAAB]
  });

  socket.on('position', (position) => {
    // console.log('position with id -----------------\n', position)
    socket.broadcast.emit('otherPositions', position);
  })

  socket.on('disconnect', () => {
    // console.log(`Connection ${socket.id} has left the building`)
  })

});

module.exports = app;

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



// position data format
// { data:
//   { timestamp: 1529193901578.266,
//     coords:
//      { speed: -1,
//        latitude: 40.76727216,
//        altitude: 0,
//        longitude: -73.993929,
//        heading: -1,
//        accuracy: 5,
//        altitudeAccuracy: -1 } },
//  id: 'ZmFfArAYiMveFZ6UAAAE' }
