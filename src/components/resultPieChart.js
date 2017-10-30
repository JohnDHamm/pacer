import React, { Component } from 'react';
import { PieChart, Pie, Cell } from 'recharts';

export default class resultPieChart extends Component {

	render() {

		const { data, title, metric, sum, walkSum, runSum } = this.props;
		const walkColor = '#49bc58';
		const runColor = '#b22929';
		const colors = [runColor, walkColor];

		const styles = {
			container: {
				position: 'relative',
				// border: '1px solid #666',
				width: 300
			},
			title: {
				fontSize: 20,
				color: '#000',
				margin: '0 auto'
			},
			walkTitleDiv: {
				position: 'absolute',
				top: 40,
				left: 20
			},
			walkTitle: {
				fontSize: 20,
				color: walkColor,
				margin: '0 auto'
			},
			walkNum: {
				fontSize: 18,
				color: walkColor,
				margin: '0 auto'
			},
			runTitleDiv: {
				position: 'absolute',
				top: 40,
				left: 225
			},
			runTitle: {
				fontSize: 20,
				color: runColor,
				margin: '0 auto'
			},
			runNum: {
				fontSize: 18,
				color: runColor,
				margin: '0 auto'
			},
			centerCircle: {
				position: 'absolute',
				height: 90,
				width: 90,
				left: 150 - 45,
				top: 150 - 67,
				borderRadius: '50%',
				backgroundColor: 'black'
			},
			centerTextDiv: {
				position: 'absolute',
				width: 90,
				top: 27,
				// border: '1px dotted red'
			},
			centerText: {
				fontSize: 30,
				color: 'white',
				margin: '0 auto'
			}
		}

		return (
			<div style={styles.container}>
				<p style={styles.title}>{title} ({metric})</p>
				<div style={styles.walkTitleDiv}>
					<p style={styles.walkTitle}>WALK</p>
					<p style={styles.walkNum}>
						{walkSum}
					</p>
				</div>
				<div style={styles.runTitleDiv}>
					<p style={styles.runTitle}>RUN</p>
					<p style={styles.runNum}>
						{runSum}
					</p>
				</div>
				<PieChart width={300} height={200}>
					<Pie
						dataKey="value"
						data={data}
						cx={145}
						cy={100}
						innerRadius={50}
						outerRadius={80}
						startAngle={90}
						endAngle={-270}
						paddingAngle={2}
					>
						{ data.map((entry, index) => <Cell key={entry.name} fill={colors[index]} /> )}
					</Pie>
				</PieChart>
				<div style={styles.centerCircle}>
					<div style={styles.centerTextDiv}>
						<p style={styles.centerText}>
							{sum}
						</p>
					</div>
				</div>
			</div>
		)
	}
}

