// src/components/ProductMaster.js
import  { useState, useEffect } from 'react';
import axios from 'axios';
import { BASE_URL } from './config';

const ProductMaster = () => {
    const [products, setProducts] = useState([]);
    const [categories, setCategories] = useState([]);
    const [productName, setProductName] = useState('');
    const [categoryId, setCategoryId] = useState('');
    const [editId, setEditId] = useState(null);

    const fetchProducts = async () => {
        const response = await axios.get(`${BASE_URL}/products`);
        setProducts(response.data);
    };

    const fetchCategories = async () => {
        const response = await axios.get(`${BASE_URL}/categories`);
        setCategories(response.data);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (editId) {
            await axios.put(`${BASE_URL}/products/${editId}`, { ProductName: productName, CategoryId: categoryId });
        } else {
            await axios.post(`${BASE_URL}/products`, { ProductName: productName, CategoryId: categoryId });
        }
        setProductName('');
        setCategoryId('');
        setEditId(null);
        fetchProducts();
    };

    const handleEdit = (product) => {
        setProductName(product.ProductName);
        setCategoryId(product.CategoryId);
        setEditId(product.ProductId);
    };

    const handleDelete = async (id) => {
        await axios.delete(`${BASE_URL}/products/${id}`);
        fetchProducts();
    };

    useEffect(() => {
        fetchProducts();
        fetchCategories();
    }, []);

    return (
        <div>
            <h2>Product Master</h2>
            <form onSubmit={handleSubmit}>
                <input
                    type="text"
                    placeholder="Product Name"
                    value={productName}
                    onChange={(e) => setProductName(e.target.value)}
                />
                <select value={categoryId} onChange={(e) => setCategoryId(e.target.value)}>
                    <option value="">Select Category</option>
                    {categories.map((category) => (
                        <option key={category.CategoryId} value={category.CategoryId}>
                            {category.CategoryName}
                        </option>
                    ))}
                </select>
                <button type="submit">{editId ? 'Update' : 'Add'}</button>
            </form>
            <ul>
                {products.map((product) => (
                    <li key={product.ProductId}>
                        {product.ProductName} - {product.CategoryName}
                        <button onClick={() => handleEdit(product)}>Edit</button>
                        <button onClick={() => handleDelete(product.ProductId)}>Delete</button>
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default ProductMaster;
