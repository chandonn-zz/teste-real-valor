import React, { Component } from 'react';
import { connect } from 'react-redux';

class Results extends Component {
	// Aqui será feita a tabela com os dados específicos da aplicação
	render() {
		return(
			<div className="Results">
				<div className="row">
					<span className="secondTitle">Veja o resumo dos seus resultados</span>
				</div>
				<div className="row">
					<div>
						<span>Início da aplicação:</span>
					</div>
					<div>
						<span>{this.props.initialDate}</span>
					</div>
				</div>
				<div className="row">
					<div>
						<span>Fim da aplicação:</span>
					</div>
					<div>
						<span>{this.props.finalDate}</span>
					</div>
				</div>
				<div className="row">
					<div>
						<span>Valor investido:</span>
					</div>
					<div>
						<span>{this.props.amount}</span>
					</div>
				</div>
				<div className="row">
					<div>
						<span>Ativo escolhido:</span>
					</div>
					<div>
						<span>{this.props.type}</span>
					</div>
				</div>
				<div className="row">
					<div className="row">
						<span className="thirdTitle">Seu patrimônio atual:</span>
					</div>
					<div>
						<span className="total">{this.props.total}</span>
					</div>
				</div>
				<div className="row">
					<div className="row">
						<span className="thirdTitle">Lucro total:</span>
					</div>
					<div>
						<span className="total">{this.props.profit}</span>
					</div>
				</div>
			</div>
		)
	}
}

const mapStateToProps = (store) => ({
	period: store.Chart.period,
	initialDate: store.Chart.initialDate,
	finalDate: store.Chart.finalDate,	
	amount: store.Chart.amount,
	type: store.Chart.type,
	total: store.Chart.total,
	profit: store.Chart.profit
})

export default connect(mapStateToProps)(Results);