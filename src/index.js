import React 				 from 'react';
import ReactDOM 			 from 'react-dom';
import './styles/index.css';
import RealValorApp 		 from './App';
import registerServiceWorker from './registerServiceWorker';
import { Provider } 		 from 'react-redux';
import { Store } 			 from './store';

ReactDOM.render(
	<Provider store={Store}>
		<RealValorApp />
	</Provider>
	, document.getElementById('root')
);

registerServiceWorker();
