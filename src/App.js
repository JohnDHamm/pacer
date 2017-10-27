import React, { Component } from 'react';
import './App.css';
import Home from './containers/home';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';


class App extends Component {
	render() {
		return (
			<MuiThemeProvider>
				<div className="App">
					<p className="App-intro">
						An app to calculate run/walk times and distance to help with race training.
					</p>
					<Home />
				</div>
			</MuiThemeProvider>
		);
	}
}

export default App;
