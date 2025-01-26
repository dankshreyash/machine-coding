// src/components/ProductList.js
import { useState, useEffect } from 'react';
import axios from 'axios';
import { BASE_URL } from './config';
const ProductList = () => {
    const [products, setProducts] = useState([]);
    const [page, setPage] = useState(1);
    const pageSize = 10;

    const fetchProducts = async () => {
        const response = await axios.get(`${BASE_URL}/products?page=${page}&pageSize=${pageSize}`);
        setProducts(response.data);
    };

    useEffect(() => {
        fetchProducts();
    }, [page]);

    return (
        <div>
            <h2>Product List</h2>
            <table>
                <thead>
                    <tr>
                        <th>ProductId</th>
                        <th>ProductName</th>
                        <th>CategoryName</th>
                        <th>CategoryId</th>
                    </tr>
                </thead>
                <tbody>
                    {products.map((product) => (
                        <tr key={product.ProductId}>
                            <td>{product.ProductId}</td>
                            <td>{product.ProductName}</td>
                            <td>{product.CategoryName}</td>
                            <td>{product.CategoryId}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
            <button onClick={() => setPage(page - 1)} disabled={page === 1}>
                Previous
            </button>
            <button onClick={() => setPage(page + 1)}>Next</button>
        </div>
    );
};

export default ProductList;
