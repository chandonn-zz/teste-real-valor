import React, { Component }    from 'react';
import { connect } 			   from 'react-redux';
import { bindActionCreators }  from 'redux';
import './styles/App.css';
import ReactCSSTransitionGroup from 'react-addons-css-transition-group';
import LoginForm 			   from './components/LoginForm.js';
import SimulationForm 		   from './components/SimulationForm.js';
import Chart 				   from './components/Chart';
import logo 				   from './assets/logo.png';
import Results				   from './components/Results';
import {
	getBitcoinData,
	getTesouroData
} 							   from './actions';

class RealValorApp extends Component {
	constructor() {
		super();

		this.state = {
			mounted:    false,
			logged:     false,
			simulating: false,
			chartData: {},
			chartOptions: {},
			graphType: 'line',
			resultsData: false
		}

		this.startSimulation    = this.startSimulation.bind(this)
		this.changeChartOptions = this.changeChartOptions.bind(this)
		this.changeStats 		= this.changeStats.bind(this)
		this.openResults 		= this.openResults.bind(this)
	}

	componentDidMount() {
		this.changeChartOptions()
	}

	componentWillReceiveProps(nextProps) {
		if (nextProps.userName !== this.props.userName) {
			this.setState({
				mounted: false,
				logged: true
			})
		}
		if (nextProps.bitcoinData !== this.props.bitcoinData) {
			console.log(nextProps.bitcoinData)
			this.setState({
				chartData: nextProps.bitcoinData
			})
		}
		if (nextProps.tesouroData !== this.props.tesouroData) {
			console.log(nextProps.tesouroData)
			this.setState({
				chartData: nextProps.tesouroData
			})
		}
	}

	startSimulation(e) {
		this.setState({
			logged: false,
			simulating: true
		})
	}

	openResults() {
		this.setState({ resultsData: !this.state.resultsData })
	}

	changeChartOptions() {
		this.setState({
			mounted: true,
			chartOptions: {
				title: {
					display: true,
					text: "Sua Rentabilidade",
					fontSize: 25,
					fontColor: '#fff'
				},
				legend: {
					display: true,
					position: 'bottom',
					fontColor: '#fff',
					fontSize: 16
				}
			}
		})
	}

	changeStats() {
		if (this.props.type === 'Bitcoin') {
			this.props.getTesouroData(this.props.period, this.props.amount)
		} else {
			this.props.getBitcoinData(this.props.period, this.props.amount)
		}
	}

	render() {

		var subTitle,
			loginForm,
			presentation,
			simulationForm,
			simulationGraph,
			button,
			resultsData

		if ( this.state.mounted ) {
			subTitle = 'Entre na sua conta e acompanhe seus investimentos'
			loginForm = (<LoginForm/>)
		}

		if ( this.state.logged ) {
			presentation = <div><span>Olá {this.props.userName}!</span></div>
			subTitle = 'Para acompanhar suas aplicações diga o período, valor e tipo de aplicação'
			simulationForm = (<SimulationForm startSimulation={this.startSimulation}/>)
		}

		if ( this.state.simulating ) {
			subTitle = 'Veja aqui os resultados de seus investimentos'
			simulationGraph  = (<Chart type={this.state.graphType} data={this.state.chartData} options={this.state.chartOptions} height={350} width={700}/>)
			button = <button className="button changeGraphButton" onClick={this.changeStats}><span className="buttonText">Mudar tipo de ativo</span></button>
		}

		if ( this.state.resultsData ) {
			resultsData = (<Results />)
		}

		return (
			<div className="RealValorApp">
				<div className="mainTitle">
					<img className="realLogo" src={logo} alt="Real Valor"></img>
					<span>Real Valor</span>
				</div>
				<div className="secondTitle">
					{presentation}
					<span>{subTitle}</span>
				</div>

				<div className="mainApp">
					<ReactCSSTransitionGroup
						transitionName="login"
						transitionEnterTimeout={500}
						transitionLeaveTimeout={300}>

						{loginForm}

					</ReactCSSTransitionGroup>

					<ReactCSSTransitionGroup
						transitionName="simulation"
						transitionEnterTimeout={500}
						transitionLeaveTimeout={300}>

						{simulationForm}

					</ReactCSSTransitionGroup>

					<ReactCSSTransitionGroup
						transitionName="simulation"
						transitionEnterTimeout={500}
						transitionLeaveTimeout={300}>

						<div onClick={this.openResults} style={{backgroundColor: '#fff', padding: this.state.simulating ? '10px' : 0}}>
							{simulationGraph}
						</div>
						{button}
						{resultsData}

					</ReactCSSTransitionGroup>
				</div>
			</div>
		)
	}
}

const mapStateToProps = store => ({
	type: store.Chart.type,
	userName: store.User.userName,
	amount: store.Chart.amount,
	period: store.Chart.period,
	bitcoinData: store.Chart.bitcoinData,
	tesouroData: store.Chart.tesouroData,
})

const mapDispatchToProps = (dispatch) =>
	bindActionCreators({ getBitcoinData, getTesouroData }, dispatch)

export default connect(mapStateToProps, mapDispatchToProps)(RealValorApp);
