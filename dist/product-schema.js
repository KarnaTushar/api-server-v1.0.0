"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Product = void 0;
const mongoose_1 = require("mongoose");
const mongoose_2 = __importDefault(require("mongoose"));
const uuid_1 = require("uuid");
exports.Product = new mongoose_1.Schema({
    _id: {
        type: String,
        default: (0, uuid_1.v4)()
    },
    productName: {
        type: String,
        default: ''
    },
    productCode: {
        type: String,
        default: ''
    },
    productDescription: {
        type: String,
        default: ''
    },
    productRating: {
        type: Number,
        default: 3
    },
}, {
    timestamps: true
});
const products = mongoose_2.default.model("products", exports.Product);
exports.default = products;
