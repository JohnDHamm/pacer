import React, { Component } from 'react';
import TextField from 'material-ui/TextField';


export default class Home extends Component {
	constructor(props) {
		super(props);
		this.state = {
			runPace: 12.0,
			walkPace: 16.0,
			runIntervalTime: 1.0,
			walkIntervalTime: 2.0,
			raceDistance: 26.2
		}
	}

	changeInput (eventTarget) {
		const id = eventTarget.id.split('_')[1];
		const numValue = Number(eventTarget.value);
		// console.log("intValue", intValue);
		switch (id) {
			case 'runPace':
				this.setState({ runPace: numValue });
				break;
			case 'walkPace':
				this.setState({ walkPace: numValue });
				break;
			case 'runIntervalTime':
				this.setState({ runIntervalTime: numValue });
				break;
			case 'walkIntervalTime':
				this.setState({ walkIntervalTime: numValue });
				break;
			case 'raceDistance':
				this.setState({ raceDistance: numValue });
				break;
			default:
				break;
		}
	}

	calcIntervalDistance() {
		const runIntervalDist = this.state.runIntervalTime * (1 / this.state.runPace);
		const walkIntervalDist = this.state.walkIntervalTime * (1 / this.state.walkPace);
		return (runIntervalDist + walkIntervalDist);
	}

	calcTotalRaceTime(intervalDistance) {
		return (((this.state.runIntervalTime + this.state.walkIntervalTime) * (this.state.raceDistance / intervalDistance)) / 60).toFixed(2);
	}

	calcTotalRunDistance(intervalDistance) {
		const runIntervalDist = this.state.runIntervalTime * (1 / this.state.runPace);
		return (runIntervalDist * (this.state.raceDistance / intervalDistance));
	}

	calcTotalWalkDistance(intervalDistance) {
		const walkIntervalDist = this.state.walkIntervalTime * (1 / this.state.walkPace);
		return (walkIntervalDist * (this.state.raceDistance / intervalDistance));
	}

	calcRunTime(totalRunDistance) {
		return (totalRunDistance * this.state.runPace) / 60;
	}

	calcWalkTime(totalWalkDistance) {
		return (totalWalkDistance * this.state.walkPace) / 60;
	}

	render() {
		let { intervalDistance, totalRaceTime, totalRunDistance, totalWalkDistance, totalRunTime, totalWalkTime } = this.props;
		intervalDistance = this.calcIntervalDistance();
		totalRaceTime = this.calcTotalRaceTime(intervalDistance);
		totalRunDistance = this.calcTotalRunDistance(intervalDistance);
		totalWalkDistance = this.calcTotalWalkDistance(intervalDistance);
		totalRunTime = this.calcRunTime(totalRunDistance);
		totalWalkTime = this.calcWalkTime(totalWalkDistance);

		return (
			<div>
				<div>
					<TextField
						id="textField_raceDistance"
						floatingLabelText="Race Distance (miles)"
						type='number'
						value={this.state.raceDistance}
						onChange={ event => this.changeInput(event.target)}
					/>
				</div>
				<div>
					<TextField
						id="textField_runPace"
						floatingLabelText="Run Pace (minutes/mile)"
						type='number'
						value={this.state.runPace}
						onChange={ event => this.changeInput(event.target)}
					/>
				</div>
				<div>
					<TextField
						id="textField_walkPace"
						floatingLabelText="Walk Pace (minutes/mile)"
						type='number'
						value={this.state.walkPace}
						onChange={ event => this.changeInput(event.target)}
					/>
				</div>
				<div>
					<TextField
						id="textField_runIntervalTime"
						floatingLabelText="Run Interval (minutes)"
						type='number'
						value={this.state.runIntervalTime}
						onChange={ event => this.changeInput(event.target)}
					/>
				</div>
				<div>
					<TextField
						id="textField_walkIntervalTime"
						floatingLabelText="Walk Interval (minutes)"
						type='number'
						value={this.state.walkIntervalTime}
						onChange={ event => this.changeInput(event.target)}
					/>
				</div>
				<div>
					<p>Interval distance: <span>{intervalDistance}</span> miles</p>
				</div>
				<div>
					<p>Total time: <span>{totalRaceTime}</span> hours</p>
				</div>
				<div>
					<p>Distance running: <span>{totalRunDistance}</span> miles</p>
				</div>
				<div>
					<p>Distance walking: <span>{totalWalkDistance}</span> miles</p>
				</div>
				<div>
					<p>Total time running: <span>{totalRunTime}</span> hours</p>
				</div>
				<div>
					<p>Total time walking: <span>{totalWalkTime}</span> hours</p>
				</div>
			</div>
		)
	}
}
