
import React, { useState, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { ProductContext } from '../context/ProductContext';
import axios from 'axios';
import './ProductPages.css';

const ProductAdd = () => {
  const { addProduct } = useContext(ProductContext);
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    title: '',
    price: '',
    description: '',
    thumbnail: '',
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    axios.post('https://dummyjson.com/products/add', formData)
      .then(res => {
        addProduct(res.data);
        navigate('/');
      })
      .catch(err => console.error(err));
  };

  return (
    <form onSubmit={handleSubmit}>
      <h1>Add Product</h1>
      <input name="title" value={formData.title} onChange={handleChange} />
      <input name="price" value={formData.price} onChange={handleChange} />
      <textarea name="description" value={formData.description} onChange={handleChange} />
      <input name="thumbnail" value={formData.thumbnail} onChange={handleChange} />
      <button type="submit">Submit</button>
    </form>
  );
};

export default ProductAdd;
