import React, { Component } from 'react';
import TextField from 'material-ui/TextField';
import Slider from 'material-ui/Slider';
import ResultPieChart from '../components/resultPieChart';

export default class Home extends Component {
	constructor(props) {
		super(props);
		this.state = {
			runPace: 12.0,
			walkPace: 16.0,
			runIntervalTime: 1.0,
			walkIntervalTime: 2.0,
			raceDistance: 13.1
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

	handleRaceDistSlider (event, value) {
		this.setState({ raceDistance: value });
	}

	handleRunPaceSlider (event, value) {
		this.setState({ runPace: value });
	}

	handleWalkPaceSlider (event, value) {
		this.setState({ walkPace: value });
	}

	calc() {
		const intervalRunDistance = this.state.runIntervalTime * (1 / this.state.runPace);
		const intervalWalkDistance = this.state.walkIntervalTime * (1 / this.state.walkPace);
		const intervalDistance = intervalRunDistance + intervalWalkDistance;
		const totalRaceTime = ((this.state.runIntervalTime + this.state.walkIntervalTime) * (this.state.raceDistance / intervalDistance)) / 60;
		const totalRunDistance = intervalRunDistance * (this.state.raceDistance / intervalDistance);
		const totalWalkDistance = intervalWalkDistance * (this.state.raceDistance / intervalDistance);
		const totalRunTime = (totalRunDistance * this.state.runPace) / 60;
		const totalWalkTime = (totalWalkDistance * this.state.walkPace) / 60;

		const calcObj = { intervalDistance, intervalRunDistance, intervalWalkDistance, totalRaceTime, totalRunDistance, totalWalkDistance, totalRunTime, totalWalkTime };
		return calcObj;
	}

	timeConvert(timeInt, sumCalc) {
		const hours = parseInt(timeInt, 10);
		const mmss = (timeInt - hours) * 60;
		let minutes = parseInt(mmss, 10);
		if (minutes < 10) {
			minutes = `0${minutes}`;
		}
		let seconds = parseInt((mmss - minutes) * 60, 10);
		if (seconds < 10) {
			seconds = `0${seconds}`;
		}
		if (sumCalc) {
			return `${hours}:${minutes}`;
		}
		return `${hours}:${minutes}:${seconds}`;
	}

	render() {
		const calcObj = this.calc();

		const intervalData = [
			{	name: 'runIntervalDist',
				value: calcObj.intervalRunDistance },
			{	name: 'walkIntervalDistance',
				value: calcObj.intervalWalkDistance }
		];
		const intervalSum = (calcObj.intervalRunDistance + calcObj.intervalWalkDistance).toFixed(2);

		const timeData = [
			{ name: 'runTime',
				value: calcObj.totalRunTime },
			{ name: 'walkTime',
				value: calcObj.totalWalkTime }
		];
		const raceTimeSum = this.timeConvert(calcObj.totalRaceTime, true);
		const runTimeConvert = this.timeConvert(calcObj.totalRunTime);
		const walkTimeConvert = this.timeConvert(calcObj.totalWalkTime);

		const distanceData = [
			{ name: 'runRaceTime',
				value: calcObj.totalRunDistance },
			{ name: 'walkRaceTime',
				value: calcObj.totalWalkDistance }
		];
		const raceDistanceSum = this.state.raceDistance;

		const styles = {
			sliderContainer: {

			},
			sliderTitle: {
				fontSize: 15,
				color: '#666',
				marginBottom: 5,
			},
			sliderStyle: {
				width: 300,
				marginBottom: 10,
				marginTop: 0,
				marginLeft: 'auto',
				marginRight: 'auto'
			}
		}

		return (
			<div>
				<div>
					<div style={styles.sliderContainer}>
						<p style={styles.sliderTitle}>
							Race Distance: {this.state.raceDistance} miles
						</p>
						<Slider
							value={this.state.raceDistance}
							defaultValue={this.state.raceDistance}
							min={3.1}
							max={26.2}
							step={.1}
							onChange={this.handleRaceDistSlider.bind(this)}
							sliderStyle={styles.sliderStyle}
						/>
					</div>
				</div>
				<div>
					<div style={styles.sliderContainer}>
						<p style={styles.sliderTitle}>
							Run Pace: {this.state.runPace} mins/mile
						</p>
						<Slider
							value={this.state.runPace}
							defaultValue={this.state.runPace}
							min={8.00}
							max={14.00}
							step={.25}
							onChange={this.handleRunPaceSlider.bind(this)}
							sliderStyle={styles.sliderStyle}
						/>
					</div>
				</div>
				<div>
					<div style={styles.sliderContainer}>
						<p style={styles.sliderTitle}>
							Walk Pace: {this.state.walkPace} mins/mile
						</p>
						<Slider
							value={this.state.walkPace}
							defaultValue={this.state.walkPace}
							min={14.00}
							max={20.00}
							step={.25}
							onChange={this.handleWalkPaceSlider.bind(this)}
							sliderStyle={styles.sliderStyle}
						/>
					</div>
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
					walkSum={calcObj.intervalWalkDistance.toFixed(2)}
					runSum={calcObj.intervalRunDistance.toFixed(2)}
				/>
				<ResultPieChart
					title={'Total Time'}
					metric={'hours'}
					data={timeData}
					sum={raceTimeSum}
					walkSum={walkTimeConvert}
					runSum={runTimeConvert}
				/>
				<ResultPieChart
					title={'Total Distance'}
					metric={'miles'}
					data={distanceData}
					sum={raceDistanceSum}
					walkSum={calcObj.totalWalkDistance.toFixed(2)}
					runSum={calcObj.totalRunDistance.toFixed(2)}
				/>
			</div>
		)
	}
}
