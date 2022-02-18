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
require("../css/modal.css");
const Modal_1 = __importDefault(require("../ctxs/Modal"));
const GenericModal = (params) => {
    const ctxModal = react_1.useContext(Modal_1.default);
    const classNames = ['am-modal', ctxModal.visible && ctxModal.type === params.type ? 'am-visible' : null];
    const classModal = classNames.join(' ');
    return (React.createElement("div", { className: classModal },
        React.createElement("div", { className: 'am-wrapper' },
            React.createElement("img", { className: 'close-icon', alt: 'Close the Modal', src: 'close-icon.png', onClick: ctxModal.closeModal }),
            React.createElement("div", { className: 'am-title' },
                React.createElement("h2", null, params.title)),
            React.createElement("div", { className: 'am-body' }, params.body))));
};
exports.default = GenericModal;
