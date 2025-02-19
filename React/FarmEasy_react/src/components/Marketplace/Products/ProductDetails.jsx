import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useSelector } from "react-redux"; // Import useSelector to get user from Redux store

const ProductDetails = () => {
    const { id } = useParams(); // Get product ID from URL
    const [product, setProduct] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    // Get the current logged-in user's information from Redux store
    const user = useSelector((state) => state.auth.user); // Assuming the user info is stored in state.user
    const buyerId = user ? user.id : null; // Get the user ID from the Redux store if logged in

    useEffect(() => {
        const fetchProduct = async () => {
            try {
                const response = await fetch(`http://localhost:5000/product/${id}`);
                if (!response.ok) throw new Error("Product not found");

                const data = await response.json();
                console.log("✅ Product Data Fetched:", data.product); // Debugging log
                setProduct(data.product);
            } catch (err) {
                console.error("❌ Fetch Error:", err);
                setError(err.message);
            } finally {
                setLoading(false);
            }
        };

        fetchProduct();
    }, [id]);

    const handleBuyNow = async () => {
        if (!buyerId) {
            alert("You must be logged in to make a purchase.");
            return;
        }

        console.log(product)
        const sellerId = product._id;
        const products = [
            {
                productId: product._id,
                quantityOrdered: 1,
                price: product.pricePerUnit,
            },
        ];
        const shippingAddress = "Buyer address here";  // Replace with actual shipping address input
        const paymentMethod = "credit card";  // Change depending on selected payment method
        const expectedDeliveryDate = new Date();  // Update with expected delivery date logic

        const orderData = {
            buyerId,
            sellerId,
            products,
            shippingAddress,
            paymentMethod,
            expectedDeliveryDate,
        };

        try {
            const response = await fetch("http://localhost:5000/order/create", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(orderData),
            });

            const result = await response.json();
            if (response.ok) {
                alert("Order created successfully!");
                console.log(result);
                // Optionally trigger payment process after order creation
            } else {
                throw new Error(result.error || "Order creation failed");
            }
        } catch (error) {
            console.error("Error creating order:", error);
            alert("Failed to create order. Please try again.");
        }
    };

    if (loading) return <p className="text-center text-lg">Loading product details...</p>;
    if (error) return <p className="text-center text-red-500">Error: {error}</p>;

    if (!product) return <p className="text-center text-gray-500">No product found.</p>;

    return (
        <div className="max-w-4xl mx-auto p-6 bg-white shadow-lg rounded-lg">
            <h1 className="text-3xl font-bold mb-2">{product.productName || "No Name"}</h1>
            <p className="text-gray-500">{product.productType || "Unknown Type"}</p>

            {/* Show images from `imageUrls` */}
            <div className="flex gap-4 my-4">
                {product.imageUrls?.length > 0 ? (
                    product.imageUrls.map((url, index) => (
                        <img 
                            key={index} 
                            src={url} 
                            alt={`Product Image ${index + 1}`} 
                            className="w-48 h-48 object-cover rounded-md border" 
                            onError={(e) => { e.target.src = "https://placehold.co/150x150"; }} // Show placeholder if image fails
                        />
                    ))
                ) : (
                    <img src="https://placehold.co/150x150" alt="Placeholder" className="w-48 h-48 object-cover rounded-md border" />
                )}
            </div>

            <p className="text-xl font-semibold text-green-600">${product.pricePerUnit ?? "N/A"}</p>
            <p><strong>Description:</strong> {product.description || "No description available"}</p>
            <p><strong>Category:</strong> {product.category || "Uncategorized"}</p>
            <p><strong>Available Quantity:</strong> {product.quantity ?? "N/A"}</p>
            <p><strong>Units Sold:</strong> {product.unitsSold ?? 0}</p>
            <p><strong>Status:</strong> {product.status || "Unknown"}</p>
            <p><strong>Tags:</strong> {product.tags?.length > 0 ? product.tags.join(", ") : "No tags available"}</p>

            {/* Fetch seller details */}
            <p className="text-sm text-gray-500">
                <strong>Seller:</strong> {product.sellerId?.name || "Unknown"} ({product.sellerId?.email || "No Email"})
            </p>

            <p className="text-sm text-gray-400">
                <strong>Added on:</strong> {product.dateAdded ? new Date(product.dateAdded).toLocaleDateString() : "Unknown"}
            </p>

            {/* Buy Button */}
            <div className="mt-6">
                <button
                    onClick={handleBuyNow}
                    className="px-6 py-3 bg-blue-600 text-white font-semibold rounded-lg shadow-md hover:bg-blue-700 transition-colors"
                >
                    Buy Now
                </button>
            </div>
        </div>
    );
};

export default ProductDetails;
