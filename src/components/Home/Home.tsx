import React, { useState, useEffect } from "react";
import axios from "axios";


const HomePage = () => {
  interface WeatherData {
    name?: string;
    main?: {
      temp?: number;
    };
    weather?: {
      description?: string;
    }[];
    wind?: {
      speed?: number;
    };
  }

  const [weather, setWeather] = useState<WeatherData | null>(null);
  const [mapCenter, setMapCenter] = useState({ lat: 0, lng: 0 });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    // Fetch weather data based on device's location
    navigator.geolocation.getCurrentPosition(async (position) => {
      const { latitude, longitude } = position.coords;
      setMapCenter({ lat: latitude, lng: longitude });

      try {
        const apiKey = "e57086b3785ecdbe574d0e234497d9c9";
        const response = await axios.get(
          `https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&appid=${apiKey}&units=metric`
        );
        setWeather(response.data);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching weather data:", error);
        setError("Failed to fetch weather data. Please try again later.");
        setLoading(false);
      }
    });
  }, []);

  return (
    <div className="container mx-auto px-4 py-8 bg-gray-100">
      {loading ? (
        <p>Loading...</p>
      ) : (
        <div className="flex flex-col items-center justify-center text-center">
          {error ? (
            <p className="text-red-500">{error}</p>
          ) : (
            <>
              <div className="weather-details flex flex-col items-center mt-4 w-full">
                <div className="bg-white shadow-md rounded p-4 mb-4">
                  <h1 className="text-3xl font-bold mb-4 text-gray-800">Weather Forecast for {weather?.name}</h1>
                  <p className="text-lg mb-2">
                    Temperature: {weather?.main?.temp}°C
                  </p>
                  <p className="text-lg mb-2">
                    Description: {weather?.weather?.[0]?.description}
                  </p>
                  <p className="text-lg">
                    Wind Speed: {weather?.wind?.speed} m/s
                  </p>
                </div>
              </div>
              <div className="map-container w-full">
                {/* Display map covering whole width of the page */}
                <iframe src="https://public.opendatasoft.com/explore/embed/dataset/geonames-all-cities-with-a-population-1000/map/?disjunctive.cou_name_en&sort=name&location=2,-13.94047,-6.53906&basemap=jawg.light&static=true&datasetcard=false&scrollWheelZoom=true" width="100%" height="400"></iframe>
              </div>
            </>
          )}
        </div>
      )}
    </div>
  );
};

export default HomePage;
