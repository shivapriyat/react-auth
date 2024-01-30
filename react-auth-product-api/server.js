import express from "express";
import cors from "cors";
import jwt from "jsonwebtoken";
const app = express();
app.use(cors());
app.use(express.json());

app.get("/", (req, res) => {
    res.status(200).send({ "msg": "welcome to product api" });
})

app.listen(3002, () => {
    console.log("server listening at PORT 3002")
});

const JWT_SECRET = "THESECRETKEYDECIDEDBYME";

app.use((req, res, next) => {
    const { authorization } = req.headers;
    if (!authorization) {
        res.status(401).send();
    }
    const token = authorization.split(" ")[1];
    console.log("middleware:: " + token);
    jwt.verify(token, JWT_SECRET, (err, decoded) => {
        if (err) {
            res.status(401).send(err);
        } else {
            console.log("decoded value"+ decoded);
            next();
        }
    })
})

const allProducts = [{
    id: "1",
    name: "Television",
    category: "Electronics",
    price: 23000,
},
{
    id: "2",
    name: "Recliner",
    category: "Furniture",
    price: 12000,
},
{
    id: "3",
    name: "Mixer",
    category: "Electrical",
    price: 3000
},
{
    id: "4",
    name: "Laptop",
    category: "Electronics",
    price: 45000,
}]
app.get("/products", (req, res) => {
    res.status(200).send(allProducts);
})

