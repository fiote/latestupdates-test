import * as React from "react";
import { ReactElement } from "react";
import './modal.css';

import { useSelector } from 'react-redux';
import { RootState } from '../../app/store';
import { useDispatch } from 'react-redux';
import { closeModal, ModalState, ModalType } from './modalSlice';

interface ConfirmationModalParams {
	type: ModalType;
	title: string;
	body: ReactElement;
}

const GenericModal = (params: ConfirmationModalParams) => {
	const modal = useSelector<RootState>((state) => state.modal) as ModalState;
	const dispatch = useDispatch();

	const onClickClose = () => {
		dispatch(closeModal(null));
	};

	const classNames = ['am-modal', modal.visible && modal.type === params.type ? 'am-visible' : null];
	const testId = "modal-"+params.type;

	return (
		<div data-testid={testId} className={classNames.join(' ')}>

			<div className='am-wrapper'>
				<img data-testid="close-icon-modal" className='close-icon' alt='Close the Modal' src='close-icon.png' onClick={onClickClose} />

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