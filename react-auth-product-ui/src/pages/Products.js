import React, { useEffect, useState } from 'react';
import { useAuth } from "../auth/useAuth";
export const Products = () => {
    const [products, setProducts] = useState([]);
    const { token, setToken, user } = useAuth();
    const [error, setError] = useState("")
    useEffect(() => {
        try {
            fetch("http://localhost:3002/products", {
                headers: {
                    "Authorization": `Bearer ${token}`
                }
            })
                .then(res => {
                    if (res.status === 200) {
                        return res.json();
                    }
                    if (res.status === 401) {
                        setToken("");
                        throw new Error(res.status);
                    }
                })

                .then(data => setProducts(data))
                .catch(err => { console.log(err); setError(err.message); });
        } catch (err) {
            console.log(err); setError(err.message);
        }
    }, [])

    return (
        <div>
            <h2>Products {user?.email} </h2>
            <div>{error}</div>
            {products && products.map(product => {
                return (
                    <div key={product.id} style={{ border: "1px solid black", margin: "1rem" }}>
                        <h4>{product.name}</h4>
                        <div>category: {product.category}</div>
                        <div>Rs.{product.price}</div>
                    </ div>
                )
            })}
        </div>
    )
}