import Products from "./product-schema";
import { Request, Response } from "express";
import { v4 as uuidv4 } from 'uuid';

interface productInterface {
  _id: String,
  productName: String,
  productCode: String,
  productDescription: String,
  productRating?: Number
}

const operationResponse = (status: Boolean, code: Number, msg: String, dbResponse: String) => {
  return {
    success: status,
    statusCode: code,
    message: msg,
    data: {
      db_response: dbResponse
    }
  }
}

const getList = async (req: Request, res: Response) => {
  console.log("here")
  Products.find((err: any, result: any) => {
    if (err) {
      res.send("Error!");
    } else {
      console.log(JSON.stringify(result))
      res.send(result);
    }
  });
}

const getOne = async (req: Request, res: Response) => {
  const _id: String = req.params._id;
  console.log("_id: ", _id);
  Products.findById(_id, (err: any, result: any) => {
    if (err) {
      res.json({ msg: `err finding data with id ${_id}` })
    } else {
      if (result != null) {
        res.json(result)
      } else {
        res.json({ msg: `product not found with id ${req.params}` })
      }
    }
  })
}

const create = async (req: Request, res: Response) => {
  const insertJSON: productInterface = {
    _id: uuidv4(),
    productName: req.body.productName,
    productCode: req.body.productCode,
    productDescription: req.body.productDescription,
    productRating: req.body.productRating
  };
  console.log("data: ", insertJSON);
  Products.create(insertJSON, (err: any, result: any) => {
    if (err) {
      console.log(err.message, "err message");
      const failureResponse = operationResponse(false, 404, "Unable to create product", err.message);
      res.json(failureResponse)
    } else {
      // console.log(result,"here39");
      const successResponse = operationResponse(true, 200, "New product created successfully", result._id);
      res.json(successResponse)
    }
  })
}

const update = async (req: Request, res: Response) => {
  const insertJSON: JSON = req.body;
  const _id: String = req.params._id;
  console.log("data: ", insertJSON);
  Products.findOneAndUpdate(_id, insertJSON, {}, (err: any, result: any) => {
    if (err) {
      console.log(err.message, "err message");
      const failureResponse = operationResponse(false, 404, "Unable to update product", err.message);
      res.json(failureResponse);
    } else {
      // console.log(result, "83");
      const successResponse = operationResponse(true, 200, `Product successfully updated with _id ${_id}`, JSON.stringify(result));
      res.json(successResponse);
    }
  })
}

const remove = async (req: Request, res: Response) => {
  const _id: String = req.params._id;
  console.log("_id", _id);
  Products.findByIdAndRemove(_id, {}, (err: any, result: any) => {
    if (err) {
      console.log(err.message, "error message");
      const failureResponse = operationResponse(false, 404, `Unable to delete prodcut with _id ${_id}`, err.message);
      res.json(failureResponse);
    } else {
      console.log(result, "97");
      const successResponse = operationResponse(true, 200, `Product successfully deleted with _id ${_id}`, JSON.stringify(result));
      res.json(successResponse);
    }
  })
}
export { getList, getOne, create, update, remove }