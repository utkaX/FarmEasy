import { useState, useEffect } from "react";
import { useSelector } from "react-redux";

function ListProducts() {
    const user = useSelector((state) => state.auth.user);

    const [productData, setProductData] = useState({
        sellerId: "", 
        productName: "",
        productType: "",
        quantity: "",
        pricePerUnit: "",
        description: "",
        category: "",
        tags: [],
        status: "available", 
        dateAdded: new Date().toISOString(),
        unitsSold: 0,
        imageUrls: []
    });

    useEffect(() => {
        if (user?.id) {
            setProductData((prev) => ({ ...prev, sellerId: user.id }));
        }
    }, [user]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setProductData((prev) => ({
            ...prev,
            [name]: name === "quantity" || name === "pricePerUnit" ? Number(value) : value
        }));
    };

    const handleTagsChange = (e) => {
        setProductData((prev) => ({
            ...prev,
            tags: e.target.value.split(",").map((tag) => tag.trim())
        }));
    };

    const handleImageChange = async (e) => {
        const files = e.target.files;
        if (!files || files.length === 0) return;

        let uploadedImages = [];

        for (let i = 0; i < files.length; i++) {
            const data = new FormData();
            data.append("file", files[i]);
            data.append("upload_preset", "FarmEasy");
            data.append("cloud_name", "dapq3qeao");

            try {
                const res = await fetch("https://api.cloudinary.com/v1_1/dapq3qeao/image/upload", {
                    method: "POST",
                    body: data,
                });

                const uploadedImage = await res.json();

                if (uploadedImage.secure_url) {
                    uploadedImages.push(uploadedImage.secure_url);
                }
            } catch (error) {
                console.error("Error uploading image:", error);
            }
        }

        setProductData((prev) => ({
            ...prev,
            imageUrls: [...prev.imageUrls, ...uploadedImages]
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!productData.sellerId) {
            console.error("Seller ID is missing.");
            return;
        }

        if (productData.imageUrls.length === 0) {
            console.error("No images uploaded.");
            return;
        }

        try {
            const response = await fetch("http://localhost:5000/product/add", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(productData),
            });

            if (!response.ok) {
                const errorMessage = await response.text();
                throw new Error(`HTTP error! Status: ${response.status} - ${errorMessage}`);
            }

            const data = await response.json();
            console.log("Product uploaded successfully:", data);

            window.alert("Product listed successfully!");

            setProductData({
                sellerId: user.id,
                productName: "",
                productType: "",
                quantity: "",
                pricePerUnit: "",
                description: "",
                category: "",
                tags: [],
                status: "available",
                dateAdded: new Date().toISOString(),
                unitsSold: 0,
                imageUrls: []
            });
        } catch (error) {
            console.error("Error uploading product", error);
        }
    };

    return (
        <div className="max-w-3xl mx-auto p-8 bg-white shadow-xl rounded-lg border border-gray-200 mt-10">
            <h2 className="text-3xl font-extrabold text-green-700 mb-6 text-center">
                List Your Product 🛍️
            </h2>

            <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                    <input type="text" name="productName" placeholder="Product Name" value={productData.productName} onChange={handleChange} required className="input-field" />
                    <input type="text" name="productType" placeholder="Product Type" value={productData.productType} onChange={handleChange} required className="input-field" />
                    <input type="number" name="quantity" placeholder="Quantity" value={productData.quantity} onChange={handleChange} required className="input-field" />
                    <input type="number" name="pricePerUnit" placeholder="Price per Unit" value={productData.pricePerUnit} onChange={handleChange} required className="input-field" />
                </div>

                <textarea name="description" placeholder="Description" value={productData.description} onChange={handleChange} className="input-field h-28"></textarea>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                    <input type="text" name="category" placeholder="Category" value={productData.category} onChange={handleChange} required className="input-field" />
                    <input type="text" name="tags" placeholder="Tags (comma separated)" value={productData.tags.join(", ")} onChange={handleTagsChange} className="input-field" />
                </div>

                <select name="status" value={productData.status} onChange={handleChange} required className="input-field">
                    <option value="available">Available</option>
                    <option value="out of stock">Out of Stock</option>
                </select>

                <label className="block text-gray-700 font-semibold">Upload Images</label>
                <input type="file" name="images" onChange={handleImageChange} multiple required className="input-field border-dashed border-2 border-gray-300 p-3" />

                {productData.imageUrls.length > 0 && (
                    <div className="grid grid-cols-3 gap-4 mt-4">
                        {productData.imageUrls.map((url, index) => (
                            <img key={index} src={url} alt={`Uploaded ${index}`} className="w-full h-28 object-cover rounded-lg shadow-md" />
                        ))}
                    </div>
                )}

                <button type="submit" disabled={!productData.sellerId} className="btn-primary">
                    🚀 List Product
                </button>
            </form>
        </div>
    );
}

export default ListProducts;
