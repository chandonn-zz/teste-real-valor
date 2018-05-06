import React, { Component } from 'react';

import '../styles/App.css';

class Input extends Component {
	render() {
		return (
			<div className='Input'>
				<input
					className='input'
					id={this.props.name}
					type={this.props.type}
					placeholder={this.props.placeholder}
					autoComplete='false'
					value={this.props.value}
					onChange={this.props.onChange}
					required
				/>
				<label hmlfor={this.props.name}></label>
			</div>
		)
	}
}

export default Input;