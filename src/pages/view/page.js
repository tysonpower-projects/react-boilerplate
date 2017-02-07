import React from "react";

export default class ViewPage extends React.Component {
  render() {
  	console.log('id: ', this.props.params);
    return (
      <div>
        <h1>View</h1>
        <p>passed in param: {this.props.params.id}</p>
        <p>Works!</p>
      </div>
    );
  }
}
