import React, { Component } from 'react';
import { PieChart, Pie, Cell } from 'recharts';

export default class resultPieChart extends Component {

	render() {

		const { data, title, metric, sum } = this.props;
		const colors = ['red', 'green'];

		const styles = {
			container: {
				position: 'relative',
				border: '1px solid #666',
				width: 300
			},
			title: {
				fontSize: 20,
				color: '#666',
				margin: '0 auto'
			},
			centerCircle: {
				position: 'absolute',
				height: 90,
				width: 90,
				left: 150 - 45,
				top: 150 - 68,
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
						<p style={styles.centerText}>{sum}</p>
					</div>
				</div>
			</div>
		)
	}
}

