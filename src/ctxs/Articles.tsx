import { createContext } from 'react';
import { DefArticle } from '../js/Article';

interface IArticlesContext {

	data: DefArticle[];
	entry: DefArticle;
	template: DefArticle;

	saveData(newdata: DefArticle[]): void;

	updateArticle(art: DefArticle): void;
	insertArticle(art: DefArticle): void;
	removeArticle(art: DefArticle): void;
}

const ArticlesContext = createContext<IArticlesContext>({} as IArticlesContext);

export const ArticlesProvider = ArticlesContext.Provider;
export default ArticlesContext;