import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

const ProfileSetup = () => {
  const { register, handleSubmit } = useForm();
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const user = useSelector((state) => state.auth.user);
  const userId = user?.id;

  const uploadLogo = async (file) => {
    const formData = new FormData();
    formData.append("file", file);
    formData.append("upload_preset", "FarmEasy");
    formData.append("cloud_name", "dapq3qeao");

    try {
      const response = await fetch(
        "https://api.cloudinary.com/v1_1/dapq3qeao/image/upload",
        { method: "POST", body: formData }
      );
      const data = await response.json();
      return data.secure_url;
    } catch (error) {
      console.error("Error uploading logo:", error);
      return null;
    }
  };

  const onSubmit = async (data) => {
    if (!userId) {
      console.error("User ID not found. Please log in.");
      return;
    }

    setLoading(true);
    let logoUrl = data.businessProfile.logo[0]
      ? await uploadLogo(data.businessProfile.logo[0])
      : null;

    const requestData = {
      userId,
      businessInfo: {
        businessName: data.businessInfo.businessName,
        gstNumber: data.businessInfo.gstNumber,
        businessCategory: data.businessInfo.businessCategory,
        businessEmail: data.businessInfo.businessEmail,
      },
      contactInfo: {
        contactNumber: data.contactInfo.contactNumber,
        businessEmail: data.contactInfo.businessEmail,
        businessAddress: {
          street: data.contactInfo.businessAddress.street,
          city: data.contactInfo.businessAddress.city,
          state: data.contactInfo.businessAddress.state,
          zipCode: data.contactInfo.businessAddress.zipCode,
        },
      },
      businessProfile: {
        logo: logoUrl,
        websiteUrl: data.businessProfile.websiteUrl,
        socialMediaLinks: {
          facebook: data.businessProfile.socialMediaLinks.facebook,
          twitter: data.businessProfile.socialMediaLinks.twitter,
          instagram: data.businessProfile.socialMediaLinks.instagram,
        },
      },
    };

    try {
      const response = await fetch("http://localhost:5000/seller/create", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(requestData),
      });

      if (response.ok) {
        navigate("/seller");
      }

      const responseData = await response.json();
      console.log("Seller profile created successfully:", responseData);
    } catch (error) {
      console.error("Error submitting form:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-3xl mx-auto bg-white shadow-lg rounded-xl p-8 mt-10">
      <h1 className="text-3xl font-bold text-gray-800 mb-6 text-center">
        Setup Your Business Profile
      </h1>
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
        
        {/* Business Information */}
        <div className="border-b pb-4">
          <h2 className="text-xl font-semibold text-gray-700 mb-3">Business Information</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <input
              className="input"
              {...register("businessInfo.businessName")}
              placeholder="Business Name"
              required
            />
            <input
              className="input"
              {...register("businessInfo.gstNumber")}
              placeholder="GST Number"
              required
            />
            <select className="input" {...register("businessInfo.businessCategory")} required>
              <option value="Retail">Retail</option>
              <option value="Wholesale">Wholesale</option>
              <option value="Service">Service</option>
            </select>
            <input
              className="input"
              {...register("businessInfo.businessEmail")}
              placeholder="Business Email"
              required
            />
          </div>
        </div>

        {/* Contact Information */}
        <div className="border-b pb-4">
          <h2 className="text-xl font-semibold text-gray-700 mb-3">Contact Information</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <input
              className="input"
              {...register("contactInfo.contactNumber")}
              placeholder="Contact Number"
              required
            />
            <input
              className="input"
              {...register("contactInfo.businessEmail")}
              placeholder="Business Email"
              required
            />
            <input
              className="input"
              {...register("contactInfo.businessAddress.street")}
              placeholder="Street"
              required
            />
            <input
              className="input"
              {...register("contactInfo.businessAddress.city")}
              placeholder="City"
              required
            />
            <input
              className="input"
              {...register("contactInfo.businessAddress.state")}
              placeholder="State"
              required
            />
            <input
              className="input"
              {...register("contactInfo.businessAddress.zipCode")}
              placeholder="Zip Code"
              required
            />
          </div>
        </div>

        {/* Business Profile */}
        <div>
          <h2 className="text-xl font-semibold text-gray-700 mb-3">Business Profile</h2>
          <div className="space-y-3">
            <label className="text-gray-600">Upload Logo</label>
            <input type="file" {...register("businessProfile.logo")} className="file-input" />
            <input
              className="input"
              {...register("businessProfile.websiteUrl")}
              placeholder="Website URL"
            />
            <input
              className="input"
              {...register("businessProfile.socialMediaLinks.facebook")}
              placeholder="Facebook"
            />
            <input
              className="input"
              {...register("businessProfile.socialMediaLinks.twitter")}
              placeholder="Twitter"
            />
            <input
              className="input"
              {...register("businessProfile.socialMediaLinks.instagram")}
              placeholder="Instagram"
            />
          </div>
        </div>

        {/* Submit Button */}
        <button
          type="submit"
          className="w-full bg-blue-600 text-white font-semibold py-3 rounded-lg hover:bg-blue-700 transition duration-200"
          disabled={loading}
        >
          {loading ? "Submitting..." : "Submit"}
        </button>
      </form>
    </div>
  );
};

export default ProfileSetup;
