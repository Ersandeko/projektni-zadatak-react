import React, { useContext, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { ProductContext } from '../context/ProductContext';
import ReactPaginate from 'react-paginate';
import Swal from 'sweetalert2';
import '@fortawesome/fontawesome-free/css/all.min.css'; 
import './Home.css'; 

const Home = () => {
  const { items, deleteProduct } = useContext(ProductContext);
  const [currentPage, setCurrentPage] = useState(0);
  const [searchTerm, setSearchTerm] = useState('');
  const [filter, setFilter] = useState('all');
  const [sortOrder, setSortOrder] = useState('asc');
  const itemsPerPage = 10;
  const navigate = useNavigate();

  const handlePageClick = ({ selected }) => {
    setCurrentPage(selected);
  };

  const handleSearch = (event) => {
    setSearchTerm(event.target.value);
  };

  const handleFilterChange = (event) => {
    setFilter(event.target.value);
  };

  const handleSortChange = (event) => {
    setSortOrder(event.target.value);
  };

  const capitalizeFirstLetter = (string) => {
    return string.charAt(0).toUpperCase() + string.slice(1);
  };

  const formatDescription = (description) => {
    return description.length > 40 ? `${description.substring(0, 40)}...` : description;
  };

  const formatPrice = (price) => {
    return `$${price.toFixed(2)}`;
  };

  const getStockStatus = (stock) => {
    if (stock > 0 && stock <= 100) return 'Available';
    if (stock <= 0) return 'Not available';
    if (stock > 100) return 'Sale';
  };

  const getStockClass = (stock) => {
    if (stock > 0 && stock <= 100) return 'stock-available';
    if (stock <= 0) return 'stock-not-available';
    if (stock > 100) return 'stock-sale';
  };

  const filteredItems = items
    .filter(product => {
      if (filter === 'available' && product.stock <= 0) return false;
      if (filter === 'not-available' && product.stock > 0) return false;
      return product.title.toLowerCase().includes(searchTerm.toLowerCase());
    })
    .sort((a, b) => {
      const priceComparison = a.price - b.price;
      return sortOrder === 'asc' ? priceComparison : -priceComparison;
    });

  const startIndex = currentPage * itemsPerPage;
  const selectedItems = filteredItems.slice(startIndex, startIndex + itemsPerPage);

  const handleDelete = (id) => {
    Swal.fire({
      title: 'Are you sure?',
      text: 'Do you want to delete this product?',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Yes, delete it!',
      cancelButtonText: 'No, keep it'
    }).then((result) => {
      if (result.isConfirmed) {
        deleteProduct(id);
        Swal.fire(
          'Deleted!',
          'Your product has been deleted.',
          'success'
        );
      }
    });
  };

  return (
    <div className="home-container">
      <h1>Products</h1>
      <div className="filters">
        <input
          type="text"
          placeholder="Search products by title..."
          value={searchTerm}
          onChange={handleSearch}
        />
        <select value={filter} onChange={handleFilterChange}>
          <option value="all">All</option>
          <option value="available">Available</option>
          <option value="not-available">Not Available</option>
        </select>
        <select value={sortOrder} onChange={handleSortChange}>
          <option value="asc">Price: Low to High</option>
          <option value="desc">Price: High to Low</option>
        </select>
        <Link to="/product/add" className="add-button">+ Add</Link>
      </div>
      <table>
        <thead>
          <tr>
            <th>ID</th>
            <th>Title</th>
            <th>Description</th>
            <th>Brand</th>
            <th>Rating</th>
            <th>Category</th>
            <th>Stock</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {selectedItems.map(product => (
            <tr key={product.id}>
              <td>#{product.id}</td>
              <td>{product.title}</td>
              <td>{formatDescription(product.description)}</td>
              <td>{product.brand}</td>
              <td>{formatPrice(product.price)}</td>
              <td>{capitalizeFirstLetter(product.category)}</td>
              <td className={getStockClass(product.stock)}>{getStockStatus(product.stock)}</td>
              <td>
                <button onClick={() => navigate(`/product/edit/${product.id}`)} className="edit-button">
                  <i className="fas fa-edit"></i>
                </button>
                <button onClick={() => handleDelete(product.id)} className="delete-button">
                  <i className="fas fa-trash"></i>
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      <ReactPaginate
        previousLabel={"previous"}
        nextLabel={"next"}
        breakLabel={"..."}
        pageCount={Math.ceil(filteredItems.length / itemsPerPage)}
        marginPagesDisplayed={2}
        pageRangeDisplayed={5}
        onPageChange={handlePageClick}
        containerClassName={"pagination"}
        pageLinkClassName={"pagination-link"}
        previousLinkClassName={"pagination-previous"}
        nextLinkClassName={"pagination-next"}
        activeLinkClassName={"pagination-active"}
      />
    </div>
  );
};

export default Home;
