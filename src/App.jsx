import React, {Component} from 'react';

class App extends Component {
  render() {
    return (
    	<section>
	      <h1>Hello React2 :)</h1>
	    	<button
				class="g-recaptcha"
				data-sitekey="6LcTyhMUAAAAADeoa78twejqnSKWf5bbhZMT377z"
				data-callback="YourOnSubmitFn(response)">
				Submit
			</button>
		</section>
    );
  }
}
export default App;
