import React, { useEffect, useState } from "react";
import { useLocation, Link } from "react-router-dom";

const SearchResults = () => {
  const query = new URLSearchParams(useLocation().search);
  const searchTerm = query.get("q") || "";

  const [products, setProducts] = useState({}); // Ensure it's always an array
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await fetch("http://localhost:5000/product");
        const data = await response.json();

        // Ensure the response is an array, otherwise set an empty array
        if (Array.isArray(data)) {
          setProducts(data);
        } else {
          console.error("Unexpected response format:", data);
          setProducts([]);
        }
      } catch (err) {
        console.error("Error fetching products:", err);
        setError("Failed to fetch products.");
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, []);

  // Ensure filtering only happens when products is an array
  const filteredProducts = Array.isArray(products)
    ? products.filter((product) =>
        product.productName.toLowerCase().includes(searchTerm.toLowerCase())
      )
    : [];

  return (
    <div className="container mx-auto p-6">
      <h2 className="text-2xl font-bold mb-4">Search Results for "{searchTerm}"</h2>

      {loading ? (
        <p>Loading...</p>
      ) : error ? (
        <p className="text-red-500">{error}</p>
      ) : filteredProducts.length > 0 ? (
        <ul className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {filteredProducts.map((product) => (
            <li key={product._id} className="border p-4 rounded-md shadow-md">
              <img
                src={product.imageUrl || "https://via.placeholder.com/150"}
                alt={product.productName}
                className="w-full h-40 object-cover mb-2 rounded-md"
              />
              <h3 className="text-lg font-semibold">{product.productName}</h3>
              <p className="text-gray-600">${product.pricePerUnit}</p>
              <Link to={`/product/${product._id}`} className="text-green-700 font-semibold">
                View Details
              </Link>
            </li>
          ))}
        </ul>
      ) : (
        <p className="text-gray-500">No products found.</p>
      )}
    </div>
  );
};

export default SearchResults;
