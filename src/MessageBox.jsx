import React, {Component} from 'react';

const MessageBox = React.createClass({
  getInitialState: function() {
    return {message: ""};
  },

  handleChange: function(event) {
    this.setState({message: event.target.value});
  },

  render: function() {
    console.log("Rendering <MessageBox />");

    return (
      <input
        id="new-message"
        type="text"
        placeholder="Type a message and hit ENTER"
        value={this.state.message}
        onChange={this.handleChange}
        onKeyPress={this.props.renderOutput}
      />
    );
  }
});

export default MessageBox;