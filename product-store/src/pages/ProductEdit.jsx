
import React, { useState, useContext, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { ProductContext } from '../context/ProductContext';
import axios from 'axios';
import './ProductPages.css';

const ProductEdit = () => {
  const { id } = useParams();
  const { items, updateProduct } = useContext(ProductContext);
  const navigate = useNavigate();
  const product = items.find(p => p.id === parseInt(id));
  const [formData, setFormData] = useState(product);

  useEffect(() => {
    if (!product) {
      navigate('/');
    }
  }, [product, navigate]);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    axios.put(`https://dummyjson.com/products/${id}`, formData)
      .then(res => {
        updateProduct(res.data);
        navigate('/');
      })
      .catch(err => console.error(err));
  };

  return (
    <form onSubmit={handleSubmit}>
      <h1>Edit Product</h1>
      <input name="title" value={formData.title} onChange={handleChange} />
      <input name="brand" value={formData.brand} onChange={handleChange} />
      <input name="price" value={formData.price} onChange={handleChange} />
      <textarea name="description" value={formData.description} onChange={handleChange} />
      <input name="thumbnail" value={formData.thumbnail} onChange={handleChange} />
      <button type="submit">Submit</button>
    </form>
  );
};

export default ProductEdit;
