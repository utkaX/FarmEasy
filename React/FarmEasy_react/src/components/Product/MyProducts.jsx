import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import axios from "axios";
import ProductCard from "./ProductCard"; // Import ProductCard

const MyProducts = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const userId = useSelector((state) => state.auth.user); // Fetch user ID from Redux

  useEffect(() => {
    if (!userId) return;

    const fetchProducts = async () => {
      try {
        const response = await axios.get(`http://localhost:5000/product/seller/${userId.id}`);
        if (response.data.success) {
          setProducts(response.data.products);
        }
      } catch (error) {
        console.error("Error fetching products:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, [userId]);

  if (loading) return <p className="text-center text-lg font-semibold text-gray-700">Loading...</p>;

  return (
    <div className="container mx-auto p-6">
      <h2 className="text-2xl font-bold text-gray-800 mb-4">My Products</h2>
      {products.length === 0 ? (
        <p className="text-center text-gray-600">No products found.</p>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {products.map((product) => (
            <ProductCard key={product._id} product={product} />
          ))}
        </div>
      )}
    </div>
  );
};

export default MyProducts;
