import React, { Component } 			  from 'react';
import { connect } 						  from 'react-redux';
import { bindActionCreators }			  from 'redux';
import { getBitcoinData, getTesouroData } from '../actions';

import '../styles/App.css';

class SimulationForm extends Component {
	constructor() {
		super();

		this.state = {
			period: 1,
			amount: 2000,
			type: 'tesouro',

			bg1: 'transparent',
			bg2: 'transparent',
			bg3: 'transparent',
			bg4: 'transparent',
			bg5: 'transparent',
			bg6: 'transparent',

			border1: '2px solid #FFF',
			border2: '2px solid #FFF',
			border3: '2px solid #FFF',
			border4: '2px solid #FFF',
			border5: '2px solid #FFF',
			border6: '2px solid #FFF'
		}

		this.changeAmount    = this.changeAmount.bind(this);
		this.changePeriod    = this.changePeriod.bind(this);
		this.startSimulation = this.startSimulation.bind(this)
	}

	changeAmount = (value) => {
		if (value === 2000) {
			this.setState({
				amount: value,
				bg3: '#303f9f',
				border3: '2px solid #303f9f',
				bg4: 'transparent',
				border4: '2px solid #FFF'
			})
		} else {
			this.setState({
				amount: value,
				bg4: '#303f9f',
				border4: '2px solid #303f9f',
				bg3: 'transparent',
				border3: '2px solid #FFF'
			})
		}
	}

	changePeriod = (value) => {
		if (value === 1) {
			this.setState({
				period: value,
				bg1: '#303f9f',
				border1: '2px solid #303f9f',
				bg2: 'transparent',
				border2: '2px solid #FFF'
			})
		} else {
			this.setState({
				period: value,
				bg2: '#303f9f',
				border2: '2px solid #303f9f',
				bg1: 'transparent',
				border1: '2px solid #FFF'
			})
		}
	}

	changeType = (value) => {
		if (value === 'bitcoin') {
			this.setState({
				type: value,
				bg5: '#303f9f',
				border5: '2px solid #303f9f',
				bg6: 'transparent',
				border6: '2px solid #FFF'
			})
		} else {
			this.setState({
				type: value,
				bg6: '#303f9f',
				border6: '2px solid #303f9f',
				bg5: 'transparent',
				border5: '2px solid #FFF'
			})
		}
	}

	startSimulation(e) {
		e.preventDefault()
		switch(this.state.type) {
			case 'bitcoin': {
				this.props.getBitcoinData(this.state.period, this.state.amount)
				break;
			}
			case 'tesouro': {
				this.props.getTesouroData(this.state.period, this.state.amount)
				break;
			}
			default: return
		}
	}

	render() {
		return(
			<div className='SimulationForm'>
				<form onSubmit={this.startSimulation}>
					<span className='subTitle'>Tempo da aplicação</span>

					<div className='selectionGroup'>
						<div
							style={{background: this.state.bg1, border: this.state.border1, transition: 'background .2s ease, border .2s ease'}}
							className='option'
							onClick={() => this.changePeriod(1)}>
								<span>1 ano atrás</span>
						</div>
						<div
							style={{background: this.state.bg2, border: this.state.border2, transition: 'background .2s ease, border .2s ease'}}
							className='option'
							onClick={() => this.changePeriod(2)}>
								<span>2 anos atrás</span>
						</div>						
					</div>
					<span className='subTitle'>Valor do investimento</span>

					<div className='selectionGroup'>
						<div
							style={{background: this.state.bg3, border: this.state.border3, transition: 'background .2s ease, border .2s ease'}}
							className='option'
							onClick={() => this.changeAmount(2000)}>
								<span>R$ 2000</span>
						</div>
						<div
							style={{background: this.state.bg4, border: this.state.border4, transition: 'background .2s ease, border .2s ease'}}
							className='option'
							onClick={() => this.changeAmount(10000)}>
								<span>R$ 10 000</span>
						</div>
					</div>
					<span className='subTitle'>Tipo de aplicação</span>

					<div className='selectionGroup'>
						<div
							style={{background: this.state.bg5, border: this.state.border5, transition: 'background .2s ease, border .2s ease'}}
							className='option'
							onClick={() => this.changeType('bitcoin')}>
								<span>Bitcoin</span>
						</div>
						<div
							style={{background: this.state.bg6, border: this.state.border6, transition: 'background .2s ease, border .2s ease'}}
							className='option'
							onClick={() => this.changeType('tesouro')}>
								<span>Tesouro Direto</span>
						</div>						
					</div>
					<button className='button' onClick={this.props.startSimulation}><span className='buttonText'>Fazer simulação</span></button>
				</form>
			</div>
		)
	}
}

const mapStateToProps = (store) => {
	return {}
}

const mapDispatchToProps = (dispatch) => 
	bindActionCreators({ getBitcoinData, getTesouroData }, dispatch)

export default connect(mapStateToProps, mapDispatchToProps)(SimulationForm);