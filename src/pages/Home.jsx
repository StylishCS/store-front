import React, { useState, useEffect } from 'react';
import { ProductCard } from '../components/prodCard';
import http from '../http';

const Home = () => {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    http.GET("/products").then((response) => {
      setProducts(response);
    }).catch((error) => {
      console.error("Error fetching products:", error);
    });
  }, []);

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-3xl font-bold mb-4">Products Page</h1>
      <div className="flex flex-wrap gap-4">
        {products.map(product => (
          <ProductCard key={product._id} product={product} />
        ))}
      </div>
    </div>
  );
};

export default Home;
