import * as React from "react";

import { RootState } from "../../app/store";
import { useDispatch, useSelector } from 'react-redux';
import { insertEntry, updateEntry } from '../articles/articlesSlice';
import { closeModal, setValue, setClass, ModalType, ModalState } from "./modalSlice";

import { FormEvent } from "react";
import GenericModal from "./GenericModal";

const FormModal = () => {
	const { entry, fieldclass } = useSelector<RootState>((state) => state.modal) as ModalState;
  	const dispatch = useDispatch();

	// ==== EVENTS ==================================================

	const onFormSubmit = (ev: FormEvent<HTMLFormElement>) => {
		ev.preventDefault();
		ev.stopPropagation();

		const keys = Object.keys(fieldclass);
		let error = false;

		keys.forEach(key => {
			const value = entry ? entry[key] : '';
			const fclass = (value || '').trim() ? '' : 'empty';
			if (fclass) error = true;
			dispatch(setClass({key, fclass}));
		});

		if (error) return;

		const trigger = entry?.id ? updateEntry(entry) : insertEntry(entry);
		dispatch(trigger);
		dispatch(closeModal(null));
	};

	const onInputChange = (ev: FormEvent<HTMLInputElement | HTMLSelectElement>) => {
		const key = ev.currentTarget.name;
		const value = ev.currentTarget.value || '';
		dispatch(setValue({key,value}));
	};

	// ==== FILE PREVIEW ============================================

	const fileInputRef = React.createRef<HTMLInputElement>();

	const onImageClick = () => {
		const input = fileInputRef.current;
		if (!input) return;
		input.value = '';
		input.click();
	};

	const onImageChange = () => {
		const files = fileInputRef.current?.files;
		if (!files) return;

		var FR = new FileReader();

		FR.addEventListener("load", function (e) {
			const value = e?.target?.result?.toString();
			if (value) dispatch(setValue({key: 'image', value}));
		});
		FR.readAsDataURL(files[0]);
	};

	// ==== TITLE ==================================================

	const prefix = entry?.id ? "Edit" : "Add";
	const sufix = entry?.id ? "# " + entry?.id : "";
	const title = `${prefix} Article ${sufix}`;

	// ==== BODY ====================================================


	const body = (
		<form className="wpcf7-form init" onSubmit={onFormSubmit}>
			<div className='image' onClick={() => onImageClick()} style={{ 'backgroundImage': 'url(' + entry?.image + ')' }}>
				<div>Click to {entry?.image ? 'Edit' : 'Add An'} Image</div>
				<input type='file' ref={fileInputRef} onChange={() => onImageChange()} />
			</div>

			<div className='row'>
				<div className='col-md-12 col-lg-8'>
					<p data-testid="title-p" className={fieldclass?.title}>
						<label>Title*<br />
							<span className="wpcf7-form-control-wrap your-name">
								<input data-testid="title-input" type="text" name="title" value={entry?.title || ''} onChange={onInputChange} className="wpcf7-form-control wpcf7-text" placeholder="Start typing here" />
							</span>
						</label>
					</p>
				</div>
				<div className='col-md-12 col-lg-4'>
					<p data-testid="category-p" className={fieldclass?.category}>
						<label>Category*<br />
							<span className="wpcf7-form-control-wrap">
								<select data-testid="category-input" name="category" value={entry?.category || ''} onChange={onInputChange}>
									<option value=''>...</option>
									<option value='NEWS'>NEWS</option>
									<option value='EVENTS'>EVENTS</option>
									<option value='ARTICLE'>ARTICLE</option>
								</select>
							</span>
						</label>
					</p>
				</div>
			</div>

			<p data-testid="link-p" className={fieldclass?.link}>
				<label>Link*<br />
					<span className="wpcf7-form-control-wrap your-email">
						<input data-testid="link-input" type="text" name="link" value={entry?.link || ''} onChange={onInputChange} className="wpcf7-form-control" aria-required="true" aria-invalid="false" placeholder="Start typing here" />
					</span>
				</label>
			</p>

			<button type="submit" className="wpcf7-form-control has-spinner wpcf7-submit btn btn-main">
				Submit Data
			</button>
		</form>
	);

	// ==== RENDER ==================================================

	return <GenericModal type={ModalType.FORM} title={title} body={body} />;

};

export default FormModal;

