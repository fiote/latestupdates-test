import { createContext } from 'react';
import { DefArticle } from '../js/Article';

export enum ModalType {
	FORM = "FORM",
	CONFIRM = "CONFIRM"
}

interface IModalContext {
	visible: boolean;
	entry: DefArticle;
	type: ModalType | undefined;

	openForm(entry: DefArticle): void;
	openDelete(entry: DefArticle): void;
	closeModal(): void;

}

const ModalContext = createContext<IModalContext>({} as IModalContext);

export const ModalProvider = ModalContext.Provider;
export default ModalContext;