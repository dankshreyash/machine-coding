const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const categoryRoutes = require('./Routes/categoryRoutes');
const productRoutes = require('./Routes/ProductRoute');
const dotenv = require('dotenv');

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(bodyParser.json());

// Routes
app.use('/categories', categoryRoutes);
app.use('/products', productRoutes);

app.get('/products', async (req, res) => {
    const { page = 1, pageSize = 10 } = req.query;
    const offset = (page - 1) * pageSize;

    const query = `
        SELECT 
            p.ProductId, p.ProductName, c.CategoryName, c.CategoryId
        FROM Products p
        JOIN Categories c ON p.CategoryId = c.CategoryId
        LIMIT ? OFFSET ?;
    `;

    const [products] = await db.execute(query, [parseInt(pageSize), offset]);
    res.json(products);
});

// Start server
app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});
