// Application entrypoint.

// Load up the application styles
require("../styles/application.scss");
require("../styles/home.scss");

// Render the top-level React component
import React from 'react';
import ReactDOM from 'react-dom';
import App from './App.jsx';

var data = {
  currentUser: {name: "Bob"}, // optional. if currentUser is not defined, it means the user is Anonymous
  messages: [
    {
      username: "Bob",
      content: "Has anyone seen my marbles?",
    },
    {
      username: "Anonymous",
      content: "No, I think you lost them. You lost your marbles Bob. You lost them for good."
    }
  ]
};

ReactDOM.render(<App nameObj={data.currentUser} messagesArr={data.messages}/>, document.getElementById('react-root'));
