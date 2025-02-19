import { useEffect, useState } from "react";
import { useSelector } from "react-redux";

const MyOrder = () => {
    const [orders, setOrders] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    // Get the current logged-in user's information from Redux store
    const user = useSelector((state) => state.auth.user);
    const buyerId = user ? user.id : null;

    useEffect(() => {
        const fetchOrders = async () => {
            try {
                const response = await fetch("http://localhost:5000/order");
                if (!response.ok) throw new Error("Failed to fetch orders.");

                const data = await response.json();
                console.log("✅ All Orders:", data.orders);

                // Filter orders for the logged-in user
                const userOrders = data.orders.filter(order => order.buyerId === buyerId);
                setOrders(userOrders);
            } catch (err) {
                console.error("❌ Fetch Error:", err);
                setError(err.message);
            } finally {
                setLoading(false);
            }
        };

        if (buyerId) fetchOrders();
    }, [buyerId]);

    if (loading) return <p className="text-center text-lg">Loading orders...</p>;
    if (error) return <p className="text-center text-red-500">Error: {error}</p>;
    if (!orders.length) return <p className="text-center text-gray-500">No orders found.</p>;

    return (
        <div className="max-w-5xl mx-auto p-6">
            <h2 className="text-2xl font-bold mb-4">Your Orders</h2>
            <div className="grid md:grid-cols-2 gap-6">
                {orders.map((order) => (
                    <div key={order._id} className="bg-white p-4 shadow-lg rounded-lg border">
                        <p className="text-gray-600"><strong>Order ID:</strong> {order._id}</p>
                        <p className="text-gray-600"><strong>Status:</strong> {order.status}</p>
                        <p className="text-gray-600"><strong>Payment Status:</strong> {order.paymentStatus}</p>
                        <p className="text-gray-600"><strong>Payment Method:</strong> {order.paymentMethod}</p>
                        <p className="text-gray-600"><strong>Shipping Address:</strong> {order.shippingAddress}</p>
                        <p className="text-gray-600"><strong>Total Price:</strong> ${order.totalPrice}</p>
                        <p className="text-gray-600"><strong>Order Date:</strong> {new Date(order.orderDate).toLocaleDateString()}</p>
                        <p className="text-gray-600"><strong>Expected Delivery:</strong> {new Date(order.expectedDeliveryDate).toLocaleDateString()}</p>
                        
                        <h3 className="font-semibold mt-4">Products Ordered:</h3>
                        <ul className="list-disc ml-6">
                            {order.products.map((product) => (
                                <li key={product.productId} className="text-gray-700">
                                    {product.productId} - {product.quantityOrdered} pcs @ ${product.price}
                                </li>
                            ))}
                        </ul>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default MyOrder;
