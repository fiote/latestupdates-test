import * as React from "react";
import './app.css';

import Articles from "../features/articles/Articles";
import FormModal from "../features/modal/FormModal";
import ConfirmModal from "../features/modal/ConfirmModal";

import store from './store';
import { Provider } from 'react-redux';

function App() {

	// ===== RENDER =================================================

	return (
		<div className="app home">
			<Provider store={store}>
				<Articles />
				<FormModal />
				<ConfirmModal />
			</Provider>
		</div>
	);

}

export default App;
