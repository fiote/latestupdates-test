import * as React from "react";
import { ReactElement, useContext } from "react";
import '../css/modal.css';
import ModalContext, { ModalType } from "../ctxs/Modal";

interface ConfirmationModalParams {
	type: ModalType;
	title: string;
	body: ReactElement;
}

const GenericModal = (params: ConfirmationModalParams) => {
	const ctxModal = useContext(ModalContext);

	const classNames = ['am-modal', ctxModal.visible && ctxModal.type === params.type ? 'am-visible' : null];
	const classModal = classNames.join(' ');

	return (
		<div className={classModal}>

			<div className='am-wrapper'>
				<img className='close-icon' alt='Close the Modal' src='close-icon.png' onClick={ctxModal.closeModal} />

				<div className='am-title'>
					<h2>{params.title}</h2>
				</div>

				<div className='am-body'>
					{params.body}
				</div>
			</div>
		</div>
	);
};

export default GenericModal;