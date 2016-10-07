import React, {Component} from 'react';

const NameBox = React.createClass({
  render: function() {
    console.log("Rendering <NameBox />")

    return (
      <input
        id="username"
        type="text"
        placeholder="Enter your name"
        onKeyPress={this.props.nameUpdate}
      />
    );
  }
});

export default NameBox;