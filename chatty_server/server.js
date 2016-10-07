// server.js

const express = require('express');
const SocketServer = require('ws').Server;

// Set the port to 4000
const PORT = 4000;

// Create a new express server
const server = express()
   // Make the express server serve static assets (html, javascript, css) from the /public folder
  .use(express.static('public'))
  .listen(PORT, '0.0.0.0', 'localhost', () => console.log(`Listening on ${ PORT }`));

// Create the WebSockets server
const wss = new SocketServer({ server });

// Set up a callback that will run when a client connects to the server
// When a client connects they are assigned a socket, represented by
// the ws parameter in the callback.
wss.on('connection', (ws) => {
  console.log('Client connected');

  wss.broadcastUsersLogged = function(data) {
    var usersLoggedIn = {type: "incomingUserCount", userCount: data};
    wss.clients.forEach(function(client) {
      client.send(JSON.stringify(usersLoggedIn));
    });
  };
  wss.broadcastUsersLogged(wss.clients.length);

  function generateUUID() {
    var d = new Date().getTime();
    var uuid = 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function(c) {
      var r = (d + Math.random()*16)%16 | 0;
      d = Math.floor(d/16);
      return (c=='x' ? r : (r&0x3|0x8)).toString(16);
    });
    return uuid;
  }

  function responseConstructor(message) {
    if (JSON.parse(message).type === "postMessage") {
      var id = generateUUID();
      var username = JSON.parse(message).username;
      var content = JSON.parse(message).content;
      var response = {type: "incomingMessage", id: id, username: username, content: content};

      return response;
    } else if (JSON.parse(message).type === "postNotification") {
      var content = JSON.parse(message).content;
      var response = {type: "incomingNotification", content: content}

      return response;
    }
  }

  ws.on('message', function(message) {
    // console.log("User", JSON.parse(message).username, "said", JSON.parse(message).content, generateUUID());
    var data = JSON.stringify(responseConstructor(message));

    wss.broadcast = function(data) {
      wss.clients.forEach(function(client) {
        client.send(data);
      });
    };

    wss.broadcast(data);
  });

  // Set up a callback for when a client closes the socket. This usually means they closed their browser.
  ws.on('close', () => {
    console.log('Client disconnected');
    wss.broadcastUsersLogged(wss.clients.length);
  });
});