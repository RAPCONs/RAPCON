'use strict';
require('dotenv').config();
const axios = require('axios');

const { io } = require('socket.io-client');

const socket = io('http://localhost:3002/flightDeck');

let flightHub = 'flightHub';


socket.emit('JOIN', flightHub);



let flightnumArr = [];

socket.on('FLIGHTNUMBER',(payload)=>{
  let flightNumber = payload.flight;
  
  flightnumArr.push(flightNumber);
})


console.log(flightnumArr);



setInterval(async () => {
    
    
  const url = (`https://airlabs.co/api/v9/flight?flight_iata=${flightNumber}8&api_key=${process.env.API_KEY}`);
  
  let flightInfo = await axios.get(url);
  let flightArr = [];

  const flightData = flightInfo.data;

  let flightDataObject = flightData.response;

  console.log(flightArr);

  Object.keys(flightDataObject).forEach(e => {
    e,flightArr.push(flightDataObject[e]);
  });
  
  let flight = {
    payload: {
      airline: 'hello' ,
      // flightNumber:,
      // departureAirport:,
      // departureTime:,
      // departureGate:,
      // aircraftSpeed:,
      // aircraftVerticalSpeed:,
      // arrivalAirport:,
      // arrivalTime:,
      // arrivalGate:,
      // baggageClaim:,
      // flightStatus:,
      // import uuid at somepoint to get into database: I removed it 
    }
  }


  // utilize flightStatus to trigger notifications through socketServer



  socket.emit('DEPARTURE', flight);
  console.log('HEY THIS IS THE FLIGHT PAYLOAD', flight.payload.airline);
}, 1000);

