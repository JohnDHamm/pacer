import React, { Component } from 'react';
import pacer_logo from '../img/pacer_logo.png';

export default class PacerHeader extends Component {

	render() {
		const styles= {
			header: {
				marginTop: 20
			},
			divider: {
				height: 30,
				borderTop: '1px solid #888'
			}
		}

		return (
			<div className="row" style={styles.header}>
				<div className="col-12">
					<img src={pacer_logo} alt="" />
				</div>
				<div className="col-12">
					<h4>Race training using the run/walk method.
					</h4>
					<div style={styles.divider} />
				</div>
			</div>
		)
	}
}
