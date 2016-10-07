import React, {Component} from 'react';
import NameBox from './NameBox.jsx';
import MessageBox from './MessageBox.jsx';

const ChatBar = React.createClass({
  render: function() {
    console.log("Rendering <ChatBar />");

    return (
      <footer>
        <NameBox
          nameUpdate={this.props.handleName}
        />
        <MessageBox
          renderOutput={this.props.handleEntry}
        />
      </footer>
    );
  }
});

export default ChatBar;