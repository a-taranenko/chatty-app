import React, {Component} from 'react';

const NameBox = React.createClass({
  render: function() {
    console.log("Rendering <NameBox />")

    return (
      <input
        id="username"
        type="text"
        value={this.props.userName}
        onChange={this.props.nameUpdate}
        onKeyPress={this.props.renderOutput} />
    );
  }
});

export default NameBox;