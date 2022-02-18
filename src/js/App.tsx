import * as React from "react";
import { useContext } from "react";
import '../css/app.css';

import ArticleList from "./ArticleList";
import FormModal from "./FormModal";
import ConfirmModal from "./ConfirmModal";
import ArticlesContext, { ArticlesProvider } from "../ctxs/Articles";
import ModalContext, { ModalProvider, ModalType } from "../ctxs/Modal";
import { DefArticle } from "./Article";

function App() {

	let baseArticles = [
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
	];

	const storedData = localStorage.getItem('storedArticles');
	if (storedData) baseArticles = JSON.parse(storedData);

	const [valueArticles, setArticles] = React.useState<DefArticle[]>(baseArticles);

	// ===== CONTEXT (ARTICLES) =====================================

	const ctxArt = useContext(ArticlesContext);
	ctxArt.template = { id: 0, title: '', category: '', image: '', link: '' };
	ctxArt.data = valueArticles;

	ctxArt.saveData = (list: DefArticle[]) => {
		setArticles(list);
		localStorage.setItem('storedArticles', JSON.stringify(list));
	};

	ctxArt.insertArticle = (art: DefArticle) => {
		const nextId = Math.max(...valueArticles.map(art => art.id)) + 1;
		art.id = nextId;
		const newArticles = [...valueArticles, art];
		ctxArt.saveData(newArticles);
	};

	ctxArt.updateArticle = (art: DefArticle) => {
		if (!art.id) return ctxArt.insertArticle(art);
		const newArticles = valueArticles.map(x => x.id === art.id ? art : x);
		ctxArt.saveData(newArticles);
	};

	ctxArt.removeArticle = (art: DefArticle) => {
		const newArticles = valueArticles.filter(x => x.id !== art.id);
		ctxArt.saveData(newArticles);
	};

	// ===== CONTEXT (MODAL) ========================================

	const [valueModalVisible, setModalVisible] = React.useState(false);
	const [valueModalType, setModalType] = React.useState<ModalType>();
	const [valueModalEntry, setModalEntry] = React.useState<DefArticle>(ctxArt.template);

	const ctxModal = useContext(ModalContext);
	ctxModal.visible = valueModalVisible;
	ctxModal.entry = valueModalEntry;
	ctxModal.type = valueModalType;

	ctxModal.openForm = (art: DefArticle) => {
		setModalEntry(art);
		setModalType(ModalType.FORM);
		setModalVisible(true);
	};

	ctxModal.openDelete = (art: DefArticle) => {
		setModalEntry(art);
		setModalType(ModalType.CONFIRM);
		setModalVisible(true);
	};

	ctxModal.closeModal = () => {
		setModalEntry(ctxArt.template);
		setModalVisible(false);
	};

	// ===== RENDER =================================================

	return (
		<div className="app home">
			<ArticlesProvider value={ctxArt} />
			<ModalProvider value={ctxModal} />
			<ArticleList />
			<FormModal />
			<ConfirmModal />
		</div>
	);

}

export default App;
