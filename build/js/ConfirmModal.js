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
const Articles_1 = __importDefault(require("../ctxs/Articles"));
const Modal_1 = __importStar(require("../ctxs/Modal"));
const GenericModal_1 = __importDefault(require("./GenericModal"));
const ConfirmModal = () => {
    const ctxModal = react_1.useContext(Modal_1.default);
    const ctxArt = react_1.useContext(Articles_1.default);
    const onClickConfirm = () => {
        ctxArt.removeArticle(ctxModal.entry);
        ctxModal.closeModal();
    };
    const title = "Delete Entry";
    const description = `Are you sure you want to delete [${ctxModal.entry.title}]?`;
    const body = (React.createElement("div", null,
        description,
        React.createElement("div", { className: 'am-actions' },
            React.createElement("div", { onClick: onClickConfirm, className: "btn btn-main btn-smaller btn-negative btn-delete-article" }, "Yes, Delete it"),
            React.createElement("div", { onClick: ctxModal.closeModal, className: "btn btn-main btn-smaller btn-neutral" }, "No, I changed my mind"))));
    return React.createElement(GenericModal_1.default, { type: Modal_1.ModalType.CONFIRM, title: title, body: body });
};
exports.default = ConfirmModal;
