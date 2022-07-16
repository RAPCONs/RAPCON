'use strict';
// THIS IS OUR START FOR SOCKET IO
// this file will emit all of our socket business

require('dotenv').config();
const PORT = 3002;
const { Server }  = require('socket.io');
const io = new Server(PORT);
const flightDeck = io.of('/flightDeck');
const { FlightModel } = require('../auth/models/index')

io.on('connection', (socket)=>{
  console.log('client:', socket.id);
  
});

flightDeck.on('connection', (socket) => {
  console.log('You are now connected to the Flight Deck: ', socket.id);

  socket.on('JOIN', (room) => {
    console.log(`You have joined room: ${room}`);
    socket.join(room);
  });

  // THIS IS GRABBING ANYTHING THAT EMITS TO THE EVENT FLIGHTNUMBER. WHICH IS INSIDE CLIENT.
  socket.on('FLIGHTNUMBER', (payload) => {
    logEvent('FLIGHTNUMBER',payload);
    socket.broadcast.emit('FLIGHTNUMBER',(payload));
  });



  socket.on('DEPARTURE', async (payload) => {

    logEvent('DEPARTURE', payload);
    
    // this is what we want to do to add the payload to the database.
      let flights = {
          airline: payload.airline,
          flightNumber: payload.flightNumber,
          departureAirport: payload.departureAirport, 
          departureTime: payload.departureTime,
          departureGate: payload.departureGate,
          aircraftSpeed: payload.speed,
          arrivalAirport: payload.arrivalAirport,
          arrivalTime: payload.arrivalTime,
          arrivalGate: payload.arrivalGate,
          baggageClaim: payload.baggageClaim,
          flightStatus: payload.flightStatus,
          customerID: 1,
      }
      let response = await FlightModel.create(flights);
      console.log('response:', response);

    flightDeck.emit('DEPARTURE', payload);
  });

  // Making sure this is getting that departure payload and checking the flight status of it
  socket.on('EN-ROUTE', (payload) => {
    logEvent('EN-ROUTE',payload);
    flightDeck.emit('EN-ROUTE', payload);
  });

  //  delivers a message to user that flight has officially landed
  socket.on('LANDED', (payload) => {
    logEvent('LANDED',payload);
    flightDeck.emit('LANDED', payload);
  });
});

function logEvent(event, payload){
  let time = new Date();
  console.log('EVENT', {event, time, payload});
}


module.exports = { Server, io, flightDeck }
