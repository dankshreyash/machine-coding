// src/components/CategoryMaster.js
import  { useState, useEffect } from 'react';
import axios from 'axios';
import { BASE_URL } from './config';

const CategoryMaster = () => {
    const [categories, setCategories] = useState([]);
    const [categoryName, setCategoryName] = useState('');
    const [editId, setEditId] = useState(null);

    const fetchCategories = async () => {
        const response = await axios.get(`${BASE_URL}/categories`);
        setCategories(response.data);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (editId) {
            await axios.put(`${BASE_URL}/categories/${editId}`, { CategoryName: categoryName });
        } else {
            await axios.post(`${BASE_URL}/categories`, { CategoryName: categoryName });
        }
        setCategoryName('');
        setEditId(null);
        fetchCategories();
    };

    const handleEdit = (category) => {
        setCategoryName(category.CategoryName);
        setEditId(category.CategoryId);
    };

    const handleDelete = async (id) => {
        await axios.delete(`${BASE_URL}/categories/${id}`);
        fetchCategories();
    };

    useEffect(() => {
        fetchCategories();
    }, []);

    return (
        <div>
            <h2>Category Master</h2>
            <form onSubmit={handleSubmit}>
                <input
                    type="text"
                    placeholder="Category Name"
                    value={categoryName}
                    onChange={(e) => setCategoryName(e.target.value)}
                />
                <button type="submit">{editId ? 'Update' : 'Add'}</button>
            </form>
            <ul>
                {categories.map((category) => (
                    <li key={category.CategoryId}>
                        {category.CategoryName}
                        <button onClick={() => handleEdit(category)}>Edit</button>
                        <button onClick={() => handleDelete(category.CategoryId)}>Delete</button>
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default CategoryMaster;
