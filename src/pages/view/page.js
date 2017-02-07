import React from "react";
import Request from 'superagent';

export default class ViewPage extends React.Component {

  constructor() {
      super();
      this.state ={
        view:null
      };
  }

  componentWillMount(){
    console.log('fetch..');
    console.log('id: ', this.props.params.id);
    var url = "http://localhost:8081/view/" + this.props.params.id;
    Request.get(url).then((response) => {
        var spike = response.body;
        console.log('view response: ');
        console.log(spike);
        this.setState({
                view: spike
            });
    });
  }

  render() {
    return (
      <div>
        <h1>View</h1>
        <p>passed in param: {this.props.params.id}</p>
        <p>Works!</p>
      </div>
    );
  }
}
