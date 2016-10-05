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

    setTimeout(() => {
      console.log("Simulating incoming message");

      this.state.messages.push({username: "Michelle", content: "Hello there!"});

      // var myNewArray = this.state.messages.slice();
      // myNewArray.push({username: "Michelle", content: "Hello there!"});

      this.setState({messages: this.state.messages});
    }, 3000);
  },

  nameChange: function(event) {
    this.state.userInput.name = event.target.value;

    if (this.state.userInput.name === "") {
      this.state.userInput.name = "Anonymous";
    }

    this.setState({userInput: this.state.userInput});
  },

  renderOutput: function(event) {
    if (event.charCode === 13) {
      console.log(event.target);

      if (event.target.id === "username") {
        if (event.target.value !== "") {
          this.state.userInput.name = event.target.value;
        } else {
          this.state.userInput.name = "Anonymous";
        }
      } else {
        this.state.userInput.message = event.target.value;
        this.state.messages.push({username: this.state.userInput.name, content: this.state.userInput.message});
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
      <MessageList messagesArr={this.state.messages}/>
      <ChatBar
        userObj={this.state.userInput}
        handleEntry={this.renderOutput}
        handleName={this.nameChange}/>
      </div>
    );
  }
});

export default App;
