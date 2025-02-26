import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";

const ProductDetails = () => {
    const { id: productId } = useParams();
    const navigate = useNavigate();
    const [product, setProduct] = useState(null);
    const [loading, setLoading] = useState(true);
    const [isEditing, setIsEditing] = useState(false); // Control edit state

    useEffect(() => {
        const fetchProductDetails = async () => {
            try {
                const response = await fetch(`http://localhost:5000/product/${productId}`);
                const data = await response.json();
                if (data.product) {
                    setProduct(data.product);
                }
            } catch (error) {
                console.error("Error fetching product details:", error);
            } finally {
                setLoading(false);
            }
        };

        fetchProductDetails();
    }, [productId]);

    // Handle input changes
    const handleChange = (e) => {
        const { name, value } = e.target;
        setProduct((prev) => ({
            ...prev,
            [name]: value,
        }));
    };

    const handleUpdate = async () => {
        try {
            const response = await fetch(`http://localhost:5000/product/update/${productId}`, {
                method: "PUT",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(product),
            });

            if (response.ok) {
                alert("Product updated successfully!");
                const updatedData = await response.json();
                setProduct(updatedData.product);
                setIsEditing(false); // Disable editing after successful update
            } else {
                console.error("Failed to update product");
            }
        } catch (error) {
            console.error("Error updating product:", error);
        }
    };

    if (loading) return <p className="text-center text-lg font-semibold text-gray-700">Loading...</p>;
    if (!product) return <p className="text-center text-red-500">Product not found.</p>;

    return (
        <div className="container mx-auto p-6">
            <div className="max-w-4xl mx-auto bg-white shadow-lg rounded-2xl p-6">
                <h2 className="text-2xl font-bold text-gray-800 mb-4">
                    <input
                        type="text"
                        name="productName"
                        value={product.productName}
                        onChange={handleChange}
                        disabled={!isEditing} // Disable editing unless in edit mode
                        className="w-full border rounded-lg p-2 bg-gray-100 focus:bg-white"
                    />
                </h2>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                        <img
                            src={product.imageUrls?.[0] || "https://via.placeholder.com/400"}
                            alt={product.productName}
                            className="w-full h-64 object-cover rounded-lg"
                        />
                    </div>
                    <div>
                        <label className="block text-gray-600">Type</label>
                        <input
                            type="text"
                            name="productType"
                            value={product.productType}
                            onChange={handleChange}
                            disabled={!isEditing}
                            className="w-full border rounded-lg p-2 bg-gray-100 focus:bg-white"
                        />

                        <label className="block text-gray-600">Category</label>
                        <input
                            type="text"
                            name="category"
                            value={product.category}
                            onChange={handleChange}
                            disabled={!isEditing}
                            className="w-full border rounded-lg p-2 bg-gray-100 focus:bg-white"
                        />

                        <label className="block text-gray-600">Status</label>
                        <select
                            name="status"
                            value={product.status}
                            onChange={handleChange}
                            className="w-full border rounded-lg p-2 mb-2"
                        >
                            <option value="Available">Available</option>
                            <option value="Out of Stock">Out of Stock</option>
                        </select>


                        <label className="block text-gray-600">Quantity</label>
                        <input
                            type="number"
                            name="quantity"
                            value={product.quantity}
                            onChange={handleChange}
                            disabled={!isEditing}
                            className="w-full border rounded-lg p-2 bg-gray-100 focus:bg-white"
                        />

                        <label className="block text-gray-600">Price Per Unit</label>
                        <input
                            type="number"
                            name="pricePerUnit"
                            value={product.pricePerUnit}
                            onChange={handleChange}
                            disabled={!isEditing}
                            className="w-full border rounded-lg p-2 bg-gray-100 focus:bg-white"
                        />

                        <label className="block text-gray-600">Description</label>
                        <textarea
                            name="description"
                            value={product.description}
                            onChange={handleChange}
                            disabled={!isEditing}
                            className="w-full border rounded-lg p-2 bg-gray-100 focus:bg-white"
                        ></textarea>
                    </div>
                </div>

                <div className="mt-4">
                    <h3 className="text-lg font-semibold text-gray-800">Tags</h3>
                    <input
                        type="text"
                        name="tags"
                        value={product.tags.join(", ")}
                        onChange={(e) =>
                            setProduct((prev) => ({
                                ...prev,
                                tags: e.target.value.split(",").map((tag) => tag.trim()),
                            }))
                        }
                        disabled={!isEditing}
                        className="w-full border rounded-lg p-2 bg-gray-100 focus:bg-white"
                    />
                </div>

                <div className="mt-4">
                    <h3 className="text-lg font-semibold text-gray-800">Units Sold</h3>
                    <input
                        type="number"
                        name="unitsSold"
                        value={product.unitsSold}
                        onChange={handleChange}
                        disabled={!isEditing}
                        className="w-full border rounded-lg p-2 bg-gray-100 focus:bg-white"
                    />
                </div>

                {/* Action Buttons */}
                <div className="mt-6 flex gap-4">
                    {!isEditing ? (
                        <button
                            onClick={() => setIsEditing(true)}
                            className="px-4 py-2 bg-yellow-500 text-white rounded-lg hover:bg-yellow-600"
                        >
                            Edit Details
                        </button>
                    ) : (
                        <button
                            onClick={handleUpdate}
                            className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
                        >
                            Update Product
                        </button>
                    )}

                    <button
                        onClick={() => {
                            if (window.confirm("Are you sure you want to delete this product?")) {
                                fetch(`http://localhost:5000/product/delete/${productId}`, { method: "DELETE" })
                                    .then((response) => {
                                        if (response.ok) {
                                            alert("Product deleted successfully!");
                                            navigate("/myproducts");
                                        } else {
                                            console.error("Failed to delete product");
                                        }
                                    })
                                    .catch((error) => console.error("Error deleting product:", error));
                            }
                        }}
                        className="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700"
                    >
                        Delete Product
                    </button>
                </div>
            </div>
        </div>
    );
};

export default ProductDetails; 
