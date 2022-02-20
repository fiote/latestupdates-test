import * as React from "react";

import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../../app/store';
import { openForm} from '../modal/modalSlice';

import './articles.css';

import Article from "./Article";
import { DefArticle, emptyArticle } from "./articlesSlice";

const Articles = () => {
  	const list = useSelector<RootState>((state) => state.art.list) as DefArticle[];
  	const dispatch = useDispatch();

	const onClickAdd = () => {
		dispatch(openForm(emptyArticle));
	};

	const articles = list.map((art: DefArticle) => <Article key={art.id} art={art} /> );

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

export default Articles;