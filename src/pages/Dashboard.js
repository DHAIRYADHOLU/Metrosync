import React, { useState } from "react";
import {
  GoogleMap,
  LoadScript,
  DirectionsRenderer,
} from "@react-google-maps/api";
import MetrosyncLogo from "./assets/MetrosyncLogo.png";
import MenuOpenIcon from "@mui/icons-material/MenuOpen";
import GpsFixedIcon from "@mui/icons-material/GpsFixed";

// Import MUI Icons
import DirectionsBusIcon from "@mui/icons-material/DirectionsBus";
import DirectionsCarIcon from "@mui/icons-material/DirectionsCar";
import DirectionsWalkIcon from "@mui/icons-material/DirectionsWalk";
import TransferWithinAStationIcon from "@mui/icons-material/TransferWithinAStation";

const Dashboard = () => {
  const [startAddress, setStartAddress] = useState("");
  const [endAddress, setEndAddress] = useState("");
  const [directions, setDirections] = useState(null);
  const [distance, setDistance] = useState(null);
  const [duration, setDuration] = useState(null);
  const [steps, setSteps] = useState([]); // Added state to hold step-by-step directions
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [travelMode, setTravelMode] = useState("TRANSIT"); // Default mode is Bus

  // Fetch current location and convert to address with high accuracy
  const fetchCurrentLocation = () => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const { latitude, longitude } = position.coords;
          const geocoder = new window.google.maps.Geocoder();
          const latLng = { lat: latitude, lng: longitude };

          geocoder.geocode({ location: latLng }, (results, status) => {
            if (status === "OK" && results[0]) {
              setStartAddress(results[0].formatted_address); // Set address in input
            } else {
              alert("Could not fetch address for the current location.");
            }
          });
        },
        (error) => {
          alert(`Failed to get current location: ${error.message}`);
        },
        {
          enableHighAccuracy: true, // Enable high accuracy GPS
          timeout: 10000, // Timeout after 10 seconds
          maximumAge: 0, // No cached location data
        }
      );
    } else {
      alert("Geolocation is not supported by this browser.");
    }
  };

  const handleGo = () => {
    if (startAddress && endAddress) {
      const directionsService = new window.google.maps.DirectionsService();

      const request = {
        origin: startAddress,
        destination: endAddress,
        travelMode:
          travelMode === "TRANSIT"
            ? window.google.maps.TravelMode.TRANSIT
            : travelMode === "DRIVING"
            ? window.google.maps.TravelMode.DRIVING
            : window.google.maps.TravelMode.WALKING, // Select mode based on choice
        ...(travelMode === "TRANSIT" && {
          transitOptions: {
            modes: ["BUS", "SUBWAY"], // Specify transit options for buses and subways
          },
        }),
      };

      directionsService.route(request, (result, status) => {
        if (status === window.google.maps.DirectionsStatus.OK) {
          setDirections(result);
          const route = result.routes[0].legs[0];
          setDistance((route.distance.value / 1000).toFixed(2)); // Convert meters to kilometers
          setDuration((route.duration.value / 60).toFixed(2)); // Convert seconds to minutes
          setSteps(route.steps); // Set step-by-step directions
        } else {
          console.error("Directions request failed due to " + status);
          alert("No route found. Please check your start and end addresses.");
        }
      });
    } else {
      alert("Please enter valid start and end addresses.");
    }
  };

  const mapContainerStyle = {
    width: "100%",
    height: "100%",
  };

  const center = { lat: 43.7, lng: -79.4 }; // Toronto

  // Define polyline styles based on travel mode
  const getPolylineOptions = () => {
    switch (travelMode) {
      case "TRANSIT":
        return {
          strokeColor: "#FF0000", // Red color for Bus
          strokeOpacity: 0.8,
          strokeWeight: 6,
        };
      case "DRIVING":
        return {
          strokeColor: "#0000FF", // Blue color for Car
          strokeOpacity: 0.8,
          strokeWeight: 6,
        };
      case "WALKING":
        return {
          strokeColor: "#03fc0f", // Green color for Walking
          strokeOpacity: 0.8,
          strokeWeight: 6,
          strokeDashArray: [1, 1], // Dotted line for Walking
        };
      default:
        return {};
    }
  };

  return (
    <div className="flex h-screen bg-gray-900 text-white">
      {/* Left Sidebar */}
      <div
        className={`${
          sidebarOpen ? "w-1/4" : "w-0"
        } bg-mgray p-4 transition-all duration-300 ease-in-out h-screen overflow-y-auto hide-scrollbars`} // Added h-screen and overflow-y-auto
      >
        <MenuOpenIcon
          className="cursor-pointer mr-6"
          onClick={() => setSidebarOpen(!sidebarOpen)}
        />
        {sidebarOpen && (
          <div>
            <div className="flex items-center mt-2 mb-4">
              <img
                src={MetrosyncLogo}
                alt="Metrosync Logo"
                className="w-14 h-14 mr-2"
              />
              <h2 className="text-xl font-semibold">Metrosync</h2>
            </div>
            <div className="relative w-full mb-10">
              <input
                type="text"
                placeholder="From"
                value={startAddress}
                onChange={(e) => setStartAddress(e.target.value)}
                className="w-full px-4 py-2 border border-green-400 rounded-lg bg-transparent focus:outline-none text-white"
              />
              <GpsFixedIcon
                className="absolute right-4 top-1/2 transform -translate-y-1/2 cursor-pointer text-white"
                onClick={fetchCurrentLocation}
              />
            </div>
            <input
              type="text"
              placeholder="Destination"
              value={endAddress}
              onChange={(e) => setEndAddress(e.target.value)}
              className="w-full px-4 py-2 border border-red-400 rounded-lg bg-transparent focus:outline-none text-white"
            />

            {/* Travel Mode Icons */}
            <div className="flex justify-around mt-4">
              <DirectionsBusIcon
                onClick={() => setTravelMode("TRANSIT")}
                className={`cursor-pointer text-white ${
                  travelMode === "TRANSIT" ? "text-green-400" : "text-white"
                }`}
                fontSize="large"
              />
              <DirectionsCarIcon
                onClick={() => setTravelMode("DRIVING")}
                className={`cursor-pointer text-white ${
                  travelMode === "DRIVING" ? "text-green-400" : "text-white"
                }`}
                fontSize="large"
              />
              <DirectionsWalkIcon
                onClick={() => setTravelMode("WALKING")}
                className={`cursor-pointer text-white ${
                  travelMode === "WALKING" ? "text-green-400" : "text-white"
                }`}
                fontSize="large"
              />
            </div>

            <button
              onClick={handleGo}
              className="w-full flex items-center justify-center bg-transparent border border-blue-400 rounded-lg focus:outline-none text-white py-2 mt-10"
            >
              Go
            </button>
            {distance && duration && (
              <div className="mt-10 pt-2 pb-2 pl-4 pr-4 bg-mlightgray">
                <p>Distance: {distance} km</p>
                <p>Estimated Time: {duration} mins</p>

                {/* Step-by-step Directions */}
                <div className="mt-10">
                  {steps.length > 0 &&
                    steps.map((step, index) => (
                      <div
                        key={index}
                        className="flex items-center my-4 p-2 bg-gray-800 rounded-lg"
                      >
                        {/* Show relevant icons based on the type of step */}
                        {step.travel_mode === "WALKING" && (
                          <DirectionsWalkIcon className="text-green-400 mr-4" />
                        )}
                        {step.travel_mode === "TRANSIT" && (
                          <DirectionsBusIcon className="text-yellow-400 mr-4" />
                        )}
                        {step.transit && step.transit.line && (
                          <span className="text-white">
                            {step.transit.line.vehicle.name} #
                            {step.transit.line.short_name}
                          </span>
                        )}
                        <span className="text-gray-300 ml-4">
                          {step.instructions}
                        </span>

                        {step.transit && step.transit.num_stops > 1 && (
                          <span className="text-gray-400 ml-2">
                            ({step.transit.num_stops} stops)
                          </span>
                        )}
                      </div>
                    ))}
                </div>
              </div>
            )}
          </div>
        )}
      </div>
      {/* Google Map */}
      <div className="flex-grow p-4">
        <LoadScript googleMapsApiKey="AIzaSyCn3eXSLyVnjmy_RcstFLDGA9gjVeLhW0s">
          <GoogleMap
            mapContainerStyle={mapContainerStyle}
            center={center}
            zoom={12}
          >
            {directions && (
              <DirectionsRenderer
                directions={directions}
                options={{ polylineOptions: getPolylineOptions() }}
              />
            )}
          </GoogleMap>
        </LoadScript>
      </div>
    </div>
  );
};

export default Dashboard;