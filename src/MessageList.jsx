import React, {Component} from 'react';
import Message from './Message.jsx';

const MessageList = React.createClass({
  render: function() {
    console.log("Rendering <MessageList />")

    return (
      <div id="message-list">

        {this.props.messagesArr.map(function(element, index) {
          return <Message key={index} message={element}/>
        })}

      </div>
    );
  }
});

export default MessageList;