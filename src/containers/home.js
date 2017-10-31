import React, { Component } from 'react';
import Slider from 'rc-slider';
import 'rc-slider/assets/index.css';
import PacerHeader from '../components/pacerHeader';
import ResultPieChart from '../components/resultPieChart';

import PacerValues from '../styles/pacerValues';

export default class Home extends Component {
	constructor(props) {
		super(props);
		this.state = {
			runPace: 12.0,
			walkPace: 16.0,
			runIntervalTime: 1.0,
			walkIntervalTime: 2.5,
			raceDistance: 26.2
		}
	}

	handleRaceDistSlider (value) {
		this.setState({ raceDistance: value });
	}

	handleRunPaceSlider (value) {
		this.setState({ runPace: value });
	}

	handleWalkPaceSlider (value) {
		this.setState({ walkPace: value });
	}

	handleRunIntervalSlider (value) {
		this.setState({ runIntervalTime: value });
	}

	handleWalkIntervalSlider (value) {
		this.setState({ walkIntervalTime: value });
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
			sliderTitle: {
				fontSize: 15,
				color: '#666',
				marginBottom: 5,
			},
			sliderStyle: {
				marginBottom: 20,
				marginTop: 5,
			},
			separator: {
				borderTop: '1px solid #888',
				borderBottom: '1px solid #888',
				color: '#888',
				marginTop: 20,
				marginBottom: 20
			}
		}

		return (
			<div className="container">
				<PacerHeader />
				<div id="raceDistanceDiv" className="row">
					<div className="col-lg-4 offset-lg-4">
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
							trackStyle={{ backgroundColor: '#555'}}
							handleStyle={{
								borderColor: '#555',
								width: 20,
								height: 20,
								marginLeft: -10,
								marginTop: -8 }}
						/>
					</div>
				</div>
				<div className="row">
					<div className="col-lg-4 offset-lg-2">
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
							trackStyle={{ backgroundColor: PacerValues.runColor}}
							handleStyle={{
								borderColor: PacerValues.runColor,
								width: 20,
								height: 20,
								marginLeft: -10,
								marginTop: -8 }}
						/>
					</div>
					<div className="col-lg-4">
						<p style={styles.sliderTitle}>
							Run Interval: {this.state.runIntervalTime} mins
						</p>
						<Slider
							value={this.state.runIntervalTime}
							defaultValue={this.state.runIntervalTime}
							min={0}
							max={20.00}
							step={.25}
							onChange={this.handleRunIntervalSlider.bind(this)}
							trackStyle={{ backgroundColor: PacerValues.runColor}}
							handleStyle={{
								borderColor: PacerValues.runColor,
								width: 20,
								height: 20,
								marginLeft: -10,
								marginTop: -8 }}
						/>
					</div>
				</div>
				<div className="row">
					<div className="col-lg-4 offset-lg-2">
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
							trackStyle={{ backgroundColor: PacerValues.walkColor}}
							handleStyle={{
								borderColor: PacerValues.walkColor,
								width: 20,
								height: 20,
								marginLeft: -10,
								marginTop: -8 }}
						/>
					</div>
					<div className="col-lg-4">
						<p style={styles.sliderTitle}>
							Walk Interval: {this.state.walkIntervalTime} mins
						</p>
						<Slider
							value={this.state.walkIntervalTime}
							defaultValue={this.state.walkIntervalTime}
							min={0}
							max={20.00}
							step={.25}
							onChange={this.handleWalkIntervalSlider.bind(this)}
							trackStyle={{ backgroundColor: PacerValues.walkColor}}
							handleStyle={{
								borderColor: PacerValues.walkColor,
								width: 20,
								height: 20,
								marginLeft: -10,
								marginTop: -8 }}
						/>
					</div>
				</div>
				<div className="row">
					<div className="col-12">
						<div style={styles.separator}>RESULTS</div>
					</div>
				</div>
				<div id="resultsDiv" className="row">
					<div className="col-lg-4">
						<ResultPieChart
							title={'Interval Distance'}
							metric={'miles'}
							data={intervalData}
							sum={intervalSum}
							walkSum={calcObj.intervalWalkDistance.toFixed(2)}
							runSum={calcObj.intervalRunDistance.toFixed(2)}
						/>
					</div>
					<div className="col-lg-4">
						<ResultPieChart
							title={'Total Time'}
							metric={'hours'}
							data={timeData}
							sum={raceTimeSum}
							walkSum={walkTimeConvert}
							runSum={runTimeConvert}
						/>
					</div>
					<div className="col-lg-4">
						<ResultPieChart
							title={'Total Distance'}
							metric={'miles'}
							data={distanceData}
							sum={raceDistanceSum}
							walkSum={calcObj.totalWalkDistance.toFixed(2)}
							runSum={calcObj.totalRunDistance.toFixed(2)}
						/>
					</div>
				</div>
			</div>
		)
	}
}
