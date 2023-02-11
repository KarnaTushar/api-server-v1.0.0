import { Schema } from 'mongoose';
import mongoose from 'mongoose';
import { v4 as uuidv4 } from 'uuid';

export const Product = new Schema(
  {
    _id: {
      type: String,
      default: uuidv4()
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
  },
  {
    timestamps: true
  }
);

const products = mongoose.model("products", Product);
export default products;