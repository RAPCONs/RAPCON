'use strict';
// THIS IS OUR START FOR SOCKET IO
// this file will emit all of our socket business

require('dotenv').config();

const { Server }  = require('socket.io');
const PORT = process.env.PORT || 3002;

const io = new Server(PORT);

const flightDeck = io.of('/flightDeck');

flightDeck.on('connection', (socket) => {
    // maybe add , before +
  console.log('You are now connected to the Flight Deck: ', socket.id);

  socket.on('JOIN: ', (room) => {
    console.log(`You have joined room: ${room}`);
    socket.join(room);
  });
  //departureStatus
  //in-flight
  //ConfirmLanded
  socket.on('DEPARTURE: ', (payload) => {
    socket.broadcast.emit('DEPARTURE: ', payload);
  });
});

module.exports = { Server, io, flightDeck }
