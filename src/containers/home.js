import React, { Component } from 'react';
import TextField from 'material-ui/TextField';
import ResultPieChart from '../components/resultPieChart';

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

	calc() {
		const intervalRunDistance = this.state.runIntervalTime * (1 / this.state.runPace);
		const intervalWalkDistance = this.state.walkIntervalTime * (1 / this.state.walkPace);
		const intervalDistance = intervalRunDistance + intervalWalkDistance;
		const totalRaceTime = (((this.state.runIntervalTime + this.state.walkIntervalTime) * (this.state.raceDistance / intervalDistance)) / 60).toFixed(2);
		const totalRunDistance = intervalRunDistance * (this.state.raceDistance / intervalDistance);
		const totalWalkDistance = intervalWalkDistance * (this.state.raceDistance / intervalDistance);
		const totalRunTime = (totalRunDistance * this.state.runPace) / 60;
		const totalWalkTime = (totalWalkDistance * this.state.walkPace) / 60;

		const calcObj = { intervalDistance, intervalRunDistance, intervalWalkDistance, totalRaceTime, totalRunDistance, totalWalkDistance, totalRunTime, totalWalkTime };
		return calcObj;
	}

	render() {
		let { intervalDistance, intervalRunDistance, intervalWalkDistance, totalRaceTime, totalRunDistance, totalWalkDistance, totalRunTime, totalWalkTime } = this.props;

		const calcObj = this.calc();
		intervalRunDistance = calcObj.intervalRunDistance;
		intervalWalkDistance = calcObj.intervalWalkDistance;
		intervalDistance = calcObj.intervalDistance;
		totalRaceTime = calcObj.totalRaceTime;
		totalRunDistance = calcObj.totalRunDistance;
		totalWalkDistance = calcObj.totalWalkDistance;
		totalRunTime = calcObj.totalRunTime;
		totalWalkTime = calcObj.totalWalkTime;

		const intervalData = [{name: 'runIntervalDist', value: intervalRunDistance}, {name: 'walkIntervalDistance', value: intervalWalkDistance}];
		const intervalSum = (intervalRunDistance + intervalWalkDistance).toFixed(2);

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
				<ResultPieChart
					title={'Interval Distance'}
					metric={'miles'}
					data={intervalData}
					sum={intervalSum}
				/>
				<div>
					<p>Interval distance: <span>{intervalDistance}</span> miles</p>
				</div>
				<div>
					<p>Interval running distance: <span>{intervalRunDistance}</span> miles</p>
				</div>
				<div>
					<p>Interval walking distance: <span>{intervalWalkDistance}</span> miles</p>
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
