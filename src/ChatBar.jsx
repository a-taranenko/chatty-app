import React, {Component} from 'react';

const ChatBar = React.createClass({
  render: function() {
    console.log("Rendering <ChatBar />")
    return (
      <footer>
        <input id="username" type="text" value={this.props.nameObj.name} />
        <input id="new-message" type="text" placeholder="Type a message and hit ENTER" />
      </footer>
    );
  }
});

export default ChatBar;