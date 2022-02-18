import * as React from "react";
import DefArticle from "./defs/DefArticle";


interface  ArticleListParams {
	list: DefArticle[],
	onClickEdit: (art: DefArticle) => void;
	onClickDelete: (art: DefArticle) => void;
	onClickAdd: () => void;
}

const ArticleList = (params: ArticleListParams) => {

	const articles = params.list.map((art: DefArticle) => {
		return (
			<div className="col-md-6 col-lg-4 item" key={art.id}>
				<div className="blog-post" data-link={art.link} data-target="_self">
					<div className="post-image illustration" style={{ "backgroundImage": 'url('+art.image+')' }}>
						<div onClick={() => params.onClickEdit(art)} className="btn btn-main btn-smaller btn-positive btn-edit-article">Edit Article</div>
						<div onClick={() => params.onClickDelete(art)} className="btn btn-main btn-smaller btn-negative btn-delete-article">Delete</div>
					</div>
					<div className="content">
						<div className="post-categories">
							<a href={art.link} className="post-category" target="_self" rel="noreferrer">{art.category}</a>
						</div>
						<h2>{art.title}</h2>
						<a href={art.link} className="moretag" target="_self" rel="noreferrer">Continue reading...</a>
					</div>
				</div>
			</div>
		)
	});

	return (
		<div className="container latest-updates">
			<h2>Latest<br/><em>updates</em></h2>
			<div className="row items">
				{articles}

				<div className="col-md-6 col-lg-4 item item-empty" onClick={params.onClickAdd}>
					<div className="blog-post">
						<div className="btn btn-main btn-smaller btn-add-article">Add Article</div>
					</div>
				</div>
			</div>
		</div>
	);

};

export default ArticleList;