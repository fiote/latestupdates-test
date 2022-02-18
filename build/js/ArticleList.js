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
require("../css/articles.css");
const Article_1 = __importDefault(require("./Article"));
const Articles_1 = __importDefault(require("../ctxs/Articles"));
const Modal_1 = __importDefault(require("../ctxs/Modal"));
const ArticleList = () => {
    const ctxArt = react_1.useContext(Articles_1.default);
    const ctxModal = react_1.useContext(Modal_1.default);
    const onClickAdd = () => ctxModal.openForm(ctxArt.template);
    const articles = ctxArt.data.map((art) => React.createElement(Article_1.default, { key: art.id, art: art }));
    return (React.createElement("div", { className: "container latest-updates" },
        React.createElement("h2", null,
            "Latest",
            React.createElement("br", null),
            React.createElement("em", null, "updates")),
        React.createElement("div", { className: "row items" },
            articles,
            React.createElement("div", { className: "col-md-6 col-lg-4 item item-empty", onClick: onClickAdd },
                React.createElement("div", { className: "blog-post" },
                    React.createElement("div", { className: "btn btn-main btn-smaller btn-positive btn-add-article" }, "Add New"))))));
};
exports.default = ArticleList;
