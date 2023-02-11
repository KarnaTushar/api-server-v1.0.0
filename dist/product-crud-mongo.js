"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.remove = exports.update = exports.create = exports.getOne = exports.getList = void 0;
const product_schema_1 = __importDefault(require("./product-schema"));
const uuid_1 = require("uuid");
const operationResponse = (status, code, msg, dbResponse) => {
    return {
        success: status,
        statusCode: code,
        message: msg,
        data: {
            db_response: dbResponse
        }
    };
};
const getList = async (req, res) => {
    console.log("here");
    product_schema_1.default.find((err, result) => {
        if (err) {
            res.send("Error!");
        }
        else {
            console.log(JSON.stringify(result));
            res.send(result);
        }
    });
};
exports.getList = getList;
const getOne = async (req, res) => {
    const _id = req.params._id;
    console.log("_id: ", _id);
    product_schema_1.default.findById(_id, (err, result) => {
        if (err) {
            res.json({ msg: `err finding data with id ${_id}` });
        }
        else {
            if (result != null) {
                res.json(result);
            }
            else {
                res.json({ msg: `product not found with id ${req.params}` });
            }
        }
    });
};
exports.getOne = getOne;
const create = async (req, res) => {
    const insertJSON = {
        _id: (0, uuid_1.v4)(),
        productName: req.body.productName,
        productCode: req.body.productCode,
        productDescription: req.body.productDescription,
        productRating: req.body.productRating
    };
    console.log("data: ", insertJSON);
    product_schema_1.default.create(insertJSON, (err, result) => {
        if (err) {
            console.log(err.message, "err message");
            const failureResponse = operationResponse(false, 404, "Unable to create product", err.message);
            res.json(failureResponse);
        }
        else {
            // console.log(result,"here39");
            const successResponse = operationResponse(true, 200, "New product created successfully", result._id);
            res.json(successResponse);
        }
    });
};
exports.create = create;
const update = async (req, res) => {
    const insertJSON = req.body;
    const _id = req.params._id;
    console.log("data: ", insertJSON);
    product_schema_1.default.findOneAndUpdate(_id, insertJSON, {}, (err, result) => {
        if (err) {
            console.log(err.message, "err message");
            const failureResponse = operationResponse(false, 404, "Unable to update product", err.message);
            res.json(failureResponse);
        }
        else {
            // console.log(result, "83");
            const successResponse = operationResponse(true, 200, `Product successfully updated with _id ${_id}`, JSON.stringify(result));
            res.json(successResponse);
        }
    });
};
exports.update = update;
const remove = async (req, res) => {
    const _id = req.params._id;
    console.log("_id", _id);
    product_schema_1.default.findByIdAndRemove(_id, {}, (err, result) => {
        if (err) {
            console.log(err.message, "error message");
            const failureResponse = operationResponse(false, 404, `Unable to delete prodcut with _id ${_id}`, err.message);
            res.json(failureResponse);
        }
        else {
            console.log(result, "97");
            const successResponse = operationResponse(true, 200, `Product successfully deleted with _id ${_id}`, JSON.stringify(result));
            res.json(successResponse);
        }
    });
};
exports.remove = remove;
