import React, {Component} from 'react';
// import Message from './Message.jsx';
import MessageList from './MessageList.jsx';
import ChatBar from './ChatBar.jsx';

const App = React.createClass({
  getInitialState: function() {
    return {currentUser: "", messages: [], notifications: [], users: 0};
  },

  componentDidMount: function() {
    console.log("componentDidMount <App />");

    this.socket = new WebSocket("ws://localhost:4000");

    this.socket.onopen = function(event) {
      console.log("Connected to server", this);
    }

    this.socket.onmessage = (event) => {
      switch(JSON.parse(event.data).type) {
        case "incomingMessage":
          // handle incoming message
          this.state.messages.push(JSON.parse(event.data));
          this.setState({messages: this.state.messages});
          break;
        case "incomingNotification":
          // handle incoming notification
          this.state.notifications.push(JSON.parse(event.data));
          this.setState({notifications: this.state.notifications});
          break;
        case "incomingUserCount":
          // handle incoming user count
          this.state.users = JSON.parse(event.data).userCount;
          this.setState({users: this.state.users});
          break;
        default:
          // show an error in the console if the message type is unknown
          throw new Error("Unknown event type " + data.type);
      }
    }
  },

  renderOutput: function(event) {
    if (event.charCode === 13) {
      var sentMessage = {type: "postMessage", username: this.state.currentUser, content: event.target.value};
      this.socket.send(JSON.stringify(sentMessage));
      event.target.value = "";
    }
  },

  renderNameChange: function(event) {
    if (event.charCode === 13) {
      // if (this.state.currentUser === "") {
      //   if (event.target.value === "") {
      //     this.state.currentUser = "Anonymous";
      //   } else {
      //     this.state.currentUser = event.target.value;
      //   }
      // } else {
      //   if (event.target.value === "") {
      //     var nameUpdateMessage = `${this.state.currentUser} has changed their name to Anonymous`;
      //     var sentNotification = {type: "postNotification", content: nameUpdateMessage};
      //     this.socket.send(JSON.stringify(sentNotification));
      //     this.state.currentUser = "Anonymous";
      //   } else {
      //     var nameUpdateMessage = `${this.state.currentUser} has changed their name to ${event.target.value}`;
      //     var sentNotification = {type: "postNotification", content: nameUpdateMessage};
      //     this.socket.send(JSON.stringify(sentNotification));
      //     this.state.currentUser = event.target.value;
      //   }
      // }
      if (this.state.currentUser === "") {
        this.state.currentUser = event.target.value;
      } else {
        var nameUpdateMessage = `${this.state.currentUser} has changed their name to ${event.target.value}`;
        var sentNotification = {type: "postNotification", content: nameUpdateMessage};
        this.socket.send(JSON.stringify(sentNotification));
        this.state.currentUser = event.target.value;
      }
    }
  },

  render: function() {
    console.log("Rendering <App />");

    return (
      <div>
      <nav>
        <h1>Chatty</h1>
        <div className="user-count">{this.state.users} users online</div>
      </nav>
      <MessageList
        messagesArr={this.state.messages}
        notificationsArr={this.state.notifications}
      />
      <ChatBar
        handleEntry={this.renderOutput}
        handleName={this.renderNameChange}
      />
      </div>
    );
  }
});

export default App;
