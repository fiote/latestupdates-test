import { configureStore } from '@reduxjs/toolkit'
import artReducer from '../features/articles/articlesSlice';
import modalReducer from '../features/modal/modalSlice';

const store = configureStore({
	reducer: {
		art: artReducer,
		modal: modalReducer
	},
})

export type RootState = ReturnType<typeof store.getState>;

export default store;