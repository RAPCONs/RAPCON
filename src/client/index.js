'use strict';
var prompt = require('prompt-sync')();
let flightNumber = prompt('What is your flightNumber?: ');
// possibly make this into a folder like the vendor client caps 

// to listen to DEPARTURE, IN-FLIGHT and LANDED
// think creating rooms based on phone numbers

const { io } = require('socket.io-client');

// make sure the port is dynamic and referring to env file
const socket = io('http://localhost:3002/flightDeck');


// not properly connecting to rooms revist this please

let room = 'USER1';
socket.emit('JOIN', room);



socket.emit('FLIGHTNUMBER', ({flight: flightNumber}));



socket.on('DEPARTURE', (payload) =>{
if(payload.flightStatus === 'scheduled'){
  console.log(`Flight number ${payload.airline}${payload.flightNumber} is ${payload.flightStatus} to depart ${payload.departureTime} from gate ${payload.departureGate}`);
  }
  socket.emit('EN-ROUTE', payload);
});

socket.on('EN-ROUTE', (payload) =>{
  if(payload.flightStatus === 'en-route'){
    console.log(`Flight Number ${payload.airline}${payload.flightNumber} is currently ${payload.flightStatus}`)
  }
  socket.emit('LANDED',payload);
})


socket.on('LANDED', (payload) =>{
  if(payload.flightStatus === 'landed'){
    console.log(`Flight Number ${payload.airline}${payload.flightNumber} has finally ${payload.flightStatus}. Please head to `)
  }
})


// socket.on('EN-ROUTE', (payload));


// socket.on('Landed',(payload));

// socket.subscribe('DEPARTURE', payload);



