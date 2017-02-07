import React from "react";
import Request from 'superagent';

export default class SpikePage extends React.Component {

  constructor() {
      super();
      this.state ={
        spike:{
          time_created:''
        }
      };

      //this.newSpike = this.newSpike.bind(this);
  }

  componentWillMount(){
    console.log('fetch..');
    console.log('id: ', this.props.params.id);
    var url = "http://localhost:8081/spike/" + this.props.params.id;
    Request.get(url).then((response) => {
        var spike = response.body;
        var key = Object.keys(spike)[0];
        console.log('spike response: ');
        console.log(spike[key]);
        this.setState({
                spike: spike[key]
            });
    });
  }


  render() {
    return (
      <div>
        <h1>Spike</h1>
        <p>passed in param: {this.props.params.id}</p>
        <p>Spike {this.state.spike.time_created}</p>
      </div>
    );
  }
}
