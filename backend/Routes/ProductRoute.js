// routes/productRoutes.js
const express = require('express');
const db = require('../db');
const router = express.Router();

// Get products with pagination
router.get('/', async (req, res) => {
    const { page = 1, pageSize = 10 } = req.query;
    const offset = (page - 1) * pageSize;

    try {
        const query = `
            SELECT 
                p.ProductId, p.ProductName, c.CategoryName, c.CategoryId
            FROM Products p
            JOIN Categories c ON p.CategoryId = c.CategoryId
            LIMIT ? OFFSET ?;
        `;
        const [products] = await db.query(query, [parseInt(pageSize), offset]);
        res.json(products);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

// Get product by ID
router.get('/:id', async (req, res) => {
    try {
        const [product] = await db.query('SELECT * FROM Products WHERE ProductId = ?', [req.params.id]);
        if (product.length === 0) {
            return res.status(404).json({ error: 'Product not found' });
        }
        res.json(product[0]);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

// Add a new product
router.post('/', async (req, res) => {
    const { ProductName, CategoryId } = req.body;
    try {
        const [result] = await db.query('INSERT INTO Products (ProductName, CategoryId) VALUES (?, ?)', [ProductName, CategoryId]);
        res.json({ ProductId: result.insertId, ProductName, CategoryId });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

// Update a product
router.put('/:id', async (req, res) => {
    const { ProductName, CategoryId } = req.body;
    try {
        const [result] = await db.query('UPDATE Products SET ProductName = ?, CategoryId = ? WHERE ProductId = ?', [ProductName, CategoryId, req.params.id]);
        if (result.affectedRows === 0) {
            return res.status(404).json({ error: 'Product not found' });
        }
        res.json({ message: 'Product updated successfully' });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

// Delete a product
router.delete('/:id', async (req, res) => {
    try {
        const [result] = await db.query('DELETE FROM Products WHERE ProductId = ?', [req.params.id]);
        if (result.affectedRows === 0) {
            return res.status(404).json({ error: 'Product not found' });
        }
        res.json({ message: 'Product deleted successfully' });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

module.exports = router;
