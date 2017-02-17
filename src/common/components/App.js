import React from 'react';

export default ({children}) => {
  return (
    <div id="container">
    	<div className="row">
              	<div className="col-md-12">
              		<nav className="navbar navbar-inverse" role="navigation">
	                  <div className="container-fluid">
	                    <div className="navbar-header">
	                      <button type="button" className="navbar-toggle" data-toggle="collapse" data-target="#bs-example-navbar-collapse-7">
	                        <span className="sr-only">Toggle navigation</span>
	                        <span className="icon-bar"></span>
	                        <span className="icon-bar"></span>
	                        <span className="icon-bar"></span>
	                      </button>
	                      <a className="navbar-brand" href="#">Prove it</a>
	                    </div>
	                    <div className="collapse navbar-collapse" id="bs-example-navbar-collapse-5">
	                      <ul className="nav navbar-nav">
	                        <li className="active"><a>Home</a></li>
	                      </ul>
	                        <p className="navbar-text navbar-right"><a className="navbar-link" href="">Are they robotos?</a></p>
	                    </div>
	                  </div>
                	</nav>
             	</div>
        </div>
      {children}
    </div>
  );
}
