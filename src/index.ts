import express, {Express, Request, Response, NextFunction} from "express";
import cors from 'cors';
import * as dotenv from 'dotenv';
import mongoose from 'mongoose';
import helmet from "helmet";
import * as ProductOperations from './product-crud-mongo';

dotenv.config();

if(!process.env.PORT){
  console.log(`Error to get ports`);
  process.exit(1);
}

const mongoUri: string = "mongodb://127.0.0.1:27017/test";

mongoose.connect(mongoUri, (err: any) => {
  if (err) {
    console.log(err.message);
    throw new Error('Unable to connect to DB')
  } else {
    console.log(`Connected to MONGO`);
  }
});

const app: Express = express();

app.use(helmet());
app.use(cors());
app.use(express.json());

const PORT: number = parseInt(process.env.PORT as string, 10)

app.listen(PORT | 8080, () => {
  console.log("listening on port 8080")
})

const Router = express.Router();
app.use("/product/api", Router);

app.use((req: Request, res: Response, next: NextFunction) => {
  res.setHeader(
    'Access-Control-Allow-Methods',
    'GET, POST, PUT, DELETE, OPTIONS'
  );
  res.header('Access-Control-Allow-Origin', '*');
  res.header(
    'Access-Control-Allow-Headers',
    'Origin, X-Requested-With, Content-Type, Accept, Authorization'
  );
  res.header('Access-Control-Allow-Credentials', "true");
  res.header('Cache-Control', 'private, no-cache, no-store, must-revalidate');

  next();
});


Router.get('/getProducts', ProductOperations.getList);
Router.get("/getProduct/:_id", ProductOperations.getOne);
Router.post("/createProduct", ProductOperations.create);
Router.put("/updateProduct/:_id", ProductOperations.update);
Router.delete("/deleteProduct/:_id", ProductOperations.remove);
//for package.json
// can use npm package concurrently for running two command simultaneously in npm script