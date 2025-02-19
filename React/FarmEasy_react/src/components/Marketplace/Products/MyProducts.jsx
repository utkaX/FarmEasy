import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux"; // Import useSelector to get user data

const MyProducts = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  // Get the logged-in user's ID from Redux
  const sellerId = useSelector((state) => state.auth.user?.id); // Adjust based on your Redux state structure

  useEffect(() => {
    if (!sellerId) return; // Prevent fetching if sellerId is not available

    fetch(`http://localhost:5000/product/seller/${sellerId}`)
      .then((response) => response.json())
      .then((data) => {
        setProducts(data.products || []);
        setLoading(false);
      })
      .catch((error) => {
        console.error("Error fetching my products:", error);
        setLoading(false);
      });
  }, [sellerId]); // Refetch when sellerId changes

  return (
    <div className="container mx-auto p-6">
      <h2 className="text-2xl font-bold mb-4">My Products</h2>

      {loading ? (
        <p>Loading products...</p>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {products.length > 0 ? (
            products.map((product) => (
              <div
                key={product._id}
                className="border p-4 rounded-lg shadow-lg bg-white"
              >
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
              </div>
            ))
          ) : (
            <p>No products uploaded by you.</p>
          )}
        </div>
      )}
    </div>
  );
};

export default MyProducts;
