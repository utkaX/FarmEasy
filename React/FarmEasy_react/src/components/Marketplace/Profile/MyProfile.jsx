import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";

const MyProfile = () => {
  const [seller, setSeller] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  
  const user = useSelector((state) => state.auth.user);
  const userId = user?.id;

  useEffect(() => {
    const fetchSeller = async () => {
      if (!userId) return;
      try {
        const response = await fetch(`http://localhost:5000/seller/getbyuser/${userId}`);
        if (!response.ok) {
          throw new Error("Failed to fetch seller details");
        }
        const data = await response.json();
        setSeller(data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchSeller();
  }, [userId]);

  if (loading) {
    return <p className="text-center text-lg font-semibold">Loading seller details...</p>;
  }

  if (error) {
    return <p className="text-center text-red-500 font-semibold">Error: {error}</p>;
  }

  if (!seller) {
    return <p className="text-center text-gray-500 font-semibold">No seller data found.</p>;
  }

  return (
    <div className="max-w-3xl mx-auto p-6 bg-white shadow-lg rounded-lg border border-gray-200">
      <h2 className="text-2xl font-bold text-center text-gray-800 mb-6">My Profile</h2>

      {/* Business Information */}
      <div className="mb-6">
        <h3 className="text-xl font-semibold text-gray-700 border-b pb-2">Business Information</h3>
        <p className="text-gray-600"><strong>Business Name:</strong> {seller.businessInfo?.businessName || "N/A"}</p>
        <p className="text-gray-600"><strong>GST Number:</strong> {seller.businessInfo?.gstNumber || "N/A"}</p>
        <p className="text-gray-600"><strong>Category:</strong> {seller.businessInfo?.businessCategory || "N/A"}</p>
        <p className="text-gray-600"><strong>Email:</strong> {seller.businessInfo?.businessEmail || "N/A"}</p>
      </div>

      {/* Contact Information */}
      <div className="mb-6">
        <h3 className="text-xl font-semibold text-gray-700 border-b pb-2">Contact Information</h3>
        <p className="text-gray-600"><strong>Contact Number:</strong> {seller.contactInfo?.contactNumber || "N/A"}</p>
        <p className="text-gray-600"><strong>Business Email:</strong> {seller.contactInfo?.businessEmail || "N/A"}</p>
        <p className="text-gray-600">
          <strong>Address:</strong> {seller.contactInfo?.businessAddress
            ? `${seller.contactInfo.businessAddress.street}, ${seller.contactInfo.businessAddress.city}, ${seller.contactInfo.businessAddress.state} - ${seller.contactInfo.businessAddress.zipCode}`
            : "N/A"}
        </p>
      </div>

      {/* Business Profile */}
      <div className="mb-6">
        <h3 className="text-xl font-semibold text-gray-700 border-b pb-2">Business Profile</h3>
        {seller.businessProfile?.logo && (
          <img
            src={seller.businessProfile.logo}
            alt="Business Logo"
            className="w-24 h-24 object-cover rounded-lg shadow-md mb-4"
          />
        )}
        <p className="text-gray-600">
          <strong>Website:</strong> {" "}
          <a href={seller.businessProfile?.websiteUrl} target="_blank" rel="noopener noreferrer" className="text-blue-500 hover:underline">
            {seller.businessProfile?.websiteUrl || "N/A"}
          </a>
        </p>
        <p className="text-gray-600 font-semibold">Social Media:</p>
        <ul className="list-disc pl-5 text-blue-500">
          {seller.businessProfile?.socialMediaLinks?.facebook && (
            <li>
              <a href={seller.businessProfile.socialMediaLinks.facebook} target="_blank" rel="noopener noreferrer" className="hover:underline">
                Facebook
              </a>
            </li>
          )}
          {seller.businessProfile?.socialMediaLinks?.twitter && (
            <li>
              <a href={seller.businessProfile.socialMediaLinks.twitter} target="_blank" rel="noopener noreferrer" className="hover:underline">
                Twitter
              </a>
            </li>
          )}
          {seller.businessProfile?.socialMediaLinks?.instagram && (
            <li>
              <a href={seller.businessProfile.socialMediaLinks.instagram} target="_blank" rel="noopener noreferrer" className="hover:underline">
                Instagram
              </a>
            </li>
          )}
        </ul>
      </div>

      <h3 className="text-xl font-semibold text-gray-700 border-b pb-2">Profile Completion Status</h3>
      <p className="text-gray-600">
        <strong>Is Profile Complete?</strong> {" "}
        {seller.isProfileComplete ? <span className="text-green-600 font-bold">Yes ✅</span> : <span className="text-red-600 font-bold">No ❌</span>}
      </p>
    </div>
  );
};

export default MyProfile;
