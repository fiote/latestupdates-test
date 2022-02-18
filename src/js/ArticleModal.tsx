import * as React from "react";
import DefArticle from "./defs/DefArticle";

import { FormEvent, useEffect } from "react";
import GenericModal from "./GenericModal";

interface ArticleModalParams {
	visible: boolean;
	entry: DefArticle,
	onClickClose: () => void;
	onSubmitData: (valueForm: DefArticle) => void;
}

interface StringObject {
	[key: string]: string;
}

const ArticleModal = (params: ArticleModalParams) => {
	const emptyErrors = {title: '', link: '', category: ''};
	const [valueForm, setForm] = React.useState(params.entry);
	const [valueClassInputs, setClassInputs] = React.useState<StringObject>(emptyErrors);

	useEffect(() => {
	  	setForm(params.entry);
		setClassInputs(emptyErrors);
	}, [params.entry]);

	const onInputChange = (ev: FormEvent<HTMLInputElement | HTMLSelectElement>) => {
		const key = ev.currentTarget.name;
		const value = (ev.currentTarget.value || '').trim();
		if (value) setClassInputs({...valueClassInputs, [key]: ''});
		setForm({...valueForm, [key]: value});
	};

	const fileInputRef = React.createRef<HTMLInputElement>();

	const onImageClick = () => {
		fileInputRef.current?.click();
	};

	const onImageChange = () => {
		const files = fileInputRef.current?.files;
		if (!files) return;

    	var FR= new FileReader();
		FR.addEventListener("load", function(e) {
			const image = e?.target?.result?.toString();
			if (image) setForm({...valueForm, image});
		});
		FR.readAsDataURL(files[0]);
	};

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

		setClassInputs({...valueClassInputs});
		if (error) return;

		const input = fileInputRef.current;
		if (input) input.value = '';

		params.onSubmitData(valueForm);
	};

	const onClickClose = () => {
		const input = fileInputRef.current;
		if (input) input.value = '';
		params.onClickClose();
	}

	const classNames = ['am-modal', params.visible ? 'am-visible' : null];
	const classModal = classNames.join(' ');

	const prefix = params.entry.id ? "Edit" : "Add";
	const sufix = params.entry.id ? "# "+params.entry.id : "";

	const verbImage = valueForm.image ? 'Edit' : 'Add An';

	const title = `${prefix} Article ${sufix}`;

	const body = (
		<form className="wpcf7-form init" onSubmit={onFormSubmit}>
			<div className='image' onClick={() => onImageClick()} style={{'backgroundImage': 'url('+valueForm.image+')'}}>
				<div>Click to {verbImage} Image</div>
				<input type='file' ref={fileInputRef} onChange={() => onImageChange()} />
			</div>

			<div className='row10-2'>
				<p className={valueClassInputs.title}>
					<label>Title*<br/>
						<span className="wpcf7-form-control-wrap your-name">
							<input type="text" name="title" value={valueForm.title} onChange={onInputChange} className="wpcf7-form-control wpcf7-text" placeholder="Start typing here" />
						</span>
					</label>
				</p>
				<p className={valueClassInputs.category}>
					<label>Category*<br/>
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
			<p className={valueClassInputs.link}>
				<label>Link*<br/>
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

	return <GenericModal visible={params.visible} title={title} body={body} onClickClose={onClickClose} />;
};

export default ArticleModal;