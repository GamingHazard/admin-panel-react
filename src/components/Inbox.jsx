// import { CircularProgress } from "@mui/material";
import React, { useEffect, useState } from "react";
import axios from "axios";
import { Map, Marker, ZoomControl, Overlay } from "pigeon-maps";
import { osm } from "pigeon-maps/providers";
import { CircularProgress, Typography } from "@mui/material";

const ServiceCard = ({ service, loadingService, onApprove }) => {
  const isApproved = service.status === "Not Approved";
  const { latitude, longitude } = service.location;
  const [center, setCenter] = useState([latitude, longitude]);
  const [zoom, setZoom] = useState(11);

  return (
    <div style={styles.card}>
      <Typography
        variant="h4"
        gutterBottom
        style={{ borderBottom: "2px solid #4caf50", paddingBottom: "8px" }}
      >
        Inbox from {service.fullName}
      </Typography>
      <p>
        <strong>{service.fullName}</strong> is interested in the company
        services and below are the user info:
      </p>
      <p>
        <strong>Email:</strong> {service.email}
      </p>
      <p>
        <strong>Service Type:</strong> {service.serviceType}
      </p>
      <p>
        <strong>Phone Number:</strong> {service.phoneNumber}
      </p>
      <p>
        <strong>Region:</strong> {service.region}
      </p>
      <p>
        <strong>District:</strong> {service.district}
      </p>
      <p>
        <strong>Registration Type:</strong> {service.registrationType}
      </p>
      <p>
        <strong>Pickup Schedule:</strong> {service.pickupSchedule}
      </p>
      <p>
        <strong>Waste Type:</strong> {service.wasteType}
      </p>
      <p>
        <strong>Service ID:</strong> {service.id}
      </p>
      <p>
        <strong>Date:</strong> {new Date(service.date).toLocaleString()}
      </p>
      <p>
        <strong>Location:</strong> Latitude: {latitude}, Longitude: {longitude}
      </p>
      <Map
        height={300}
        provider={osm}
        center={center}
        zoom={zoom}
        onBoundsChanged={({ center, zoom }) => {
          setCenter(center);
          setZoom(zoom);
        }}
      >
        <Marker
          width={50}
          color={"teal"}
          anchor={[latitude, longitude]}
        ></Marker>
        <ZoomControl />
      </Map>
      <div
        style={styles.approveButton(isApproved, loadingService)}
        onClick={() => !loadingService && onApprove(service.id)}
      >
        {loadingService === service._id ? (
          <CircularProgress size={24} color="warning" />
        ) : (
          <p style={{ color: "white", fontSize: 18, fontWeight: "bold" }}>
            {isApproved ? "Approved" : "Approve"}
          </p>
        )}
      </div>
    </div>
  );
};

const Inbox = () => {
  const [services, setServices] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [loadingService, setLoadingService] = useState(null);
  const organizationName = sessionStorage.getItem("organization");

  const fetchServices = async () => {
    setLoading(true);
    try {
      const response = await axios.get(
        "https://uga-cycle-backend-1.onrender.com/services/not-approved"
      );
      const fetchedServices = response.data.services;

      const filteredServices = fetchedServices.filter(
        (service) => service.company === organizationName
      );
      setServices((prevServices) => {
        const combinedServices = [...filteredServices, ...prevServices];
        const uniqueServices = combinedServices.reduce((acc, current) => {
          if (!acc.some((service) => service.id === current.id)) {
            acc.push(current);
          }
          return acc;
        }, []);
        return uniqueServices;
      });

      // sessionStorage.setItem("services", JSON.stringify(services));
      setError("");
    } catch (err) {
      setError(err.response?.data?.message || "Failed to fetch Inboxes");
      console.error("Error fetching services:", err);
    } finally {
      setLoading(false);
    }
  };

  const handleApprove = async (serviceId) => {
    setLoadingService(serviceId);
    try {
      await axios.put(
        `https://uga-cycle-backend-1.onrender.com/services/${serviceId}/approve`
      );
      setServices((prev) =>
        prev.map((service) =>
          service._id === serviceId
            ? { ...service, status: "Not Approved" }
            : service
        )
      );
      alert("Service approved successfully!");
    } catch (err) {
      console.error("Error approving service:", err);
      alert("Failed to approve service.");
    } finally {
      setLoadingService(null);
    }
  };

  useEffect(() => {
    const savedServices = sessionStorage.getItem("services");
    if (savedServices) {
      const parsedServices = JSON.parse(savedServices).filter(
        (service) => service.company === organizationName
      );
      setServices(parsedServices);
      setLoading(false);
    }

    fetchServices();

    const interval = setInterval(fetchServices, 3000);
    return () => clearInterval(interval);
  }, []);

  // if (loading) return <div style={styles.loading}>Loading services...</div>;
  if (error) return <div style={styles.error}>Sorry: {error}</div>;

  return (
    <div style={styles.container}>
      <div style={styles.header}>
        {/* <h2 style={{ textAlign: "center", color: "#3b6d3b" }}>Inbox</h2> */}
        {/* {loading && <CircularProgress size={24} style={styles.spinner} />} */}
      </div>
      {services.length === 0 ? (
        <p style={styles.noServices}>No services found.</p>
      ) : (
        services.map((service) => (
          <ServiceCard
            key={service.id}
            service={service}
            loadingService={loadingService}
            onApprove={handleApprove}
          />
        ))
      )}
    </div>
  );
};

const styles = {
  profileImage: {
    width: 40,
    height: 40,
    borderRadius: 20,
    marginRight: 10,
  },
  container: {
    fontFamily: "Arial, sans-serif",
    backgroundColor: "whitesmoke",
    flex: 1,
    padding: "20px",
  },
  header: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    marginBottom: "20px",
  },
  loading: {
    textAlign: "center",
    color: "#007bff",
    fontSize: "1.5rem",
  },
  error: {
    textAlign: "center",
    color: "red",
    fontSize: "1.2rem",
    height: 200,
    padding: 50,
  },
  noServices: {
    textAlign: "center",
    fontSize: "1rem",
    color: "#555",
  },
  card: {
    width: "90%",
    backgroundColor: "white",
    padding: "15px",
    borderRadius: "10px",
    marginBottom: "15px",
    boxShadow: "0 2px 5px rgba(0, 0, 0, 0.1)",
  },
  approveButton: (isApproved, loading) => ({
    textAlign: "center",
    alignSelf: "center",
    padding: 15,
    backgroundColor: isApproved ? "green" : "teal",
    borderRadius: "10px",
    cursor: loading ? "not-allowed" : "pointer",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
  }),
  spinner: {
    marginLeft: "10px",
  },
};

export default Inbox;
