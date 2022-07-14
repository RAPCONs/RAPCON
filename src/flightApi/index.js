'use strict';
require('dotenv').config();
const axios = require('axios');



const { io } = require('socket.io-client');


const socket = io('http://localhost:3002/flightDeck');



// THis is not properly setup for rooms
// let flightHub = 'flightHub';
// socket.emit('JOIN', flightHub);


socket.on('FLIGHTNUMBER', (payload) => {

  // console.log(payload);
  logEvent('FLIGHTNUMBER', payload.flight);

  // let flightNumber = payload.flight;

  setInterval(async () => {

    console.log(payload.flight)
    //let flightNumber= payload.flight;
    if (payload.flightNumber.length >= 3 && payload.flightNumber.length <= 6) {

      // AWAIT BUSINESS
      const url = (`https://airlabs.co/api/v9/flight?flight_iata=${payload.flight}&api_key=${process.env.API_KEY}`);
      let flightInfo = await axios.get(url);
      const flightData = flightInfo.data;
      let flightDataObject = flightData.response;

      console.log(flightDataObject);
      // PAYLOAD
      let flight = {
        phoneNumber: payload.phoneNumber,
        airline: flightDataObject.airline_iata,
        flightNumber: flightDataObject.flight_number,
        speed: flightDataObject.speed,
        departureAirport: flightDataObject.dep_iata,
        departureTime: flightDataObject.dep_time,
        departureGate: flightDataObject.dep_gate,
        arrivalAirport: flightDataObject.arr_iata,
        arrivalTime: flightDataObject.arr_time,
        arrivalGate: flightDataObject.arr_gate,
        baggageClaim: flightDataObject.arr_baggage,
        flightStatus: flightDataObject.status,
      }

      // utilize flightStatus to trigger notifications through socketServer

      socket.emit('DEPARTURE', flight);


    } else { console.log('Please input a valid flight number. -> Restart flightApi/index.js & Restart client/index.js') }


  }, 20000);
})



function logEvent(event, payload) {
  let time = new Date();
  console.log('EVENT', { event, time, payload });
}

