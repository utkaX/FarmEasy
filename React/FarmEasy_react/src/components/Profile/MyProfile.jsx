import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";

const MyProfile = () => {
  const user = useSelector((state) => state.auth.user);
  console.log(user)
  const [farmer, setFarmer] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchFarmerProfile = async () => {
      try {
        const response = await fetch(`http://localhost:5000/farmer/getByUser/${user.id}`);
        if (!response.ok) throw new Error("Failed to fetch farmer data");

        const data = await response.json();
        setFarmer(data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchFarmerProfile();
  }, [user.id]);

  if (loading) return <p className="text-center">Loading...</p>;
  if (error) return <p className="text-center text-red-500">{error}</p>;

  return (
    <div className="container mx-auto p-6">
      <h2 className="text-2xl font-bold mb-4">My Profile</h2>

      {farmer && (
        <div className="border p-6 rounded-lg shadow-md bg-white">
          <h3 className="text-xl font-semibold">Personal Details</h3>
          <p><strong>Name:</strong> {farmer.personalDetails.firstName} {farmer.personalDetails.lastName}</p>
          <p><strong>Contact:</strong> {farmer.personalDetails.contactNumber}</p>
          <p><strong>Address:</strong> {farmer.personalDetails.address.city}, {farmer.personalDetails.address.state}, {farmer.personalDetails.address.zipCode}</p>

          <h3 className="text-xl font-semibold mt-4">Farm Details</h3>
          <p><strong>Farm Name:</strong> {farmer.farmDetails.farmName}</p>
          <p><strong>Location:</strong> {farmer.farmDetails.farmLocation}</p>
          <p><strong>Size:</strong> {farmer.farmDetails.farmSize} acres</p>
          <p><strong>Type:</strong> {farmer.farmDetails.farmType}</p>

          <h3 className="text-xl font-semibold mt-4">Resource Accessibility</h3>
          <p><strong>Water Access:</strong> {farmer.resourceAccessibility.accessToWater}</p>
          <p><strong>Electricity:</strong> {farmer.resourceAccessibility.electricityAvailability ? "Available" : "Not Available"}</p>
        </div>
      )}
    </div>
  );
};

export default MyProfile;
