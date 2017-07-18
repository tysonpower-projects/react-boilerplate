import React from "react";
import Request from 'superagent';

export default class ViewPage extends React.Component {

  constructor() {
      super();
      this.state ={
        view: null
      };
  }

  componentWillMount(){
    console.log('befor page loads..');
    console.log('url param id: ', this.props.params.id);
  }

  render() {
    return (
      <div>
        <h1>Sample Page</h1>
        <p>passed in url param: {this.props.params.id}</p>
      </div>
    );
  }
}
