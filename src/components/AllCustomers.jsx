import React, { useEffect, useState } from "react";
import axios from "axios";
import { Map, Marker, ZoomControl } from "pigeon-maps";
import { osm } from "pigeon-maps/providers";
import { CircularProgress } from "@mui/material";

const AllCustomers = () => {
  const [services, setServices] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [center, setCenter] = useState([0, 0]); // Default map center
  const [zoom, setZoom] = useState(8); // Default zoom level

  // Fetch approved services
  const fetchApprovedServices = async () => {
    setLoading(true);
    try {
      const response = await axios.get(
        "https://uga-cycle-backend-1.onrender.com/services/approved"
      );
      const fetchedServices = response.data.services;

      // Update state with fetched services
      setServices(fetchedServices);

      // Set the map center to the average of all the locations
      if (fetchedServices.length > 0) {
        const averageLat =
          fetchedServices.reduce(
            (acc, service) => acc + service.location.latitude,
            0
          ) / fetchedServices.length;
        const averageLng =
          fetchedServices.reduce(
            (acc, service) => acc + service.location.longitude,
            0
          ) / fetchedServices.length;
        setCenter([averageLat, averageLng]);
      }
    } catch (err) {
      setError("No approved services.");
      console.error("Error fetching approved services:", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    // Initial fetch when component mounts
    fetchApprovedServices();

    // Set interval to fetch data every 10 seconds
    const intervalId = setInterval(fetchApprovedServices, 3000);

    // Cleanup the interval when the component unmounts
    return () => clearInterval(intervalId);
  }, []); // Run only once on mount

  if (error) {
    return <div style={styles.error}>{error}</div>;
  }

  return (
    <div style={styles.container}>
      <Map height={500} provider={osm} center={center} zoom={zoom}>
        {services.map((service) => (
          <Marker
            key={service.id}
            width={50}
            anchor={[service.location.latitude, service.location.longitude]}
            color={"teal"}
          >
            {/* <div style={styles.marker}>
              <p style={styles.markerText}>{service.fullName}</p>
            </div> */}
          </Marker>
        ))}
        <ZoomControl />
      </Map>
    </div>
  );
};

const styles = {
  container: {
    fontFamily: "Arial, sans-serif",
    backgroundColor: "whitesmoke",
    padding: "20px",
    textAlign: "center",
    top: -20,
  },
  heading: {
    fontSize: "2rem",
    color: "#3b6d3b",
    marginBottom: "20px",
  },
  loading: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    height: "100vh",
  },
  error: {
    color: "red",
    fontSize: "1.2rem",
    textAlign: "center",
  },
  marker: {
    backgroundColor: "teal",
    padding: "5px 10px",
    borderRadius: "10px",
    color: "white",
    fontSize: "14px",
  },
  markerText: {
    margin: 0,
  },
};

export default AllCustomers;
