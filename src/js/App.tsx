import * as React from "react";

import '../css/app.css';
import ArticleList from "./ArticleList";
import ArticleModal from "./ArticleModal";
import ConfirmationModal from "./ConfirmationModal";
import DefArticle from "./defs/DefArticle";

function App() {
	const emptyEntry = {id: 0, title: '', category: '', image: '', link: ''} as DefArticle;

	let baseArticles = [
		{
			id: 1,
			title: 'Why cloud computing is the best option for hospitals adopting AI',
			category: 'ARTICLE',
			image: 'https://i0.wp.com/www.aidence.com/wp-content/uploads/2022/02/House.png?fit=300',
			link: 'https://www.aidence.com/articles/cloud-best-option-imaging-ai/'
		}
	];

	const storedData = localStorage.getItem('storedArticles');
	if (storedData) baseArticles = JSON.parse(storedData);

	const [valueArticles, setArticles] = React.useState<DefArticle[]>(baseArticles);

	const persistArticles = (list: DefArticle[]) => {
		localStorage.setItem('storedArticles', JSON.stringify(list));
		setArticles(list);
	};

	// ===== EDIT/ADD ===============================================

	const [valueModalVisible, setModalVisible] = React.useState(false);
	const [valueModalEntry, setModalEntry] = React.useState<DefArticle>(emptyEntry);

	const onClickEdit = (art: DefArticle) => {
		setModalEntry(art);
		setModalVisible(true);
	}

	const onClickAdd = () => {
		setModalEntry(emptyEntry as DefArticle);
		setModalVisible(true);
	};

	const onSubmitDataModal = (valueForm: DefArticle) => {
		let newArticles = valueArticles;

		if (valueForm.id) {
			newArticles = valueArticles.map(art => art.id == valueForm.id ? valueForm : art);
		} else {
			const nextId = Math.max(...valueArticles.map(art => art.id))+1;
			valueForm.id = nextId;
			newArticles = [...valueArticles, valueForm];
		}

		persistArticles(newArticles);
		setModalVisible(false);
	};

	const onClickCloseModal = () => {
		setModalEntry(emptyEntry as DefArticle);
		setModalVisible(false);
	};

	// ===== DELETE FLOW ============================================

	const [valueDeleteVisible, setDeleteVisible] = React.useState(false);
	const [valueDeleteDescription, setDeleteDescription] = React.useState("");
	const [valueDeleteEntry, setDeleteEntry] = React.useState<DefArticle>(emptyEntry);

	const onClickDelete = (art: DefArticle) => {
		setDeleteEntry(art);
		setDeleteDescription(`Are you sure you want to delete [${art.title}]?`);
		setDeleteVisible(true);
	}

	const onConfirmDelete = () => {
		const newArticles = valueArticles.filter(art => art.id != valueDeleteEntry.id);
		persistArticles(newArticles);
		setDeleteEntry(emptyEntry);
		setDeleteVisible(false);
	};

	const onCancelDelete = () => {
		setDeleteVisible(false);
	};

	// ===== RENDER =================================================

	return (
		<div className="App home">
			<ArticleList list={valueArticles} onClickEdit={onClickEdit} onClickDelete={onClickDelete} onClickAdd={onClickAdd} />
			<ArticleModal entry={valueModalEntry} visible={valueModalVisible} onSubmitData={onSubmitDataModal} onClickClose={onClickCloseModal} />
			<ConfirmationModal visible={valueDeleteVisible} title="Delete Entry" description={valueDeleteDescription} onClickConfirm={onConfirmDelete} onClickCancel={onCancelDelete} />
		</div>
	);
}

export default App;
