import React, { Component }   from 'react';
import { connect } 			  from 'react-redux';
import { bindActionCreators } from 'redux';
import { saveCredentials }    from '../actions';
import Input 				  from './Input.js';

import '../styles/App.css';

class LoginForm extends Component {
	constructor() {
		super();

		this.state = {
			name: '',
			email: '',
			password: ''
		}

		this.saveUserCredentials = this.saveUserCredentials.bind(this)
	}

	writeName = event => {
		this.setState({
			name: event.target.value
		})
	}

	writeEmail = event => {
		this.setState({
			email: event.target.value
		})
	}

	writePass = event => {
		this.setState({
			password: event.target.value
		})
	}

	saveUserCredentials(e) {
		e.preventDefault();
		this.props.saveCredentials(this.state.name, this.state.email, this.state.password)
	}

	render() {

		return (
			<div className='LoginForm'>
				<form onSubmit={this.saveUserCredentials}>
					<Input onChange={this.writeName} type="text" placeholder="Nome"/>
					<Input onChange={this.writeEmail} type="email" placeholder="Email"/>
					<Input onChange={this.writePass} type="password" placeholder="Senha"/>

					<button className='button'>
						<span className='buttonText'>Entrar</span>
					</button>
				</form>
			</div>
		)
	}
}

const mapStateToProps = (store) => {
	return {}
}

const mapDispatchToProps = dispatch =>
	bindActionCreators({ saveCredentials }, dispatch);

export default connect( mapStateToProps, mapDispatchToProps )( LoginForm );