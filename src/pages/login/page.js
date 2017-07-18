import React from 'react';
import { browserHistory } from 'react-router';
import styles from './style.css';
import Request from 'superagent';


export default class LoginPage extends React.Component {

    constructor() {
        super();
        this.state ={
            loginMessage: 'This login message is stored in the page state.'
        };

        this.ajaxRequestExample = this.ajaxRequestExample.bind(this);
    }

    ajaxRequestExample() {
        // var url = "http://localhost:8081/spike";
        //     Request.get(url).then((response) => {
        //     console.log(response.body);
        //     var spike = response.body;
        //     this.setState({
        //         spike: spike,
        //         spikeURL:spike.send_base_url + spike.send_url_id,
        //         viewURL:spike.view_base_url + spike.view_url_id
        //     });
        //     console.log(this.state);
        // });
    }

    render() {
        return (
            <div>
                <h3>{this.state.loginMessage}</h3>
                <p>Load sample page and pass in some url params</p>
                <a href="/sample/123">http://localhost/sample/123</a>
            </div>
        );
    }
}
