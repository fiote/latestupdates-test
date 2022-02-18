import * as React from "react";

import { FormEvent, useContext, useEffect, useMemo } from "react";
import GenericModal from "./GenericModal";
import ModalContext, { ModalType } from "../ctxs/Modal";
import ArticlesContext from "../ctxs/Articles";

interface StringObject {
	[key: string]: string;
}

const FormModal = () => {
	const emptyErrors : StringObject = { title: '', link: '', category: '' };
	const ctxModal = useContext(ModalContext);
	const ctxArt = useContext(ArticlesContext);

	const [valueForm, setForm] = React.useState(ctxModal.entry);
	const [valueClassInputs, setClassInputs] = React.useState<StringObject>(emptyErrors);

	useEffect(() => {
		setForm(ctxModal.entry);
	}, [ctxModal.entry]);

	useMemo(() => {
		setClassInputs(emptyErrors);
	},[]);

	// ==== INPUT CHANGE ============================================

	const onInputChange = (ev: FormEvent<HTMLInputElement | HTMLSelectElement>) => {
		const key = ev.currentTarget.name;
		const value = ev.currentTarget.value || '';
		if (value.trim()) setClassInputs({ ...valueClassInputs, [key]: '' });
		setForm({ ...valueForm, [key]: value });
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
			const image = e?.target?.result?.toString();
			if (image) setForm({ ...valueForm, image });
		});
		FR.readAsDataURL(files[0]);
	};

	// ==== SUBMIT ==================================================

	const onFormSubmit = (ev: FormEvent<HTMLFormElement>) => {
		ev.preventDefault();
		ev.stopPropagation();

		let error = false;

		Object.keys(valueClassInputs).forEach(key => {
			const value = (valueForm[key] || '').trim();
			const cvalue = value.length ? '' : 'empty';
			valueClassInputs[key] = cvalue;
			if (cvalue) error = true;
		});

		setClassInputs({ ...valueClassInputs });
		if (error) return;

		ctxArt.updateArticle(valueForm);
		ctxModal.closeModal();
	};

	// ==== TITLE ==================================================

	const prefix = ctxModal.entry.id ? "Edit" : "Add";
	const sufix = ctxModal.entry.id ? "# " + ctxModal.entry.id : "";

	const title = `${prefix} Article ${sufix}`;

	// ==== BODY ====================================================

	const verbImage = valueForm.image ? 'Edit' : 'Add An';

	const body = (
		<form className="wpcf7-form init" onSubmit={onFormSubmit}>
			<div className='image' onClick={() => onImageClick()} style={{ 'backgroundImage': 'url(' + valueForm.image + ')' }}>
				<div>Click to {verbImage} Image</div>
				<input type='file' ref={fileInputRef} onChange={() => onImageChange()} />
			</div>

			<div className='row'>
				<div className='col-md-12 col-lg-8'>
					<p className={valueClassInputs.title}>
						<label>Title*<br />
							<span className="wpcf7-form-control-wrap your-name">
								<input type="text" name="title" value={valueForm.title} onChange={onInputChange} className="wpcf7-form-control wpcf7-text" placeholder="Start typing here" />
							</span>
						</label>
					</p>
				</div>
				<div className='col-md-12 col-lg-4'>
					<p className={valueClassInputs.category}>
						<label>Category*<br />
							<span className="wpcf7-form-control-wrap">
								<select name="category" value={valueForm?.category} onChange={onInputChange}>
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

			<p className={valueClassInputs.link}>
				<label>Link*<br />
					<span className="wpcf7-form-control-wrap your-email">
						<input type="text" name="link" value={valueForm?.link} onChange={onInputChange} className="wpcf7-form-control" aria-required="true" aria-invalid="false" placeholder="Start typing here" />
					</span>
				</label>
			</p>

			<button type="submit" className="wpcf7-form-control has-spinner wpcf7-submit btn btn-main">
				Submit Data
			</button>
		</form>
	);

	return <GenericModal type={ModalType.FORM} title={title} body={body} />;
};

export default FormModal;

