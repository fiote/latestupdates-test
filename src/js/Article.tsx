import * as React from "react";
import { useContext } from "react";
import ModalContext from "../ctxs/Modal";

interface  ArticleParams {
	art: DefArticle;
}

const Article = (params: ArticleParams) => {

	const { art } = params;
	const ctxModal = useContext(ModalContext);

	const onClickEdit = () => ctxModal.openForm(art);
	const onClickDelete = () => ctxModal.openDelete(art);

	return (
		<div className="col-md-6 col-lg-4 item" key={params.art.id}>
			<div className="blog-post" data-link={params.art.link} data-target="_self">
				<div className="post-image illustration" style={{ "backgroundImage": 'url('+params.art.image+')' }}>
					<div onClick={onClickEdit} className="btn btn-main btn-smaller btn-positive btn-edit-article">Edit</div>
					<div onClick={onClickDelete} className="btn btn-main btn-smaller btn-negative btn-delete-article">Delete</div>
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

export interface DefArticle {
	id: number;
	title?: string;
	category?: string;
	link?: string;
	image?: string;
	[key: string]: any;
}

export default Article;