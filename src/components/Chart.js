import React, { Component } from 'react';
import {Bar} 				from 'react-chartjs-2';
import {Line} 				from 'react-chartjs-2';
import {Radar} 				from 'react-chartjs-2';

class Chart extends Component {
	constructor(props) {
		super(props);

		this.state = {
			data: this.props.data,
			options: this.props.options
		} 
	}

	render() {
		switch(this.props.type) {
			case 'line': {
				return (
					<Line data={this.props.data} options={this.props.options} height={this.props.height} width={this.props.width}/>
				)
			}
			case 'bar': {
				return (
					<Bar data={this.props.data} options={this.props.options} height={this.props.height} width={this.props.width}/>
				)
			}
			case 'radar': {
				return (
					<Radar data={this.props.data} options={this.props.options} height={this.props.height} width={this.props.width}/>
				)
			}
			default: {
				return (
					<Line data={this.props.data} options={this.props.options} height={this.props.height} width={this.props.width}/>
				)
			}
		}
	}
}

export default Chart;