import * as React from "react";

import { useDispatch, useSelector } from 'react-redux';

import { removeEntry } from '../articles/articlesSlice';
import { closeModal, ModalState, ModalType } from './modalSlice';

import GenericModal from "./GenericModal";
import { RootState } from "../../app/store";

const ConfirmModal = () => {
	const modal = useSelector<RootState>((state) => state.modal) as ModalState;
  	const dispatch = useDispatch();

	const onClickConfirm = () => {
		dispatch(removeEntry(modal.entry));
		onClickCancel();
	};

	const onClickCancel = () => {
		dispatch(closeModal(null));
	};

	const title = "Delete Entry";
	const description = `Are you sure you want to delete [${modal.entry?.title}]?`;

	const body = (
		<div>
			{description}
			<div className='am-actions'>
				<div onClick={onClickConfirm} className="btn btn-main btn-smaller btn-negative btn-delete-article">Yes, Delete it</div>
				<div onClick={onClickCancel} className="btn btn-main btn-smaller btn-neutral">No, I changed my mind</div>
			</div>
		</div>
	)

	return <GenericModal type={ModalType.CONFIRM} title={title} body={body}  />;
};

export default ConfirmModal;