import * as React from "react";
import { useContext } from "react";
import '../css/articles.css';

import Article, { DefArticle } from "./Article";
import ArticlesContext from "../ctxs/Articles";
import ModalContext from "../ctxs/Modal";

const ArticleList = () => {

	const ctxArt = useContext(ArticlesContext);
	const ctxModal = useContext(ModalContext);

	const onClickAdd = () => ctxModal.openForm(ctxArt.template);

	const articles = ctxArt.data.map((art: DefArticle) => <Article key={art.id} art={art} /> );

	return (
		<div className="container latest-updates">
			<h2>
				Latest<br/>
				<em>updates</em>
			</h2>

			<div className="row items">
				{articles}

				<div className="col-md-6 col-lg-4 item item-empty" onClick={onClickAdd}>
					<div className="blog-post">
						<div className="btn btn-main btn-smaller btn-positive btn-add-article">Add New</div>
					</div>
				</div>
			</div>
		</div>
	);

};

export default ArticleList;