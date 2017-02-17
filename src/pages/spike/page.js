import React from "react";
import Request from 'superagent';
import $ from 'jquery';
export default class SpikePage extends React.Component {

  constructor() {
      super();
      this.state ={
        spike:{
          time_created:'',
        },
        key:'',
        ip:'',
        'captcha_data':{

        }
      };

      this._updateSpike = this._updateSpike.bind(this);
      this._send = this._send.bind(this);
  }

  componentWillMount(){
    var that = this;
    console.log('fetch..');
    console.log('id: ', this.props.params.id);
    var url = "http://localhost:8081/spike/" + this.props.params.id;
    Request.get(url).then((response) => {
        var spike = response.body;
        var key = Object.keys(spike)[0];
        console.log('spike response: ');
        console.log(spike[key]);
        this.setState({
                spike: spike[key],
                key: key
            });
    });

    $('#captcha').html('');
    $.getScript("https://www.google.com/recaptcha/api.js");

    var onloadCallback = function() {
      alert("grecaptcha is ready!");
    };

    $.getJSON('//www.geoplugin.net/json.gp?jsoncallback=?', function(data) {
      that.setState({
          ip:data.geoplugin_request
      });
      console.log(JSON.stringify(data, null, 2));
    });

    var userAgent = window.navigator.userAgent;
    console.log(userAgent);
  }

  _send(e){
    var that = this;
    console.log('trigger');
    e.stopPropagation();
    var url = 'http://localhost:8081/submit/' + this.state.key;
    var form = $("#comment_form").serialize();
    console.log(form);
    console.log("post..");
    Request.post(url).send(form).end(function(err, res){
         if (err || !res.ok) {
           console.log('Oh no! error', err);
         } else {
           console.log('yay got ' + JSON.stringify(res.body));
           that.setState({
                captcha_data: res.body
            });
         }
     });
  }

  _updateSpike(){
    var url = 'http://localhost:8081/spike/' + this.state.key;
    var data = this.state.spike;
    console.log(data);
    data.meta_data_collection = {
      ip_address: this.state.ip
    };
    data.captcha_data = this.state.captcha_data;
    console.log('data: ', data);
    Request.put(url).send(data).end(function(err, res){
         if (err || !res.ok) {
           console.log('Oh no! error', err);
         } else {
           console.log('yay got ' + JSON.stringify(res.body));
         }
     });
  }

  render() {
    return (
      <div>
        <div className="row">
          <div className="col-md-12">
               <div className="jumbotron"> 
                  <div id="jumbo-home" className="jumbotron-photo">
                  <img className="jumob-image" src="http://www.shximai.com/data/out/73/66974857-flat-wallpapers.jpg"/>
                  </div>
                </div>
            </div>
        </div>
        <section id="captcha-section">
          <div className="row">
            <div className="col-md-4"></div>
            <div className="col-md-5">
               <form id="comment_form" >
                  <div id="captcha" className="g-recaptcha" data-sitekey="6Lf1DBQUAAAAAEyT-0q6g_w8tR8zqSKw1xoAbdFO"></div>
                  <div onClick={this._send.bind()} hidden>Send Captcha</div>
              </form>
            </div>
            <div className="col-md-3"></div>
          </div>
        </section>
        <p>passed in param: {this.props.params.id}</p>
        <p>Spike {this.state.spike.time_created}</p>
        <p>firebase key <div id="key">{this.state.key}</div></p>
        <div onClick={this._updateSpike.bind()} hidden>Update spike</div>
      </div>
    );
  }
}
