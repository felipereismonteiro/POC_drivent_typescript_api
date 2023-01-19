import { connectionDB } from "../database/db.js";
import { QueryResult } from "pg";
import { product } from "../protocols/product.js";

function getProducts(): Promise<QueryResult<product>> {
    return connectionDB.query("SELECT * FROM products");
}

function postProducts({ name, price }: product): Promise<QueryResult<any>> {
    return connectionDB.query("INSERT INTO products(name, price) VALUES($1, $2)", [name, price]);
}

function deleteProducts(id: number): Promise<QueryResult<any>> {
    return connectionDB.query("DELETE FROM products WHERE id=$1", [id]);
}

function searchProductsById(id: number): Promise<QueryResult<product>> {
    return connectionDB.query("SELECT * FROM products WHERE id=$1", [id]);
}

function updateProductsById(id: number, { name, price }: product): Promise<QueryResult<product>> {
    return connectionDB.query("UPDATE products SET name=$1, price=$2 WHERE id=$3", [name, price, id]);
}

export {
    getProducts,
    postProducts,
    deleteProducts,
    searchProductsById,
    updateProductsById
}