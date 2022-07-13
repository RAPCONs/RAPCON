var prompt = require('prompt-sync')();
let flightNumber = prompt('What is your flightNumber?: ');
// possibly make this into a folder like the vendor client caps 

// to listen to DEPARTURE, IN-FLIGHT and LANDED
// think creating rooms based on phone numbers

const { io } = require('socket.io-client');

const socket = io('http://localhost:3002/flightDeck');

let flightHub = 'flightHub';

socket.emit('JOIN', flightHub);



socket.emit('FLIGHTNUMBER', (
  {
    flight: flightNumber,
    greeting: 'hello',
    object: {banana: 'donkey-kong'}
  }
  ));


console.log(flightNumber);






