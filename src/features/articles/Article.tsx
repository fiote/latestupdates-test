import * as React from "react";
import { useDispatch } from 'react-redux';
import { DefArticle } from "./articlesSlice";
import { openForm, openRemove } from '../modal/modalSlice';

interface  ArticleParams {
	art: DefArticle;
}

const Article = (params: ArticleParams) => {
	const dispatch = useDispatch();

	const { art } = params;

	const onClickEdit = () => dispatch(openForm(art));
	const onClickDelete = () => dispatch(openRemove(art));

	return (
		<div className="col-md-6 col-lg-4 item" key={params.art.id} role="listitem">
			<div className="blog-post" data-link={params.art.link} data-target="_self">
				<div className="post-image illustration" style={{ "backgroundImage": 'url('+params.art.image+')' }}>
					<div data-testid="edit-button" onClick={onClickEdit} className="btn btn-main btn-smaller btn-positive btn-edit-article">Edit</div>
					<div data-testid="delete-button" onClick={onClickDelete} className="btn btn-main btn-smaller btn-negative btn-delete-article">Delete</div>
				</div>
				<div className="content">
					<div className="post-categories">
						<a href={params.art.link} className="post-category" target="_self" rel="noreferrer">{params.art.category}</a>
					</div>
					<h2>{params.art.title}</h2>
					<a href={params.art.link} className="moretag" target="_self" rel="noreferrer">Continue reading...</a>
				</div>
			</div>
		</div>
	)
};

export default Article;