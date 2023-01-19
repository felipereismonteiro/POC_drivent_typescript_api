import express, { Request, Response } from "express";
import { deleteProductsController, getProductsController, postProductsController, sumAllProductsController, updateProductsController } from "./controllers/productsController.js";
import cors from "cors";

const app = express();
app.use(express.json());
app.use(cors());

app.get("/health", (req: Request, res: Response) => res.send("hi"));

app.post("/products", postProductsController);
app.get("/products", getProductsController);
app.put("/products/:id", updateProductsController);
app.delete("/products/:id", deleteProductsController);
app.get("/products/sumAll", sumAllProductsController);

app.listen(4000, () => {
  console.log(`Server running on port 4000`);
});
