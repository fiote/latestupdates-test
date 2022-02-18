"use strict";
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (Object.hasOwnProperty.call(mod, k)) result[k] = mod[k];
    result["default"] = mod;
    return result;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const React = __importStar(require("react"));
const react_1 = require("react");
const GenericModal_1 = __importDefault(require("./GenericModal"));
const Modal_1 = __importStar(require("../ctxs/Modal"));
const Articles_1 = __importDefault(require("../ctxs/Articles"));
const FormModal = () => {
    const emptyErrors = { title: '', link: '', category: '' };
    const ctxModal = react_1.useContext(Modal_1.default);
    const ctxArt = react_1.useContext(Articles_1.default);
    const [valueForm, setForm] = React.useState(ctxModal.entry);
    const [valueClassInputs, setClassInputs] = React.useState(emptyErrors);
    react_1.useEffect(() => {
        setForm(ctxModal.entry);
    }, [ctxModal.entry]);
    react_1.useMemo(() => {
        setClassInputs(emptyErrors);
    }, []);
    // ==== INPUT CHANGE ============================================
    const onInputChange = (ev) => {
        const key = ev.currentTarget.name;
        const value = ev.currentTarget.value || '';
        if (value.trim())
            setClassInputs(Object.assign(Object.assign({}, valueClassInputs), { [key]: '' }));
        setForm(Object.assign(Object.assign({}, valueForm), { [key]: value }));
    };
    // ==== FILE PREVIEW ============================================
    const fileInputRef = React.createRef();
    const onImageClick = () => {
        const input = fileInputRef.current;
        if (!input)
            return;
        input.value = '';
        input.click();
    };
    const onImageChange = () => {
        var _a;
        const files = (_a = fileInputRef.current) === null || _a === void 0 ? void 0 : _a.files;
        if (!files)
            return;
        var FR = new FileReader();
        FR.addEventListener("load", function (e) {
            var _a, _b;
            const image = (_b = (_a = e === null || e === void 0 ? void 0 : e.target) === null || _a === void 0 ? void 0 : _a.result) === null || _b === void 0 ? void 0 : _b.toString();
            if (image)
                setForm(Object.assign(Object.assign({}, valueForm), { image }));
        });
        FR.readAsDataURL(files[0]);
    };
    // ==== SUBMIT ==================================================
    const onFormSubmit = (ev) => {
        ev.preventDefault();
        ev.stopPropagation();
        let error = false;
        Object.keys(valueClassInputs).forEach(key => {
            const value = (valueForm[key] || '').trim();
            const cvalue = value.length ? '' : 'empty';
            valueClassInputs[key] = cvalue;
            if (cvalue)
                error = true;
        });
        setClassInputs(Object.assign({}, valueClassInputs));
        if (error)
            return;
        ctxArt.updateArticle(valueForm);
        ctxModal.closeModal();
    };
    // ==== TITLE ==================================================
    const prefix = ctxModal.entry.id ? "Edit" : "Add";
    const sufix = ctxModal.entry.id ? "# " + ctxModal.entry.id : "";
    const title = `${prefix} Article ${sufix}`;
    // ==== BODY ====================================================
    const verbImage = valueForm.image ? 'Edit' : 'Add An';
    const body = (React.createElement("form", { className: "wpcf7-form init", onSubmit: onFormSubmit },
        React.createElement("div", { className: 'image', onClick: () => onImageClick(), style: { 'backgroundImage': 'url(' + valueForm.image + ')' } },
            React.createElement("div", null,
                "Click to ",
                verbImage,
                " Image"),
            React.createElement("input", { type: 'file', ref: fileInputRef, onChange: () => onImageChange() })),
        React.createElement("div", { className: 'row' },
            React.createElement("div", { className: 'col-md-12 col-lg-8' },
                React.createElement("p", { className: valueClassInputs.title },
                    React.createElement("label", null,
                        "Title*",
                        React.createElement("br", null),
                        React.createElement("span", { className: "wpcf7-form-control-wrap your-name" },
                            React.createElement("input", { type: "text", name: "title", value: valueForm.title, onChange: onInputChange, className: "wpcf7-form-control wpcf7-text", placeholder: "Start typing here" }))))),
            React.createElement("div", { className: 'col-md-12 col-lg-4' },
                React.createElement("p", { className: valueClassInputs.category },
                    React.createElement("label", null,
                        "Category*",
                        React.createElement("br", null),
                        React.createElement("span", { className: "wpcf7-form-control-wrap" },
                            React.createElement("select", { name: "category", value: valueForm === null || valueForm === void 0 ? void 0 : valueForm.category, onChange: onInputChange },
                                React.createElement("option", { value: '' }, "..."),
                                React.createElement("option", { value: 'NEWS' }, "NEWS"),
                                React.createElement("option", { value: 'EVENTS' }, "EVENTS"),
                                React.createElement("option", { value: 'ARTICLE' }, "ARTICLE"))))))),
        React.createElement("p", { className: valueClassInputs.link },
            React.createElement("label", null,
                "Link*",
                React.createElement("br", null),
                React.createElement("span", { className: "wpcf7-form-control-wrap your-email" },
                    React.createElement("input", { type: "text", name: "link", value: valueForm === null || valueForm === void 0 ? void 0 : valueForm.link, onChange: onInputChange, className: "wpcf7-form-control", "aria-required": "true", "aria-invalid": "false", placeholder: "Start typing here" })))),
        React.createElement("button", { type: "submit", className: "wpcf7-form-control has-spinner wpcf7-submit btn btn-main" }, "Submit Data")));
    return React.createElement(GenericModal_1.default, { type: Modal_1.ModalType.FORM, title: title, body: body });
};
exports.default = FormModal;
