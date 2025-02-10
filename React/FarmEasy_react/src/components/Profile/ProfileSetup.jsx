import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";

const ProfileSetup = () => {
    const user = useSelector((state) => state.auth.user);
    const navigate = useNavigate();
    const [formData, setFormData] = useState({
        personalDetails: {
            firstName: "",
            lastName: "",
            dateOfBirth: "",
            contactNumber: "",
            address: {
                street: "",
                city: "",
                state: "",
                zipCode: ""
            },
            completed: false,
        },
        farmDetails: {
            farmName: "",
            farmLocation: "",
            farmSize: "",
            farmType: "organic",
            cropsGrown: [],
            livestock: [],
            completed: false,
        },
        resourceAccessibility: {
            accessToWater: "adequate",
            electricityAvailability: false,
            accessToFarmingTools: [],
            completed: false,
        },
        isProfileComplete: false,
    });

    const handleChange = (e, section, field, nestedField = null) => {
        const value = e.target.type === "checkbox" ? e.target.checked : e.target.value;
        setFormData((prev) => {
            if (nestedField) {
                return {
                    ...prev,
                    [section]: {
                        ...prev[section],
                        [field]: { ...prev[section][field], [nestedField]: value }
                    },
                };
            } else {
                return {
                    ...prev,
                    [section]: { ...prev[section], [field]: value },
                };
            }
        });
    };

    const handleArrayChange = (e, section, field) => {
        const value = e.target.value.split(",").map(item => item.trim());
        setFormData((prev) => ({
            ...prev,
            [section]: { ...prev[section], [field]: value },
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await fetch("http://localhost:5000/farmer", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ userId: user.id, ...formData }),
            });
            if (response.ok) navigate("/home");
            else console.error("Failed to save profile");
        } catch (error) {
            console.error("Error saving profile:", error);
        }
    };

    return (
        <div className="max-w-3xl mx-auto p-6 bg-white shadow-lg rounded-lg mt-8">
            <h1 className="text-2xl font-bold text-center text-green-700">Farmer Profile Setup</h1>
            <form onSubmit={handleSubmit} className="space-y-4">
                {/* Personal Details */}
                <h2 className="text-xl font-semibold">Personal Details</h2>
                <input type="text" placeholder="First Name" className="input" value={formData.personalDetails.firstName} onChange={(e) => handleChange(e, "personalDetails", "firstName")} required />
                <input type="text" placeholder="Last Name" className="input" value={formData.personalDetails.lastName} onChange={(e) => handleChange(e, "personalDetails", "lastName")} required />
                <input type="date" className="input" value={formData.personalDetails.dateOfBirth} onChange={(e) => handleChange(e, "personalDetails", "dateOfBirth")} />
                <input type="text" placeholder="Contact Number" className="input" value={formData.personalDetails.contactNumber} onChange={(e) => handleChange(e, "personalDetails", "contactNumber")} required />
                <input type="text" placeholder="Street" className="input" value={formData.personalDetails.address.street} onChange={(e) => handleChange(e, "personalDetails", "address", "street")} />
                <input type="text" placeholder="City" className="input" value={formData.personalDetails.address.city} onChange={(e) => handleChange(e, "personalDetails", "address", "city")} required />
                <input type="text" placeholder="State" className="input" value={formData.personalDetails.address.state} onChange={(e) => handleChange(e, "personalDetails", "address", "state")} required />
                <input type="text" placeholder="Zip Code" className="input" value={formData.personalDetails.address.zipCode} onChange={(e) => handleChange(e, "personalDetails", "address", "zipCode")} required />
                
                {/* Farm Details */}
                <h2 className="text-xl font-semibold">Farm Details</h2>
                <input type="text" placeholder="Farm Name" className="input" value={formData.farmDetails.farmName} onChange={(e) => handleChange(e, "farmDetails", "farmName")} required />
                <input type="text" placeholder="Farm Location" className="input" value={formData.farmDetails.farmLocation} onChange={(e) => handleChange(e, "farmDetails", "farmLocation")} required />
                <input type="number" placeholder="Farm Size" className="input" value={formData.farmDetails.farmSize} onChange={(e) => handleChange(e, "farmDetails", "farmSize")} required />
                <select className="input" value={formData.farmDetails.farmType} onChange={(e) => handleChange(e, "farmDetails", "farmType")}>
                    <option value="organic">Organic</option>
                    <option value="conventional">Conventional</option>
                    <option value="mixed">Mixed</option>
                </select>
                <input type="text" placeholder="Crops Grown (comma separated)" className="input" value={formData.farmDetails.cropsGrown.join(", ")} onChange={(e) => handleArrayChange(e, "farmDetails", "cropsGrown")} />
                <input type="text" placeholder="Livestock (comma separated)" className="input" value={formData.farmDetails.livestock.join(", ")} onChange={(e) => handleArrayChange(e, "farmDetails", "livestock")} />
                
                {/* Resource Accessibility */}
                <h2 className="text-xl font-semibold">Resource Accessibility</h2>
                <select className="input" value={formData.resourceAccessibility.accessToWater} onChange={(e) => handleChange(e, "resourceAccessibility", "accessToWater")}>
                    <option value="adequate">Adequate</option>
                    <option value="limited">Limited</option>
                    <option value="scarce">Scarce</option>
                </select>
                <label>
                    <input type="checkbox" checked={formData.resourceAccessibility.electricityAvailability} onChange={(e) => handleChange(e, "resourceAccessibility", "electricityAvailability")} />
                    Electricity Available
                </label>
                <input type="text" placeholder="Farming Tools (comma separated)" className="input" value={formData.resourceAccessibility.accessToFarmingTools.join(", ")} onChange={(e) => handleArrayChange(e, "resourceAccessibility", "accessToFarmingTools")} />
                
                <button type="submit" className="btn">Submit</button>
            </form>
        </div>
    );
};

export default ProfileSetup;
