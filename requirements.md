# Requirements

## Vision

*Minimum Length: 3-5 sentences*

¿ What is the vision of the product ?

The vision of RAPCON is to provide status updates of a flight that a user wants to track. Departure, Flight Status, Arival ETA.

To be able to get updates of a family members flight as they travel.

¿ What pain point does this project solve ?

Easier to track flight info.

¿ Why should one care about the product ?

Who doesn't love a sweet flight tracker?
Looking up flight info can be confusing - our goal is to make it as easy as possible and consolodate ALL flights through our tracker.

## User Stories

**User**

*As a user I want see the speed of a flight.*

*feature Tasks:*

- App is able to send speed information regarding a flight.

*Acceptance Tests:*

- Search a flight # and response data would include speed

**Developer**

*As a developer I want to save data to the database*

*feature Tasks:*

- Persisting data locally

*Acceptance Tests:*

- See our saved data via our dev console.

**User**

*As a user I want to recieve status updates on when my mother lands*

*feature Tasks:*

- Subscribe to the socket that permits me to see a flight Number's status

*Acceptance Tests:*

Return a message to the user that shows flight status

**User**

*As a user I want to recieve status updates on when my mother leaves*

*feature Tasks:*

- Subscribe to the socket that permits me to see a flight Number's status

*Acceptance Tests:*

Return a message to the user that shows flight status

**Developer**

*As a Developer I want to get flight information from our API*

*feature Tasks:*

- sign up for AirLabs API
- Extract data from API

*Acceptance Tests:*

Are we recieving useful data as a response.

## Scope (In/Out)

- IN -> - User can receive status updates and info based on  flight number

  - High overview of each. Only need to list 4-5

    - Get flight data from api

    - customers can subscribe to departure socket:
      - airline
      - flight number
      - departure airport
      - departure time
      - departure gate
      - flight Status

    - customers can subscribe to In-flight socket:
      - airline
      - flight number
      - AirCraft speed:
      - Vertical speed: (up for debate)
      - Arrival airport
      - Arrival time
      - Arrival gate
      - flight Status

    - customers can subscribe to Landed socket:
      - airline
      - flight number
      - Arrival airport
      - Arrival time
      - Arrival gate
      - flight Status
      - baggage claim:
  
- OUT -> What will the product *NOT* do?

  - It will not give real time updates
  - the app will not provide location based tracking
  - this app will not be a game

## MVP

 What will your MVP functionality be?

- Customer can subscribe and receive messages to departure, in-flight and landed sockets to get
  information about their specific flight.
- setup basic and bearer auth with RBAC system

What are your stretch goals ?

- Moving everything to AWS cloud
- Implement more roles for the user

## Functional Requirements

List the functionality of your product. This will consist of tasks such as the following:

- A user of the app can subscribe and receive messages to departure, in-flight and landed sockets to get
  information about their specific flight.

- A user can post their profile information.

### Data Flow

Describe the flow of data in your application. Write out what happens from the time the user begins using the app to the time the user is done with the app. Think about the “Happy Path” of the application. Describe through visuals and text what requests are made, and what data is processed, in addition to any other details about how the user moves through the site.

**UML**

![UML](/assets/imgs/Screen%20Shot%202022-07-11%20at%201.54.14%20PM.png)

**Database**

![Database](/assets/imgs/Screen%20Shot%202022-07-11%20at%204.06.24%20PM.png)

## Non-Functional Requirements

Non-functional requirements are requirements that are not directly related to the functionality of the application but still important to the app.

Examples include:

Security--> *Auth granting authorization to those who have been authenticated*

Usability --> *UUID to relate to databases. Modularize our application*

Testability --> *Using jest we will unit test modularized code.*
