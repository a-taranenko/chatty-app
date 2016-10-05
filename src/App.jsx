import React, {Component} from 'react';
// import Message from './Message.jsx';
import MessageList from './MessageList.jsx';
import ChatBar from './ChatBar.jsx';

const App = React.createClass({
  getInitialState: function() {
    return {messages: []};
  },

  componentDidMount: function() {
    this.setState({messages: this.props.messagesArr});

    console.log("componentDidMount <App />");

    setTimeout(() => {
      console.log("Simulating incoming message");

      // Also possible to write: this.state.messages.push({username: "Michelle", content: "Hello there!"})
      var myNewArray = this.state.messages.slice();
      myNewArray.push({username: "Michelle", content: "Hello there!"});

      this.setState({messages: myNewArray})
    }, 3000);
  },

  render: function() {
    console.log("Rendering <App />");
    return (
      <div>
      <nav>
        <h1>Chatty</h1>
      </nav>
      <MessageList messagesArr={this.state.messages}/>
      <ChatBar nameObj={this.props.nameObj}/>
      </div>
    );
  }
});

export default App;
