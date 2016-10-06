import React, {Component} from 'react';
// import Message from './Message.jsx';
import MessageList from './MessageList.jsx';
import ChatBar from './ChatBar.jsx';

const App = React.createClass({
  getInitialState: function() {
    return {currentUser: "", messages: []};
  },

  componentDidMount: function() {
    console.log("componentDidMount <App />");

    this.socket = new WebSocket("ws://localhost:4000");

    // var sentMessage = JSON.stringify(this.state.messages[1]);

    this.socket.onopen = function(event) {
      console.log("Connected to server", this);
      // this.send(sentMessage);
    }
  },

  nameChange: function(event) {
    this.state.currentUser = event.target.value;
    this.setState({currentUser: this.state.currentUser});
  },

  renderOutput: function(event) {
    if (event.charCode === 13) {
      if (this.state.currentUser === "") {
        this.state.currentUser = "Anonymous";
      }

      // Step 1
      var sentMessage = {username: this.state.currentUser, content: event.target.value};
      this.socket.send(JSON.stringify(sentMessage));

      // Step 2
      this.socket.onmessage = (event) => {
        this.state.messages.push(JSON.parse(event.data));
        this.setState({messages: this.state.messages});
      }
    }
  },

  render: function() {
    console.log("Rendering <App />");

    return (
      <div>
      <nav>
        <h1>Chatty</h1>
      </nav>
      <MessageList
        messagesArr={this.state.messages}
      />
      <ChatBar
        currentUser={this.state.currentUser}
        handleEntry={this.renderOutput}
        handleName={this.nameChange}
      />
      </div>
    );
  }
});

export default App;
