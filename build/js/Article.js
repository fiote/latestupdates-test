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
const Modal_1 = __importDefault(require("../ctxs/Modal"));
const Article = (params) => {
    const { art } = params;
    const ctxModal = react_1.useContext(Modal_1.default);
    const onClickEdit = () => ctxModal.openForm(art);
    const onClickDelete = () => ctxModal.openDelete(art);
    return (React.createElement("div", { className: "col-md-6 col-lg-4 item", key: params.art.id },
        React.createElement("div", { className: "blog-post", "data-link": params.art.link, "data-target": "_self" },
            React.createElement("div", { className: "post-image illustration", style: { "backgroundImage": 'url(' + params.art.image + ')' } },
                React.createElement("div", { onClick: onClickEdit, className: "btn btn-main btn-smaller btn-positive btn-edit-article" }, "Edit"),
                React.createElement("div", { onClick: onClickDelete, className: "btn btn-main btn-smaller btn-negative btn-delete-article" }, "Delete")),
            React.createElement("div", { className: "content" },
                React.createElement("div", { className: "post-categories" },
                    React.createElement("a", { href: params.art.link, className: "post-category", target: "_self", rel: "noreferrer" }, params.art.category)),
                React.createElement("h2", null, params.art.title),
                React.createElement("a", { href: params.art.link, className: "moretag", target: "_self", rel: "noreferrer" }, "Continue reading...")))));
};
exports.default = Article;
