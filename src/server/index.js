'use strict';
// THIS IS OUR START FOR SOCKET IO
// this file will emit all of our socket business

require('dotenv').config();

const { Server }  = require('socket.io');
const PORT = process.env.PORT || 3002;

const io = new Server(PORT);

const flightDeck = io.of('/flightDeck');


io.on('connection', socket =>{
  console.log('client:', socket.id);
});

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
  socket.on('DEPARTURE', (payload) => {
    logEvent('DEPARTURE',payload);
    socket.broadcast.emit('DEPARTURE', payload);
  });
  socket.on('IN-FLIGHT', (payload) => {
    logEvent('IN-FLIGHT',payload);
    socket.broadcast.emit('IN-FLIGHT', payload);
  });
  socket.on('LANDED', (payload) => {
    logEvent('LANDED',payload);
    socket.broadcast.emit('LANDED: ', payload);
  });

});

function logEvent(event, payload){
  let time = new Date();
  console.log('EVENT', {event, time, payload});
}


module.exports = { Server, io, flightDeck }
