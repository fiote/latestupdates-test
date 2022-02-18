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
require("../css/app.css");
const ArticleList_1 = __importDefault(require("./ArticleList"));
const FormModal_1 = __importDefault(require("./FormModal"));
const ConfirmModal_1 = __importDefault(require("./ConfirmModal"));
const Articles_1 = __importStar(require("../ctxs/Articles"));
const Modal_1 = __importStar(require("../ctxs/Modal"));
function App() {
    let baseArticles = [
        {
            id: 1,
            title: 'Why cloud computing is the best option for hospitals adopting AI',
            category: 'ARTICLE',
            image: 'https://i0.wp.com/www.aidence.com/wp-content/uploads/2022/02/House.png?fit=300,262',
            link: 'https://www.aidence.com/articles/cloud-best-option-imaging-ai/'
        },
        {
            id: 2,
            title: 'Artificial Intelligence in Practice 2022',
            category: 'EVENT',
            image: 'https://i0.wp.com/www.aidence.com/wp-content/uploads/2020/09/00109940_cw_image_wi_9f3af12068c3548d7527bd4b316ad317.jpg.pagespeed.ce_.fDsapWt6GJ__1_-removebg-preview.png?fit=300,300',
            link: 'https://www.mybir.org.uk/CPBase__event_detail?id=a173Y00000GALT7QAP&site=a0N2000000COvFsEAL'
        },
        {
            id: 3,
            title: 'Aidence is acquired by RadNet, accelerating its efforts in AI  for lung cancer care',
            category: 'NEWS',
            image: 'https://i0.wp.com/www.aidence.com/wp-content/uploads/2019/12/Partnership.png?fit=233,300',
            link: 'https://www.aidence.com/news/aidence-acquired-by-radnet/'
        }
    ];
    const storedData = localStorage.getItem('storedArticles');
    if (storedData)
        baseArticles = JSON.parse(storedData);
    const [valueArticles, setArticles] = React.useState(baseArticles);
    // ===== CONTEXT (ARTICLES) =====================================
    const ctxArt = react_1.useContext(Articles_1.default);
    ctxArt.template = { id: 0, title: '', category: '', image: '', link: '' };
    ctxArt.data = valueArticles;
    ctxArt.saveData = (list) => {
        setArticles(list);
        localStorage.setItem('storedArticles', JSON.stringify(list));
    };
    ctxArt.insertArticle = (art) => {
        const nextId = Math.max(...valueArticles.map(art => art.id)) + 1;
        art.id = nextId;
        const newArticles = [...valueArticles, art];
        ctxArt.saveData(newArticles);
    };
    ctxArt.updateArticle = (art) => {
        if (!art.id)
            return ctxArt.insertArticle(art);
        const newArticles = valueArticles.map(x => x.id == art.id ? art : x);
        ctxArt.saveData(newArticles);
    };
    ctxArt.removeArticle = (art) => {
        const newArticles = valueArticles.filter(x => x.id != art.id);
        ctxArt.saveData(newArticles);
    };
    // ===== CONTEXT (MODAL) ========================================
    const [valueModalVisible, setModalVisible] = React.useState(false);
    const [valueModalType, setModalType] = React.useState();
    const [valueModalEntry, setModalEntry] = React.useState(ctxArt.template);
    const ctxModal = react_1.useContext(Modal_1.default);
    ctxModal.visible = valueModalVisible;
    ctxModal.entry = valueModalEntry;
    ctxModal.type = valueModalType;
    ctxModal.openForm = (art) => {
        setModalEntry(art);
        setModalType(Modal_1.ModalType.FORM);
        setModalVisible(true);
    };
    ctxModal.openDelete = (art) => {
        setModalEntry(art);
        setModalType(Modal_1.ModalType.CONFIRM);
        setModalVisible(true);
    };
    ctxModal.closeModal = () => {
        setModalEntry(ctxArt.template);
        setModalVisible(false);
    };
    // ===== RENDER =================================================
    return (React.createElement("div", { className: "app home" },
        React.createElement(Articles_1.ArticlesProvider, { value: ctxArt }),
        React.createElement(Modal_1.ModalProvider, { value: ctxModal }),
        React.createElement(ArticleList_1.default, null),
        React.createElement(FormModal_1.default, null),
        React.createElement(ConfirmModal_1.default, null)));
}
exports.default = App;
