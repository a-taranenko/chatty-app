import React, {Component} from 'react';

const MessageBox = React.createClass({
  // getInitialState: function() {
  //   return {message: this.props.entryField};
  // },

  // handleChange: function(event) {
  //   this.setState({message: event.target.value});
  // },

  render: function() {
    console.log("Rendering <MessageBox />");

    return (
      <input
        id="new-message"
        type="text"
        placeholder="Type a message and hit ENTER"
        onKeyPress={this.props.renderOutput}
      />
    );
  }
});

export default MessageBox;