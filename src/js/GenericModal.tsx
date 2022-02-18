import * as React from "react";
import { ReactElement } from "react";
import '../css/genericModal.css';

interface ConfirmationModalParams {
	visible: boolean;
	title: string;
	body: ReactElement;
	onClickClose: () => void;
}

const GenericModal = (params: ConfirmationModalParams) => {
	const classNames = ['am-modal', params.visible ? 'am-visible' : null];
	const classModal = classNames.join(' ');

	return (
		<div className={classModal}>

			<div className='am-wrapper'>
				<img className='close-icon' src="close-icon.png" onClick={params.onClickClose}/>

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