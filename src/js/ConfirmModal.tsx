import * as React from "react";
import { useContext } from "react";
import ArticlesContext from "../ctxs/Articles";
import ModalContext, { ModalType } from "../ctxs/Modal";
import GenericModal from "./GenericModal";

const ConfirmModal = () => {
	const ctxModal = useContext(ModalContext);
	const ctxArt = useContext(ArticlesContext);

	const onClickConfirm = () => {
		ctxArt.removeArticle(ctxModal.entry);
		ctxModal.closeModal();
	};

	const title = "Delete Entry";
	const description = `Are you sure you want to delete [${ctxModal.entry.title}]?`;

	const body = (
		<div>
			{description}
			<div className='am-actions'>
				<div onClick={onClickConfirm} className="btn btn-main btn-smaller btn-negative btn-delete-article">Yes, Delete it</div>
				<div onClick={ctxModal.closeModal} className="btn btn-main btn-smaller btn-neutral">No, I changed my mind</div>
			</div>
		</div>
	)

	return <GenericModal type={ModalType.CONFIRM} title={title} body={body}  />;
};

export default ConfirmModal;