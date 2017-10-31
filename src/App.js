import React, { Component } from 'react';
import './App.css';
import Home from './containers/home';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';


class App extends Component {
	render() {
		return (
			<MuiThemeProvider>
				<div className="App">
					<Home />
				</div>
			</MuiThemeProvider>
		);
	}
}

export default App;
