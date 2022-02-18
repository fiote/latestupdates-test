import * as React from "react";
import GenericModal from "./GenericModal";

interface ConfirmationModalParams {
	visible: boolean;
	title: string;
	description: string;
	onClickConfirm: () => void;
	onClickCancel: () => void;
}

const ConfirmationModal = (params: ConfirmationModalParams) => {
	const classNames = ['am-modal', params.visible ? 'am-visible' : null];
	const classModal = classNames.join(' ');

	const body = (
		<div>
			{params.description}
			<div className='am-actions'>
				<div onClick={params.onClickConfirm} className="btn btn-main btn-smaller btn-negative btn-delete-article">Yes, Delete it</div>
				<div onClick={params.onClickCancel} className="btn btn-main btn-smaller btn-neutral">No, I changed my mind</div>
			</div>
		</div>
	)

	return <GenericModal visible={params.visible} title={params.title} body={body} onClickClose={params.onClickCancel} />;
};

export default ConfirmationModal;