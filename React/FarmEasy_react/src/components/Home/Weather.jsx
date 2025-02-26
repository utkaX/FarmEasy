import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";

const Weather = () => {
    const [city, setCity] = useState("");
    const [lat, setLat] = useState(null);
    const [lon, setLon] = useState(null);
    const [weather, setWeather] = useState(null);
    const [rainProbability, setRainProbability] = useState(null);
    const [aqi, setAqi] = useState(null);
    const [pollutants, setPollutants] = useState(null);
    const API_KEY = "1aaff7cfd3e5670154e1d498adaddae6";

    const user = useSelector((state) => state.auth.user);

    useEffect(() => {
        if (!user) return;
        fetch(`http://localhost:5000/farmer/getByUser/${user?.id}`)
            .then((response) => response.json())
            .then((data) => {
                if (data[0]?.personalDetails?.address?.city) {
                    setCity(data[0].personalDetails.address.city);
                }
            })
            .catch((error) => console.error("Error fetching farmer data:", error));
    }, [user]);

    useEffect(() => {
        if (!city) return;
        fetch(
            `https://api.openweathermap.org/geo/1.0/direct?q=${encodeURIComponent(
                city
            )}&limit=1&appid=${API_KEY}`
        )
            .then((response) => response.json())
            .then((data) => {
                if (data.length > 0) {
                    setLat(data[0].lat);
                    setLon(data[0].lon);
                }
            })
            .catch((error) => console.error("Error fetching geolocation data:", error));
    }, [city]);

    useEffect(() => {
        if (lat === null || lon === null) return;

        fetch(
            `https://api.openweathermap.org/data/2.5/forecast?lat=${lat}&lon=${lon}&appid=${API_KEY}&units=metric`
        )
            .then((response) => response.json())
            .then((data) => {
                if (data.list.length > 0) {
                    setWeather(data.list[0]);
                    setRainProbability(data.list[0].pop * 100);
                }
            })
            .catch((error) => console.error("Error fetching weather forecast:", error));

        fetch(
            `https://api.openweathermap.org/data/2.5/air_pollution?lat=${lat}&lon=${lon}&appid=${API_KEY}`
        )
            .then((response) => response.json())
            .then((data) => {
                if (data.list.length > 0) {
                    setAqi(data.list[0].main.aqi);
                    setPollutants(data.list[0].components);
                }
            })
            .catch((error) => console.error("Error fetching air quality data:", error));
    }, [lat, lon]);

    const getAqiStatus = (aqi) => {
        switch (aqi) {
            case 1:
                return { status: "Good", color: "bg-green-500" };
            case 2:
                return { status: "Fair", color: "bg-yellow-400" };
            case 3:
                return { status: "Moderate", color: "bg-orange-500" };
            case 4:
                return { status: "Poor", color: "bg-red-500" };
            case 5:
                return { status: "Very Poor", color: "bg-purple-600" };
            default:
                return { status: "Unknown", color: "bg-gray-500" };
        }
    };

    return (
        <div className="h-screen flex items-center justify-center bg-gradient-to-br from-green-200 via-blue-100 to-yellow-200 p-6">
            <div className="bg-white bg-opacity-80 backdrop-blur-md border border-gray-200 rounded-xl shadow-lg p-8 w-full max-w-lg text-center transition-all duration-300 transform hover:scale-105">
                <h2 className="text-2xl font-semibold text-gray-700 drop-shadow-md">
                    Farm Weather & Air Quality
                </h2>
                <p className="text-lg text-gray-600 mt-2 font-medium">
                    {city || "Loading..."}
                </p>
                <p className="text-gray-500 text-sm">
                    Lat: {lat ?? "Loading..."} | Lon: {lon ?? "Loading..."}
                </p>

                {!weather ? (
                    // Shimmer UI for Weather Loading
                    <div className="mt-6 p-5 rounded-xl shadow-md bg-gray-50 border border-gray-300 animate-pulse">
                        <div className="h-6 w-40 bg-gray-300 rounded mx-auto mb-2"></div>
                        <div className="h-4 w-32 bg-gray-300 rounded mx-auto mb-2"></div>
                        <div className="h-4 w-24 bg-gray-300 rounded mx-auto mb-2"></div>
                        <div className="h-12 w-12 bg-gray-300 rounded-full mx-auto"></div>
                    </div>
                ) : (
                    <div className="mt-6 p-5 rounded-xl shadow-md bg-gray-50 border border-gray-300">
                        <h3 className="text-lg font-medium text-gray-700">Current Weather</h3>
                        <p className="text-md">
                            <strong>Temp:</strong> {weather.main.temp}°C
                        </p>
                        <p>
                            <strong>Feels Like:</strong> {weather.main.feels_like}°C
                        </p>
                        <p>
                            <strong>Humidity:</strong> {weather.main.humidity}%
                        </p>
                        <p>
                            <strong>Condition:</strong> {weather.weather[0].main} -{" "}
                            {weather.weather[0].description}
                        </p>
                        <p>
                            <strong>Wind Speed:</strong> {weather.wind.speed} m/s
                        </p>
                        <p>
                            <strong>Rain Chance:</strong> {rainProbability?.toFixed(1)}%
                        </p>
                        <div className="relative w-16 h-16 mx-auto mt-4">
                            {/* Gradient Background */}
                            <div className="absolute inset-0 bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 rounded-full opacity-60"></div>

                            {/* Weather Icon */}
                            <img
                                src={`https://openweathermap.org/img/wn/${weather.weather[0].icon}@2x.png`}
                                alt={weather.weather[0].description}
                                className="relative w-14 h-14 mx-auto z-10"
                            />
                        </div>
                    </div>
                )}

                {!aqi ? (
                    // Shimmer UI for AQI Loading
                    <div className="mt-6 p-5 rounded-xl shadow-md bg-gray-50 border border-gray-300 animate-pulse">
                        <div className="h-6 w-32 bg-gray-300 rounded mx-auto mb-2"></div>
                        <div className="h-4 w-24 bg-gray-300 rounded mx-auto mb-2"></div>
                    </div>
                ) : (
                    <div className="mt-6 p-5 rounded-xl shadow-md bg-gray-50 border border-gray-300">
                        <h3 className="text-lg font-medium text-gray-700">Air Quality</h3>
                        <p
                            className={`text-md mt-2 p-2 rounded-lg ${getAqiStatus(aqi).color} text-white font-medium`}
                        >
                            <strong>AQI:</strong> {aqi} - {getAqiStatus(aqi).status}
                        </p>
                        {pollutants && (
                            <div className="mt-3 text-sm text-gray-700">
                                <p><strong>PM2.5:</strong> {pollutants.pm2_5} μg/m³</p>
                                <p><strong>PM10:</strong> {pollutants.pm10} μg/m³</p>
                                <p><strong>CO:</strong> {pollutants.co} μg/m³</p>
                                <p><strong>NO2:</strong> {pollutants.no2} μg/m³</p>
                                <p><strong>SO2:</strong> {pollutants.so2} μg/m³</p>
                                <p><strong>O3:</strong> {pollutants.o3} μg/m³</p>
                            </div>
                        )}
                    </div>
                )}
            </div>
        </div>
    );
};

export default Weather;
