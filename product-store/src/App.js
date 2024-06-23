
import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { ProductProvider } from './context/ProductContext';
import Home from './pages/Home';
import ProductDetail from './pages/ProductDetail';
import ProductEdit from './pages/ProductEdit';
import ProductAdd from './pages/ProductAdd';

const App = () => {
  return (
    <ProductProvider>
      <Router>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/product/:id" element={<ProductDetail />} />
          <Route path="/product/edit/:id" element={<ProductEdit />} />
          <Route path="/product/add" element={<ProductAdd />} />
        </Routes>
      </Router>
    </ProductProvider>
  );
};

export default App;
