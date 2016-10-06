import React, {Component} from 'react';

const NameBox = React.createClass({
  render: function() {
    console.log("Rendering <NameBox />")

    return (
      <input
        id="username"
        type="text"
        placeholder="Enter your name"
        value={this.props.userName}
        onChange={this.props.nameUpdate}
      />
    );
  }
});

export default NameBox;