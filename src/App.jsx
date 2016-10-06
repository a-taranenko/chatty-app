import React, {Component} from 'react';
// import Message from './Message.jsx';
import MessageList from './MessageList.jsx';
import ChatBar from './ChatBar.jsx';

const App = React.createClass({
  getInitialState: function() {
    return {userInput: this.props.userObj, messages: this.props.messagesArr};
  },

  componentDidMount: function() {
    console.log("componentDidMount <App />");

    this.socket = new WebSocket("ws://localhost:4000");

    var sentMessage = JSON.stringify(this.state.messages[1]);

    this.socket.onopen = function(event) {
      console.log("Connected to server", this);

      this.send(sentMessage);
    }

    // setTimeout(() => {
    //   console.log("Simulating incoming message");
    //   this.state.messages.push({username: "Michelle", content: "Hello there!"});
    //   this.setState({messages: this.state.messages});
    // }, 3000);
  },

  nameChange: function(event) {
    this.state.userInput.name = event.target.value;
    this.setState({userInput: this.state.userInput});
  },

  renderOutput: function(event) {
    if (event.charCode === 13) {
      if (this.state.userInput.name === "") {
        this.state.userInput.name = "Anonymous";
      }
      this.state.userInput.message = event.target.value;
      this.state.messages.push({username: this.state.userInput.name, content: this.state.userInput.message});
      this.setState({messages: this.state.messages});

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
        userObj={this.state.userInput}
        handleEntry={this.renderOutput}
        handleName={this.nameChange}
      />
      </div>
    );
  }
});

export default App;
