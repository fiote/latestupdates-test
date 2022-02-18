"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const react_1 = require("react");
var ModalType;
(function (ModalType) {
    ModalType["FORM"] = "FORM";
    ModalType["CONFIRM"] = "CONFIRM";
})(ModalType = exports.ModalType || (exports.ModalType = {}));
const ModalContext = react_1.createContext({});
exports.ModalProvider = ModalContext.Provider;
exports.default = ModalContext;
