import React from 'react';
import { browserHistory } from 'react-router';
import styles from './style.css';
import Request from 'superagent';


export default class LoginPage extends React.Component {

    constructor() {
        super();
        this.state ={
            spike:null,
            spikeURL:'',
            viewURL:''
        };

        this.newSpike = this.newSpike.bind(this);
    }

    newSpike() {
        var url = "http://localhost:8081/spike";
        Request.get(url).then((response) => {
            console.log(response.body);
            var spike = response.body;
            this.setState({
                spike: spike,
                spikeURL:spike.send_base_url + spike.send_url_id,
                viewURL:spike.view_base_url + spike.view_url_id
            });
            console.log(this.state);
        });
    }

    view() {
        browserHistory.push('/view/' + this.state.viewURL);
    }

    spike() {
        browserHistory.push('/spike/'  + this.state.spikeURL);
    }

    render() {
        return (
            <div className={styles.content}>
                <p>Are they robots?</p>
                <p><a href={this.state.spikeURL}>{this.state.spikeURL}</a></p>
                <p><a href={this.state.viewURL}>{this.state.viewURL}</a></p>
                <button className={styles.signUpButton} onClick={this.newSpike}>Generate</button>
                <button className={styles.signUpButton} onClick={this.view}>View</button>
                <button className={styles.signUpButton} onClick={this.spike}>Spike</button>
            </div>
        );
    }
}
