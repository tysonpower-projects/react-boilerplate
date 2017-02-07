import React from "react";

export default class SpikePage extends React.Component {
  render() {
  	console.log('id: ', this.props.params);
    return (
      <div>
        <h1>Spike</h1>
        <p>passed in param: {this.props.params.id}</p>
        <p>Works!</p>
      </div>
    );
  }
}
