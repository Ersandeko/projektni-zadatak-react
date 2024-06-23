
import React, { useContext } from 'react';
import { useParams, Link } from 'react-router-dom';
import { ProductContext } from '../context/ProductContext';
import './ProductPages.css';

const ProductDetail = () => {
  const { id } = useParams();
  const { items } = useContext(ProductContext);
  const product = items.find(p => p.id === parseInt(id));

  return (
    <div>
      <h1>{product.title}</h1>
      <p>{product.price}</p>
      <p>{product.description}</p>
      <img src={product.thumbnail} alt={product.title} />
      <Link to="/">Back</Link>
    </div>
  );
};

export default ProductDetail;
