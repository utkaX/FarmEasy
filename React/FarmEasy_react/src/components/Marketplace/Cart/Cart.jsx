import React from "react";
import { useCart } from "./CartContext";
import { Link } from "react-router-dom";

const Cart = () => {
  const { cart, removeFromCart } = useCart();

  return (
    <div className="container mx-auto p-6">
      <h2 className="text-2xl font-bold mb-4">Shopping Cart</h2>
      
      {cart.length > 0 ? (
        <div className="bg-gray-100 p-4 rounded-lg shadow-md">
          {cart.map((item) => (
            <div key={item._id} className="flex items-center justify-between p-2 border-b">
              <p className="font-semibold">
                {item.productName} ({item.quantity})
              </p>
              <p className="text-green-700 font-bold">${item.pricePerUnit * item.quantity}</p>
              <button
                onClick={() => removeFromCart(item._id)}
                className="bg-red-500 text-white px-2 py-1 rounded-md hover:bg-red-700 transition"
              >
                ❌ Remove
              </button>
            </div>
          ))}
          <Link to="/seller/allproducts" className="mt-4 block text-center text-blue-600 hover:underline">
            Continue Shopping
          </Link>
        </div>
      ) : (
        <p className="text-gray-600">No items in the cart.</p>
      )}
    </div>
  );
};

export default Cart;
