import axios from 'axios';
import { SAVE_CREDENTIALS, DISPATCH_BITCOIN, DISPATCH_TESOURO } from './actionTypes';

export function saveCredentials(name, email, pass) {
	return {
		type:  SAVE_CREDENTIALS,
		name:  name,
		email: email,
		pass:  pass		
	}
}

export function getBitcoinData(period, amount) {
	var start = new Date(); // Data de fim
	var finish = new Date(start.getFullYear() - period, start.getMonth(), start.getDate()); // Data de inicio

	// Datas precisam de zeros quando menos que 10
	var month = start.getMonth() < 10 ? '0'+start.getMonth() : start.getMonth()+'';
	var day = start.getDate() < 10 ? '0'+start.getDate() : start.getDate()+'';
	var initialString = start.getFullYear()+'-'+month+'-'+day;

	// O mesmo para a data final
	var endString = finish.getFullYear()+'-'+month+'-'+day;

	return( dispatch ) => {
		return axios.get('https://api.coindesk.com/v1/bpi/historical/close.json?currency=BRL&start='+endString+'&end='+initialString).then(response => {
			dispatch(calculateBitcoinData(period, amount, response.data.bpi, day))
		})
	}
}

export function calculateBitcoinData(period, amount, bitData, day) {
	var dateRange = [];
	var values    = [];
	var prop      = ''
	var totalInBitcoin;
	totalInBitcoin = (1/bitData[Object.keys(bitData)[0]])*amount;

	for (var property in bitData) {

		if ( ! bitData.hasOwnProperty(property) || property.substr(8,9) !== day) {
			continue;
		}

		prop = (property).substr(2,5)
		prop = prop.replace('-', '/');

		dateRange.push(prop);
		values.push(bitData[property]*totalInBitcoin);

	}

	var chartData = {
		labels: dateRange,
		datasets: [{
			label: "Rentabilidade",
			backgroundColor: '#f57c00',
			borderColor: '#303f9f',
			data: values,
		}]
	}

	return {
		type: DISPATCH_BITCOIN,
		period: period,
		amount: amount,
		chartData: chartData
	}
}

export function getTesouroData(period, amount) {
	// Calculando período de amostra, em meses
	// Pegarei apenas os últimos dois dígitos do ano
	// para não poluir o gráfico
	var date1 = new Date();
	var date2 = new Date(date1.getFullYear() - period, date1.getMonth(), date1.getDate());
	var month;
	var dateRange = [(date1.getMonth() + 1) + '/' + date1.getFullYear().toString().substr(-2)];

	// Dados para cálculo do rendimento do tesouro direto
	var inflacao = 0.06; // Considerando 6% ao ano
	var taxaDeJuros = 0.1; // Considerando 10% ao ano
	var taxaCorretora = 0.003; // Taxa básica de cobrança das corretoras
	var incidenciaGeral = ( ((1+inflacao) * (1+taxaDeJuros) * (1-taxaCorretora)) - 1 ) / 12;
	var taxaFinal = amount * incidenciaGeral;

	var values = [amount];

	var index = 0 // Onde vai começar o cálculo
	// Valores com juros calculados de acordo com o mês
	while(date2 < date1) {
	    month = date1.getMonth()
	    date1 = new Date(date1.setMonth(--month));
	    dateRange.push((date1.getMonth() + 1) + '/' + date1.getFullYear().toString().substr(-2));
	    values.push(values[index] + taxaFinal);

	    index++; // aumentamos o índice
	}
	// Atualizando os dados mostrados no gráfico
	var chartData = {
		labels: dateRange,
		datasets: [{
			label: "Rentabilidade",
			backgroundColor: '#f57c00',
			borderColor: '#303f9f',
			data: values,
		}]
	}


	return {
		type: DISPATCH_TESOURO,
		period: period,
		amount: amount,
		chartData: chartData
	}
}

// DADOS Tesouro direto
// imposto de renda: 0.3% ao ano
