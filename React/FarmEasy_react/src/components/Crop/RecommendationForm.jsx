import React, { useState } from "react";

const RecommendationForm = () => {
  const [data, setData] = useState({
    N: "",
    P: "",
    K: "",
    temperature: "",
    humidity: "",
    ph: "",
    rainfall: "",
  });

  const [result, setResult] = useState("");

  const handleChange = (e) => {
    setData({ ...data, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    for (const key in data) {
      if (data[key] === "") {
        alert(`Please enter ${key}`);
        return;
      }
    }

    const requestData = {
      N: parseFloat(data.N),
      P: parseFloat(data.P),
      K: parseFloat(data.K),
      temperature: parseFloat(data.temperature),
      humidity: parseFloat(data.humidity),
      ph: parseFloat(data.ph),
      rainfall: parseFloat(data.rainfall),
    };

    try {
      const response = await fetch("http://127.0.0.1:5000/recommend", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(requestData),
      });

      const resData = await response.json();
      setResult(resData.recommended_crop);
    } catch (error) {
      console.log("API Error:", error);
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gradient-to-br from-green-30 to-green-80 px-4">
      <div className="bg-white bg-opacity-90 shadow-2xl rounded-3xl p-8 max-w-lg w-full backdrop-blur-lg border border-gray-200">
        {/* Logo */}
        <div className="flex justify-center">
          <img src="https://cdn-icons-png.flaticon.com/512/2903/2903610.png" alt="Logo" className="h-20 w-20 mb-4" />
        </div>
        
        {/* Title */}
        <h2 className="text-3xl font-bold text-center text-gray-700 mb-6">
          Crop Recommendation 🌱
        </h2>

        {/* Form */}
        <form onSubmit={handleSubmit} className="space-y-5">
          {[
            { name: "N", label: "Nitrogen (kg/ha)" },
            { name: "P", label: "Phosphorus (kg/ha)" },
            { name: "K", label: "Potassium (kg/ha)" },
            { name: "temperature", label: "Temperature (°C)" },
            { name: "humidity", label: "Humidity (%)" },
            { name: "ph", label: "pH (0-14)" },
            { name: "rainfall", label: "Rainfall (mm)" },
          ].map((field) => (
            <div key={field.name} className="relative">
              <input
                name={field.name}
                placeholder=" "
                onChange={handleChange}
                required
                className="w-full px-4 pt-5 pb-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 text-lg bg-transparent"
              />
              <label className="absolute top-2 left-4 text-gray-500 text-sm transition-all pointer-events-none">
                {field.label}
              </label>
            </div>
          ))}

          {/* Submit Button */}
          <button
            type="submit"
            className="w-full bg-green-500 hover:bg-green-600 text-white font-semibold py-3 rounded-lg transition duration-300 transform hover:scale-105 shadow-md"
          >
            Recommend Crop
          </button>
        </form>

        {/* Result */}
        {result && (
          <div className="mt-6 p-4 border-l-4 border-green-600 bg-green-100 text-green-700 rounded-lg shadow-sm">
            <h3 className="text-lg font-semibold">Recommended Crop:</h3>
            <p className="text-2xl font-bold">{result}</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default RecommendationForm;
