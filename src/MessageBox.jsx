import React, {Component} from 'react';

const MessageBox = React.createClass({
  getInitialState: function() {
    return {message: this.props.message};
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
        value={this.state.message}
        onChange={this.handleChange}
        onKeyPress={this.props.renderOutput} />
    );
  }
});

export default MessageBox;