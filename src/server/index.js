'use strict';
// THIS IS OUR START FOR SOCKET IO
// this file will emit all of our socket business

require('dotenv').config();
const PORT = 3002;
const { Server }  = require('socket.io');
const io = new Server(PORT);
const flightDeck = io.of('/flightDeck');
const { FlightModel } = require('../auth/models/index')
// const authRouter = require('../auth/router/index')


io.on('connection', (socket)=>{
  console.log('client:', socket.id);
  
});

// FLIGHT DECK IS THE NAMESPACE maybe as phone number???
flightDeck.on('connection', (socket) => {
    // maybe add , before +
  console.log('You are now connected to the Flight Deck: ', socket.id);

  // this functionality might not be working right now 
  socket.on('JOIN', (room) => {
    console.log(`You have joined room: ${room}`);
    socket.join(room);
  });

  //departureStatus
  //in-flight
  //ConfirmLanded


  // THIS IS GRABBING ANYTHING THAT EMITS TO THE EVENT FLIGHTNUMBER. WHICH IS INSIDE CLIENT.
  socket.on('FLIGHTNUMBER', (payload) => {
    logEvent('FLIGHTNUMBER',payload);
    socket.broadcast.emit('FLIGHTNUMBER',(payload));
  });



  socket.on('DEPARTURE', async (payload) => {

    logEvent('DEPARTURE', payload);
    
    // this is what we want to do to add the payload to the database.
  //**NEED TO ADD OTHER DATA COLUMNS HERE
      let flights = {
          airline: payload.airline,
          flightNumber: payload.flightNumber,
          departureAirport: payload.departureAirport, 
          departureTime: payload.departureTime,
          arrivalAirport: payload.arrivalAirport,
          arrivalTime: payload.arrivalTime,
          flightStatus: payload.flightStatus,
          customerID: 1,
      }
      let allFlights = await FlightModel.readAll()
      // console.log(allFlights.response.flights.dataValues.id)
      let response = await FlightModel.create(flights);
      console.log('response:', response);
      // console.log('response1:', response1);

    // SPECIFIC ROOM NOT BROADCASTING TO EVERYTHING => socket.broadcast.emit to room.broadcast.emit
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
