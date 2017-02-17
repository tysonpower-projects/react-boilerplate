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
                <div className="row">
                    <div className="col-md-12">
                       <div className="jumbotron"> 
                          <div id="jumbo-home" className="jumbotron-photo">
                          <img className="jumob-image" src="http://www.shximai.com/data/out/73/66974857-flat-wallpapers.jpg"/>
                          </div>
                        </div>
                    </div>
                </div>
                <section id="move-up">

                    <div className="col-sm-3"></div>
                    <div className="col-sm-6">
                        <button type="button" className="btn btn-success btn-block" onClick={this.newSpike}>Generate Link</button>
                    </div>
                    <div className="col-sm-3"></div>
                    <div className="col-sm-12">
                        <div className="timeline">
                          <dl>
                            <dd className="pos-right clearfix">
                                  <div className="circ"></div>
                                  <div className="time">Apr 11</div>
                                  <div className="events">
                                      <div className="pull-left">
                                          <span className="glyphicon glyphicon-link"></span>
                                      </div>
                                      <div className="events-body">
                                          <h4 className="events-heading">Link generated</h4>
                                          <p>
                                            <a>http://clicktoproveyournotarobot.com/ze23zc</a>
                                          </p>
                                            <p>
                                                <button type="button" className="btn btn-success">Copy link</button>
                                            </p>
                                      </div>
                                  </div>
                              </dd>
                              <dt>Apr 2014</dt>
                              <dd className="pos-left clearfix">
                                  <div className="circ"></div>
                                  <div className="time">Apr 14</div>
                                  <div className="events">
                                      <div className="pull-left">
                                          <span className="glyphicon glyphicon-eye-close"></span>
                                      </div>
                                      <div className="events-body">
                                          <h4 className="events-heading">Not Viewed</h4>
                                          <p>Raw denim you probably haven't heard of them jean shorts Austin. Nesciunt tofu stumptown aliqua, retro synth master cleanse. Mustache cliche tempor, williamsburg carles vegan helvetica.</p>
                                      </div>
                                  </div>
                              </dd>
                              <dd className="pos-right clearfix">
                                  <div className="circ"></div>
                                  <div className="time">Apr 10</div>
                                  <div className="events">
                                      <div className="pull-left">
                                          <span className="glyphicon glyphicon-eye-open"></span>
                                      </div>
                                      <div className="events-body">
                                          <h4 className="events-heading">Clicked</h4>
                                          <p>Raw denim you probably haven't heard of them jean shorts Austin. Nesciunt tofu stumptown aliqua, retro synth master cleanse. Mustache cliche tempor, williamsburg carles vegan helvetica.</p>
                                      </div>
                                  </div>
                              </dd>
                              <dt>Mar 2014</dt>
                              <dd >
                                <div className="circ"></div>
                                <div className="gps_ring" id="signal"></div>
                              </dd>
                            </dl>
                        </div>
                    </div>
                </section>
                <section id="meta-data-panel">
                    <div className="col-md-12">
                     <div className="panel panel-primary">
                          <div className="panel-heading">
                            <h3 className="panel-title">Meta Data Collected</h3>
                          </div>
                          <div className="panel-body">
                            Panel content
                          </div>
                        </div>
                    </div>
                
                </section>
                <p><a href={this.state.spikeURL}>{this.state.spikeURL}</a></p>
                <p><a href={this.state.viewURL}>{this.state.viewURL}</a></p>
            </div>
        );
    }
}
