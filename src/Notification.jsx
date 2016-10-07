import React, {Component} from 'react';

const Notification = React.createClass({
  render: function() {
    console.log("Rendering <Notification />")
    return (
      <div className="message system">{this.props.notification.content}</div>
    );
  }
});

export default Notification;
