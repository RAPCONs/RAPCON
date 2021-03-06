'use strict';

require('dotenv').config();
const accountSid = process.env.TWILIO_ACCOUNT_SID;
const authToken = process.env.TWILIO_AUTH_TOKEN;
const twilio = require('twilio');


var prompt = require('prompt-sync')();
let flightNumber = prompt('What is your flightNumber?: ');
let phoneNumber = prompt('What is your phone number?');

// to listen to DEPARTURE, IN-FLIGHT and LANDED

const { io } = require('socket.io-client');

const socket = io('http://localhost:3002/flightDeck');

let room = 'USER1';
socket.emit('JOIN', room);


socket.emit('FLIGHTNUMBER', ({ flightNumber: flightNumber, phoneNumber: phoneNumber }));



socket.on('DEPARTURE', (payload) => {
  if (payload.flightStatus === 'scheduled') {
    console.log(`Flight number ${payload.airline}${payload.flightNumber} is ${payload.flightStatus} to depart ${payload.departureTime} from gate ${payload.departureGate}`);
    console.log(payload.phoneNumber);

    const client = new twilio(accountSid, authToken)
    client.messages
      .create({
        body: `Flight number ${payload.airline}${payload.flightNumber} is ${payload.flightStatus} to depart ${payload.departureTime} from gate ${payload.departureGate}`,
        from: '+14062956298',
        to: `+1${payload.phoneNumber}`
      })
      .then(message => console.log(message.sid));
  }
  socket.emit('EN-ROUTE', payload);
});

socket.on('EN-ROUTE', (payload) => {
  if (payload.flightStatus === 'en-route' && payload.speed > 0) {
    console.log(`Flight Number ${payload.airline}${payload.flightNumber} is currently ${payload.flightStatus}`)
    console.log(payload.phoneNumber);

    const client = new twilio(accountSid, authToken)
    client.messages
      .create({
        body: `Flight Number ${payload.airline}${payload.flightNumber} is currently ${payload.flightStatus}`,
        from: '+14062956298',
        to: `+1${payload.phoneNumber}`
      })
      .then(message => console.log(message.sid));
  }
  socket.emit('LANDED', payload);
})

socket.on('LANDED', (payload) => {

  if (payload.flightStatus === 'landed' || payload.speed === 0 && payload.flightStatus !== 'scheduled' && payload.flightStatus === 'en-route') {
    console.log(`Flight Number ${payload.airline}${payload.flightNumber} has landed.`);
    console.log(payload.phoneNumber);

    const client = new twilio(accountSid, authToken)
    client.messages
      .create({
        body: `Flight Number ${payload.airline}${payload.flightNumber} has landed.`,
        from: '+14062956298',
        to: `+1${payload.phoneNumber}`
      })
      .then(message => console.log(message.sid));
  }
})


