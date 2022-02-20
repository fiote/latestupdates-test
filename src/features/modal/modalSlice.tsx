import { createSlice } from '@reduxjs/toolkit';
import { DefArticle } from '../articles/articlesSlice';

export enum ModalType {
	FORM = "FORM",
	CONFIRM = "CONFIRM"
}

export interface ModalState {
	visible: boolean,
	type: ModalType | null,
	entry: DefArticle | null,
	fieldclass: StringObject
};

export interface StringObject {
	[key: string] : string;
}

const emptyClasses = {
	title: '',
	category: '',
	link: '',
};

const openModal = (state: ModalState, entry: DefArticle, type: ModalType) => {
	state.entry = entry;
	state.type = type;
	state.visible = true;
	state.fieldclass = emptyClasses;
};

export const modalSlice = createSlice({
	name: 'articles',

	initialState: {
		visible: false,
		type: null,
		entry: null,
		fieldclass: emptyClasses
	} as ModalState,

	reducers: {
		openForm: (state, action) => {
			openModal(state, action.payload, ModalType.FORM);
		},
		openRemove: (state, action) => {
			openModal(state, action.payload, ModalType.CONFIRM);
		},
		setValue: (state, action) => {
			const { key, value } = action.payload;
			if (state.entry) state.entry[key] = value;
			if (value !== '') state.fieldclass[key] = '';
		},
		setClass: (state, action) => {
			const { key, fclass } = action.payload;
			state.fieldclass[key] = fclass;
		},
		closeModal: (state, action?) => {
			state.visible = false;
		},
	},
})

export const { openForm, openRemove, closeModal, setValue, setClass } = modalSlice.actions;

export default modalSlice.reducer;