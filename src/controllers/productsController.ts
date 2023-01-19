import { Request, Response } from "express";
import { deleteProducts, getProducts, postProducts, searchProductsById, updateProductsById } from "../services/products.js";
import { product } from "../protocols/product.js";
import { productSchema } from "../schemas/productSchema.js";

export async function getProductsController(req: Request, res: Response) {
    try {
        const { rows } = await getProducts();

        res.send(rows);
    } catch (err) {
        res.send(err.message)
    }
}

export async function postProductsController(req: Request, res: Response) {
    try {
        const productBody: product = req.body;

        const { error } = productSchema.validate(productBody);

        if (error) {
            return res.sendStatus(401);
        }

        await postProducts(productBody);

        res.status(200).send("product inserted!");
    } catch (err) {
        res.send(err.message)
    }
}

export async function deleteProductsController(req: Request, res: Response) {
    try {
        const id: number = Number(req.params.id)

        const { rows } = await searchProductsById(Number(id));

        if (rows.length === 0) {
            return res.sendStatus(404);
        }

        await deleteProducts(id)

        res.status(202).send("deleted!");
    } catch (err) {
        res.send(err.message)
    }
}

export async function updateProductsController(req: Request, res: Response) {
    try {
        const id: number = Number(req.params.id)
        const body: product = req.body;

        await productSchema.validateAsync(body);

        const { rows } = await searchProductsById(Number(id));

        if (rows.length === 0) {
            return res.sendStatus(404);
        }

        await updateProductsById(id, body)

        res.sendStatus(200);
    } catch (err) {
        res.status(400).send(err.details.map((d) => d.message));
    }
}

export async function sumAllProductsController(req: Request, res: Response) {
    try {
        const { rows } = await getProducts();

        const summed: number =rows.reduce((a, c) => a + c.price, 0)

        res.send(`The sum of the all products is ${summed}`);
    } catch (err) {
        res.send(err.message);
    }
}