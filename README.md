### GET /products
will receive all products.

---

### GET /products/sumAll
will receive the sum of all products.

---

### POST /products
send via body an object:
{
    name: string, price:number
}

---

### PUT /products/:id
send via params id of the product <br>
send via body an object:
{
    name: string, price:number
}

---

### DELETE /products/:id
send via params id of the product in order to delete him.

---

