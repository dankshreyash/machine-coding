// routes/categoryRoutes.js
const express = require('express');
const db = require('../db');
const router = express.Router();

// Get all categories
router.get('/', async (req, res) => {
    try {
        const [categories] = await db.query('SELECT * FROM Categories');
        res.json(categories);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

// Get category by ID
router.get('/:id', async (req, res) => {
    try {
        const [category] = await db.query('SELECT * FROM Categories WHERE CategoryId = ?', [req.params.id]);
        if (category.length === 0) {
            return res.status(404).json({ error: 'Category not found' });
        }
        res.json(category[0]);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

// Add a new category
router.post('/', async (req, res) => {
    const { CategoryName } = req.body;
    try {
        const [result] = await db.query('INSERT INTO Categories (CategoryName) VALUES (?)', [CategoryName]);
        res.json({ CategoryId: result.insertId, CategoryName });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

// Update a category
router.put('/:id', async (req, res) => {
    const { CategoryName } = req.body;
    try {
        const [result] = await db.query('UPDATE Categories SET CategoryName = ? WHERE CategoryId = ?', [CategoryName, req.params.id]);
        if (result.affectedRows === 0) {
            return res.status(404).json({ error: 'Category not found' });
        }
        res.json({ message: 'Category updated successfully' });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

// Delete a category
router.delete('/:id', async (req, res) => {
    try {
        const [result] = await db.query('DELETE FROM Categories WHERE CategoryId = ?', [req.params.id]);
        if (result.affectedRows === 0) {
            return res.status(404).json({ error: 'Category not found' });
        }
        res.json({ message: 'Category deleted successfully' });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

module.exports = router;
