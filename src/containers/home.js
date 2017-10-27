import React, { Component } from 'react';
import TextField from 'material-ui/TextField';


export default class Home extends Component {
	constructor(props) {
		super(props);
		this.state = {
			runPace: 12.0,
			walkPace: 16.5,
			runIntervalTime: 1.0,
			walkIntervalTime: 2.0,
			raceDistance: 26.2,
			intervalDistance: null,
			totalRaceTime: 0,
			totalRunDistance: 0,
			totalWalkDistance: 0,
			totalRunTime: 0,
			totalWalkTime: 0
		}
	}

	changeInput (eventTarget) {
		const id = eventTarget.id.split('_')[1];
		switch (id) {
			case 'runPace':
				this.setState({ runPace: eventTarget.value }, () => this.updateCalcs());
				break;
			case 'walkPace':
				this.setState({ walkPace: eventTarget.value }, () => this.updateCalcs());
				break;
			case 'runIntervalTime':
				this.setState({ runIntervalTime: eventTarget.value }, () => this.updateCalcs());
				break;
			case 'walkIntervalTime':
				this.setState({ walkIntervalTime: eventTarget.value }, () => this.updateCalcs());
				break;
			case 'raceDistance':
				this.setState({ raceDistance: eventTarget.value }, () => this.updateCalcs());
				break;
			default:
				break;
		}
	}

	calcIntervalDistance() {
		const runIntervalDist = this.state.runIntervalTime * (1 / this.state.runPace);
		const walkIntervalDist = this.state.walkIntervalTime * (1 / this.state.walkPace);
		return runIntervalDist + walkIntervalDist;
	}

	updateCalcs() {
		this.setState({ intervalDistance: this.calcIntervalDistance() });
	}

	render() {
		return (
			<div>
				<div>
					<TextField
						id="textField_raceDistance"
						floatingLabelText="Race Distance (miles)"
						value={this.state.raceDistance}
						onChange={ event => this.changeInput(event.target)}
					/>
				</div>
				<div>
					<TextField
						id="textField_runPace"
						floatingLabelText="Run Pace (minutes/mile)"
						value={this.state.runPace}
						onChange={ event => this.changeInput(event.target)}
					/>
				</div>
				<div>
					<TextField
						id="textField_walkPace"
						floatingLabelText="Walk Pace (minutes/mile)"
						value={this.state.walkPace}
						onChange={ event => this.changeInput(event.target)}
					/>
				</div>
				<div>
					<TextField
						id="textField_runIntervalTime"
						floatingLabelText="Run Interval (minutes)"
						value={this.state.runIntervalTime}
						onChange={ event => this.changeInput(event.target)}
					/>
				</div>
				<div>
					<TextField
						id="textField_walkIntervalTime"
						floatingLabelText="Walk Interval (minutes)"
						value={this.state.walkIntervalTime}
						onChange={ event => this.changeInput(event.target)}
					/>
				</div>
				<div>
					<p>Interval distance: <span>{this.state.intervalDistance}</span></p>
				</div>
			</div>
		)
	}
}
