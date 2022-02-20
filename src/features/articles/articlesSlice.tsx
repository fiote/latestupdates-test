import { createSlice } from '@reduxjs/toolkit';

export interface DefArticle {
	id: number;
	title?: string;
	category?: string;
	link?: string;
	image?: string;
	[key: string]: any;
}

export interface ArticlesState {
	list: DefArticle[]
};

const lskArticles = 'storedArticles';

export const loadArticlesState = () : ArticlesState => {
	const state = {
		list: [
			{
				id: 1,
				title: 'Why cloud computing is the best option for hospitals adopting AI',
				category: 'ARTICLE',
				image: 'https://i0.wp.com/www.aidence.com/wp-content/uploads/2022/02/House.png?fit=300,262',
				link: 'https://www.aidence.com/articles/cloud-best-option-imaging-ai/'
			},
			{
				id: 2,
				title: 'Artificial Intelligence in Practice 2022',
				category: 'EVENTS',
				image: 'https://i0.wp.com/www.aidence.com/wp-content/uploads/2020/09/00109940_cw_image_wi_9f3af12068c3548d7527bd4b316ad317.jpg.pagespeed.ce_.fDsapWt6GJ__1_-removebg-preview.png?fit=300,300',
				link: 'https://www.mybir.org.uk/CPBase__event_detail?id=a173Y00000GALT7QAP&site=a0N2000000COvFsEAL'
			},
			{
				id: 3,
				title: 'Aidence is acquired by RadNet, accelerating its efforts in AI  for lung cancer care',
				category: 'NEWS',
				image: 'https://i0.wp.com/www.aidence.com/wp-content/uploads/2019/12/Partnership.png?fit=233,300',
				link: 'https://www.aidence.com/news/aidence-acquired-by-radnet/'
			}
		]
	};

	if (typeof localStorage != 'undefined') {
		const stored = localStorage.getItem(lskArticles);
		if (stored) state.list = JSON.parse(stored);
	}

	return state;
}

const persistState = (state: ArticlesState) => {
	if (typeof localStorage != 'undefined') {
		localStorage.setItem(lskArticles, JSON.stringify(state.list));
	}
}

export const emptyArticle : DefArticle = {
	id: 0,
	title: '',
	category: '',
	image: '',
	link: ''
};

export const articlesSlice = createSlice({
	name: 'articles',

	initialState: loadArticlesState(),

	reducers: {
		insertEntry: (state, action) => {
			const id = state.list.length ? Math.max(...state.list.map(x => x.id))+1 : 1;
			const entry = action.payload as DefArticle;
			state.list.push({...entry, id});
			persistState(state);
		},
		removeEntry: (state, action) => {
			const entry = action.payload as DefArticle;
			state.list = state.list.filter(x => x.id !== entry.id);
			persistState(state);
		},
		updateEntry: (state, action) => {
			const entry = action.payload as DefArticle;
			state.list = state.list.map(x => x.id === entry.id ? entry : x);
			persistState(state);
		},
	},
})

export const { insertEntry, removeEntry, updateEntry } = articlesSlice.actions;

export default articlesSlice.reducer;