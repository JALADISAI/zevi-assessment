import React, { useState, useEffect } from 'react';
import "./App.css";
import { MdFavoriteBorder } from "react-icons/md";

function Products() {
  const [products, setProducts] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [filterCategory, setFilterCategory] = useState('');

  

  useEffect(() => {
    fetch('https://fakestoreapi.com/products')
      .then((response) => response.json())
      .then((data) => setProducts(data))
      .catch((error) => console.error('Error fetching products:', error));
  }, []);

  const handleSearch = (event) => {
    setSearchQuery(event.target.value);
  };

  const handleFilter = (category) => {
    setFilterCategory(category);
  };

  const filteredProducts = products.filter((product) => {
    const searchMatch = product.title.toLowerCase().includes(searchQuery.toLowerCase());
    const categoryMatch = !filterCategory || product.category === filterCategory;
    return searchMatch && categoryMatch;
  });
  
    
  const productRows = [];
  for (let i = 0; i < filteredProducts.length; i += 4) {
    productRows.push(
      <div key={i} className="product-row">
        {filteredProducts.slice(i, i + 4).map((product) => (
          <div key={product.id} className="product-item">
            <h3>{product.title}</h3>
            <img src={product.image} alt={product.title} />
            <p>{product.description}</p>
            <p>Price: ${product.price}</p>
            <button className='button'>VIEW PRODUCT</button>
          </div>
        ))}
      </div>
      
    );
  }


  return (
    <div className="products-container">
      <h1>Products</h1>
      <input type="text" placeholder="Search products..." value={searchQuery} onChange={handleSearch} />
      <select value={filterCategory} onChange={(e) => handleFilter(e.target.value)}>
        <option value="">All Categories</option>
        <option value="men's clothing">Men's Clothing</option>
        <option value="women's clothing">Women's Clothing</option>
      </select>
      {productRows}
    </div>
  );
}

export default Products;
