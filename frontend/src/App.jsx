import { BrowserRouter as Router, Route, Routes, Link } from 'react-router-dom';
import CategoryMaster from '../src/CategoryMaster';
import ProductMaster from '../src/ProductMaster';
import ProductList from '../src/ProductList';

const App = () => {
    return (
        <Router>
            <nav>
                <Link to="/categories">Category Master</Link>
                <Link to="/products">Product Master</Link>
                <Link to="/product-list">Product List</Link>
            </nav>
            <Routes>
                <Route path="/categories" element={<CategoryMaster />} />
                <Route path="/products" element={<ProductMaster />} />
                <Route path="/product-list" element={<ProductList />} />
            </Routes>
        </Router>
    );
};

export default App;
