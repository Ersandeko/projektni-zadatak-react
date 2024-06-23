
import React, { createContext, useReducer, useEffect } from 'react';
import axios from 'axios';

const initialState = {
  items: [],
};

const productReducer = (state, action) => {
  switch (action.type) {
    case 'SET_PRODUCTS':
      return { ...state, items: action.payload };
    case 'ADD_PRODUCT':
      return { ...state, items: [...state.items, action.payload] };
    case 'DELETE_PRODUCT':
      return { ...state, items: state.items.filter(item => item.id !== action.payload) };
    case 'UPDATE_PRODUCT':
      return {
        ...state,
        items: state.items.map(item =>
          item.id === action.payload.id ? action.payload : item
        ),
      };
    default:
      return state;
  }
};

export const ProductContext = createContext();

export const ProductProvider = ({ children }) => {
  const [state, dispatch] = useReducer(productReducer, initialState);

  useEffect(() => {
    axios.get('https://dummyjson.com/products')
      .then(res => {
        dispatch({ type: 'SET_PRODUCTS', payload: res.data.products });
      })
      .catch(err => console.error(err));
  }, []);

  const addProduct = (product) => {
    axios.post('https://dummyjson.com/products/add', product)
      .then(res => {
        dispatch({ type: 'ADD_PRODUCT', payload: res.data });
      })
      .catch(err => console.error(err));
  };

  const deleteProduct = (id) => {
    axios.delete(`https://dummyjson.com/products/${id}`)
      .then(() => {
        dispatch({ type: 'DELETE_PRODUCT', payload: id });
      })
      .catch(err => console.error(err));
  };

  const updateProduct = (product) => {
    axios.put(`https://dummyjson.com/products/${product.id}`, product)
      .then(res => {
        dispatch({ type: 'UPDATE_PRODUCT', payload: res.data });
      })
      .catch(err => console.error(err));
  };

  return (
    <ProductContext.Provider value={{ ...state, addProduct, deleteProduct, updateProduct }}>
      {children}
    </ProductContext.Provider>
  );
};
