import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { useCart } from "../Cart/CartContext"; // Import the Cart Context

const AllProducts = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const { addToCart } = useCart(); // Use addToCart function from context
  const navigate = useNavigate();
  
  const loggedInUserId = useSelector((state) => state.auth.user?.id);

  useEffect(() => {
    fetch("http://localhost:5000/product")
      .then((response) => response.json())
      .then((data) => {
        if (data.products) {
          const filteredProducts = data.products.filter(
            (product) => product.sellerId !== loggedInUserId
          );
          setProducts(filteredProducts);
        }
        setLoading(false);
      })
      .catch((error) => {
        console.error("Error fetching products:", error);
        setLoading(false);
      });
  }, [loggedInUserId]);

  const handleAddToCart = (product) => {
    addToCart(product);  // Add product to cart
    alert("Product Added to the cart successfully!!!")
    // navigate("/seller/cart");   // Redirect to cart page

  };

  return (
    <div className="container mx-auto p-6">
      <h2 className="text-2xl font-bold mb-4">All Products</h2>

      {loading ? (
        <p>Loading products...</p>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {products.length > 0 ? (
            products.map((product) => (
              <div key={product._id} className="relative border p-4 rounded-lg shadow-lg bg-white">
                <Link to={`/seller/product/${product._id}`} className="block">
                  <img
                    src={
                      product.imageUrls.length > 0
                        ? product.imageUrls[0]
                        : "https://via.placeholder.com/150"
                    }
                    alt={product.productName}
                    className="w-full h-48 object-cover rounded-md"
                  />
                  <h3 className="text-lg font-semibold mt-2">{product.productName}</h3>
                  <p className="text-gray-600">Category: {product.category}</p>
                  <p className="text-sm text-gray-500">{product.description}</p>
                  <p className="text-green-700 font-bold">${product.pricePerUnit} per unit</p>
                  <p className={`text-sm font-medium ${product.status === "available" ? "text-green-500" : "text-red-500"}`}>
                    {product.status}
                  </p>
                </Link>
                {/* Plus Icon to Add to Cart */}
                <button
                  onClick={() => handleAddToCart(product)}
                  className="absolute top-2 right-2 bg-blue-500 text-white p-2 rounded-full hover:bg-blue-700 transition"
                >
                  ➕
                </button>
              </div>
            ))
          ) : (
            <p>No products available for purchase.</p>
          )}
        </div>
      )}
    </div>
  );
};

export default AllProducts;
