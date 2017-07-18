import React from 'react';

export default ({children}) => {
  return (
  	<div id="container" className="container-fluid">
		<div className="col-md-12">
		    <nav className="navbar navbar-inverse" role="navigation">
		        <div className="container-fluid">
		            <div className="navbar-header">
		                <button type="button" className="navbar-toggle" data-toggle="collapse" data-target="#bs-example-navbar-collapse-5">
		                <span className="sr-only">Toggle navigation</span>
		                <span className="icon-bar"></span>
		                <span className="icon-bar"></span>
		                <span className="icon-bar"></span>
		                </button>
		                <a className="navbar-brand" href="#">Project - Einstine</a>
		            </div>
		            <div className="collapse navbar-collapse" id="bs-example-navbar-collapse-5">
		                <ul className="nav navbar-nav">
		                    <li className="active"><a href="#">Sample Page</a></li>
		                </ul>
		                <form className="navbar-form navbar-right" role="search">
		                    <div className="form-search search-only">
		                        <i className="search-icon glyphicon glyphicon-search"></i>
		                        <input className="form-control search-query" type="text" />
		                    </div>
		                </form>
		            </div>
		        </div>
		    </nav>
		</div>
		<div className="col-md-12">
	    	{children}
		</div>
    </div>
  );
}
