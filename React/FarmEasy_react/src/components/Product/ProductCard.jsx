import React from "react";
import { useNavigate } from "react-router-dom";

const ProductCard = ({ product }) => {
  const navigate = useNavigate();

  return (
    <div className="bg-white shadow-lg rounded-2xl overflow-hidden transform transition-all duration-300 hover:scale-105">
      <img
        src={product.imageUrls?.[0] || "https://via.placeholder.com/300"}
        alt={product.productName}
        className="w-full h-48 object-cover"
      />
      <div className="p-4">
        <h3 className="text-lg font-semibold text-gray-800">{product.productName}</h3>
        <p className="text-gray-600">{product.status}</p>
        <p className="text-xl font-bold text-green-600">${product.pricePerUnit}</p>
        <button
          className="mt-3 w-full bg-blue-500 hover:bg-blue-600 text-white font-semibold py-2 rounded-lg"
          onClick={() => navigate(`/product/${product._id}`)} // Navigate to ProductDetails
        >
          View Details
        </button>
      </div>
    </div>
  );
};

export default ProductCard;
