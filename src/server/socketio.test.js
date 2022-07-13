'use strict';
// Using socket.io testing code
// https://socket.io/docs/v4/testing/
const { createServer } = require("http");
const { Server } = require("./index");
const Client = require("socket.io-client");

describe("** Listening from the Flight Deck **", () => {
  let io, serverSocket, clientSocket;

  beforeAll((done) => {
    const httpServer = createServer();
    io = new Server(httpServer);
    httpServer.listen(() => {
      const port = httpServer.address().port;
      clientSocket = new Client(`http://localhost:${port}`);
      io.on("connection", (socket) => {
        serverSocket = socket;
      });
      clientSocket.on("connect", done);
    });
  });

  afterAll(() => {
    io.close();
    clientSocket.close();
  });

  test("should work", (done) => {
    clientSocket.on("hello", (arg) => {
      expect(arg).toBe("world");
      done();
    });
    serverSocket.emit("hello", "world");
  });

  test("should work (with ack)", (done) => {
    serverSocket.on("hi", (cb) => {
      cb("hola");
    });
    clientSocket.emit("hi", (arg) => {
      expect(arg).toBe("hola");
      done();
    });
  });
});




// const { io } = require("./index");
// const { Server }  = require("./index");
// const { flightDeck } = require("./index");

// jest.mock('socket.io', () => {
//   return {
//     io: jest.function(() => {
//       return {
//         on: jest.function(),
//         emit: jest.function(),
//       };
//     }),
//   };
// });

// describe('socketServer Test', () => {
//   test('server functionallity', () => {
//     jest.clearAllMocks();
//     let server = new Server(3002);
//     let flightDeck = io.of('/flightDeck');
//     expect(io).toHaveBeenCalled();
//     expect(server.socket.emit).toHaveBeenCalled('JOIN', (room));
//     expect(server.socket.on).toHaveBeenCalled();
//   });
// });
