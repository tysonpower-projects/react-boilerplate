import React from 'react';
import { browserHistory } from 'react-router';
import styles from './style.css';
import Request from 'superagent';


export default class LoginPage extends React.Component {

    constructor() {
      super();
      this.state ={
          loginMessage: 'This login message is stored in the page state.',
          ajaxData: 'loading data...'
      };

      this.ajaxRequestExample = this.ajaxRequestExample.bind(this);
    }

    componentWillMount(){
      console.log('On load lifecycle function');
      this.ajaxRequestExample();
    }

    //ajax request example
    ajaxRequestExample() {
      console.log('send ajax request');
      var url = "http://private-32d0f-einsteinex.apiary-mock.com/questions";
      Request.get(url).then((response) => {
        var bodyToString = JSON.stringify(response.body);
        console.log(response.body);
        this.setState({
            ajaxData: bodyToString
        });
      });
    }

    render() {
        return (
            <div>
                <h3>{this.state.loginMessage}</h3>
                <p>Load sample page and pass in some url params</p>
                <a href="/sample/123">http://localhost/sample/123</a>
                <section>
                  <h4>Simple Ajax Request Example</h4>
                  <p>{this.state.ajaxData}</p>
                </section>
            </div>
        );
    }
}
