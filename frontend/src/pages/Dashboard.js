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

const Dashboard = () => {
  const [startAddress, setStartAddress] = useState("");
  const [endAddress, setEndAddress] = useState("");
  const [directions, setDirections] = useState(null);
  const [distance, setDistance] = useState(null);
  const [duration, setDuration] = useState(null);
  const [steps, setSteps] = useState([]);
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [travelMode, setTravelMode] = useState("TRANSIT");
  const [startSuggestions, setStartSuggestions] = useState([]);
  const [destinationSuggestions, setDestinationSuggestions] = useState([]);

  const decodeHtmlEntities = (text) => {
    const textarea = document.createElement("textarea");
    textarea.innerHTML = text;
    return textarea.value;
  };

  const fetchCurrentLocation = () => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const { latitude, longitude } = position.coords;
          const geocoder = new window.google.maps.Geocoder();
          const latLng = { lat: latitude, lng: longitude };

          geocoder.geocode({ location: latLng }, (results, status) => {
            if (status === "OK" && results[0]) {
              setStartAddress(results[0].formatted_address);
            } else {
              alert("Could not fetch address for the current location.");
            }
          });
        },
        (error) => {
          alert(`Failed to get current location: ${error.message}`);
        },
        {
          enableHighAccuracy: true,
          timeout: 10000,
          maximumAge: 0,
        }
      );
    } else {
      alert("Geolocation is not supported by this browser.");
    }
  };

  const handleStartAddressChange = (e) => {
    const inputValue = e.target.value;
    setStartAddress(inputValue);

    if (inputValue.length > 2) {
      const service = new window.google.maps.places.AutocompleteService();
      service.getPlacePredictions(
        { input: inputValue },
        (predictions, status) => {
          if (status === window.google.maps.places.PlacesServiceStatus.OK) {
            setStartSuggestions(predictions);
          } else {
            setStartSuggestions([]);
          }
        }
      );
    } else {
      setStartSuggestions([]);
    }
  };

  const handleDestinationChange = (e) => {
    const inputValue = e.target.value;
    setEndAddress(inputValue);

    if (inputValue.length > 2) {
      const service = new window.google.maps.places.AutocompleteService();
      service.getPlacePredictions(
        { input: inputValue },
        (predictions, status) => {
          if (status === window.google.maps.places.PlacesServiceStatus.OK) {
            setDestinationSuggestions(predictions);
          } else {
            setDestinationSuggestions([]);
          }
        }
      );
    } else {
      setDestinationSuggestions([]);
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
            : window.google.maps.TravelMode.WALKING,
        ...(travelMode === "TRANSIT" && {
          transitOptions: {
            modes: ["BUS", "SUBWAY"],
          },
        }),
      };

      directionsService.route(request, (result, status) => {
        if (status === window.google.maps.DirectionsStatus.OK) {
          setDirections(result);
          const route = result.routes[0].legs[0];
          setDistance((route.distance.value / 1000).toFixed(2));
          setDuration((route.duration.value / 60).toFixed(2));
          setSteps(route.steps);
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

  const center = { lat: 43.7, lng: -79.4 };

  const getPolylineOptions = () => {
    switch (travelMode) {
      case "TRANSIT":
        return {
          strokeColor: "#FF0000",
          strokeOpacity: 0.8,
          strokeWeight: 6,
        };
      case "DRIVING":
        return {
          strokeColor: "#0000FF",
          strokeOpacity: 0.8,
          strokeWeight: 6,
        };
      case "WALKING":
        return {
          strokeColor: "#03fc0f",
          strokeOpacity: 0.8,
          strokeWeight: 6,
          strokeDashArray: [1, 1],
        };
      default:
        return {};
    }
  };

  const darkModeStyle = [
    { elementType: "geometry", stylers: [{ color: "#212121" }] },
    { elementType: "labels.icon", stylers: [{ visibility: "off" }] },
    { elementType: "labels.text.fill", stylers: [{ color: "#757575" }] },
    { elementType: "labels.text.stroke", stylers: [{ color: "#212121" }] },
    {
      featureType: "administrative",
      elementType: "geometry",
      stylers: [{ color: "#757575" }],
    },
    {
      featureType: "administrative.country",
      elementType: "labels.text.fill",
      stylers: [{ color: "#9e9e9e" }],
    },
    {
      featureType: "administrative.land_parcel",
      stylers: [{ visibility: "off" }],
    },
    {
      featureType: "administrative.locality",
      elementType: "labels.text.fill",
      stylers: [{ color: "#bdbdbd" }],
    },
    {
      featureType: "poi",
      elementType: "labels.text.fill",
      stylers: [{ color: "#757575" }],
    },
    {
      featureType: "poi.park",
      elementType: "geometry",
      stylers: [{ color: "#181818" }],
    },
    {
      featureType: "poi.park",
      elementType: "labels.text.fill",
      stylers: [{ color: "#616161" }],
    },
    {
      featureType: "poi.park",
      elementType: "labels.text.stroke",
      stylers: [{ color: "#1b1b1b" }],
    },
    {
      featureType: "road",
      elementType: "geometry.fill",
      stylers: [{ color: "#2c2c2c" }],
    },
    {
      featureType: "road",
      elementType: "labels.text.fill",
      stylers: [{ color: "#8a8a8a" }],
    },
    {
      featureType: "road.arterial",
      elementType: "geometry",
      stylers: [{ color: "#373737" }],
    },
    {
      featureType: "road.highway",
      elementType: "geometry",
      stylers: [{ color: "#3c3c3c" }],
    },
    {
      featureType: "road.highway.controlled_access",
      elementType: "geometry",
      stylers: [{ color: "#4e4e4e" }],
    },
    {
      featureType: "road.local",
      elementType: "labels.text.fill",
      stylers: [{ color: "#616161" }],
    },
    {
      featureType: "transit",
      elementType: "labels.text.fill",
      stylers: [{ color: "#757575" }],
    },
    {
      featureType: "water",
      elementType: "geometry",
      stylers: [{ color: "#000000" }],
    },
    {
      featureType: "water",
      elementType: "labels.text.fill",
      stylers: [{ color: "#3d3d3d" }],
    },
  ];

  return (
    <div className="flex h-screen bg-gray-900 text-white">
      <div
        className={`${
          sidebarOpen ? "w-1/4" : "w-16"
        } bg-mgray p-4 transition-all duration-300 ease-in-out h-screen overflow-y-auto left-side-nav`}
      >
        <MenuOpenIcon
          className="cursor-pointer"
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
                onChange={handleStartAddressChange}
                className="w-full px-4 py-2 border border-green-400 rounded-lg bg-transparent focus:outline-none text-white"
              />
              <GpsFixedIcon
                className="absolute right-4 top-1/2 transform -translate-y-1/2 cursor-pointer text-white"
                onClick={fetchCurrentLocation}
              />
              {startSuggestions.length > 0 && (
                <ul className="absolute z-10 bg-gray-800 rounded-lg shadow-lg w-full">
                  {startSuggestions.map((suggestion, index) => (
                    <li
                      key={index}
                      className="px-4 py-2 cursor-pointer hover:bg-gray-700"
                      onClick={() => {
                        setStartAddress(suggestion.description);
                        setStartSuggestions([]);
                      }}
                    >
                      {suggestion.description}
                    </li>
                  ))}
                </ul>
              )}
            </div>
            <div className="relative w-full mb-10">
              <input
                type="text"
                placeholder="Destination"
                value={endAddress}
                onChange={handleDestinationChange}
                className="w-full px-4 py-2 border border-red-400 rounded-lg bg-transparent focus:outline-none text-white"
              />
              {destinationSuggestions.length > 0 && (
                <ul className="absolute z-10 bg-gray-800 rounded-lg shadow-lg w-full">
                  {destinationSuggestions.map((suggestion, index) => (
                    <li
                      key={index}
                      className="px-4 py-2 cursor-pointer hover:bg-gray-700"
                      onClick={() => {
                        setEndAddress(suggestion.description);
                        setDestinationSuggestions([]);
                      }}
                    >
                      {suggestion.description}
                    </li>
                  ))}
                </ul>
              )}
            </div>

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
                <div className="mt-10">
                  {steps.length > 0 &&
                    steps.map((step, index) => (
                      <div
                        key={index}
                        className="flex items-center my-4 p-4 bg-gray-800 rounded-lg"
                      >
                        {step.travel_mode === "WALKING" && (
                          <DirectionsWalkIcon className="text-green-400 mr-0.5" />
                        )}
                        {step.travel_mode === "TRANSIT" && (
                          <DirectionsBusIcon className="text-red-700 mr-0.5" />
                        )}
                        {step.transit && step.transit.line && (
                          <span className="text-white">
                            {step.transit.line.vehicle.name} #
                            {step.transit.line.short_name}
                          </span>
                        )}
                        <span
                          className="text-gray-300 ml-4"
                          dangerouslySetInnerHTML={{
                            __html: decodeHtmlEntities(step.instructions),
                          }}
                        ></span>
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
      <div className="flex-grow p-0">
        <LoadScript
          googleMapsApiKey="AIzaSyCn3eXSLyVnjmy_RcstFLDGA9gjVeLhW0s" // Replace with your actual API key
          libraries={["places"]}
        >
          <GoogleMap
            mapContainerStyle={mapContainerStyle}
            center={center}
            zoom={12}
            options={{ styles: darkModeStyle, mapTypeControl: false }}
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
