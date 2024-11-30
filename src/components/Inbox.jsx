import React, { useEffect, useState } from "react";
import axios from "axios";
import { Map, Marker, ZoomControl, Overlay } from "pigeon-maps";
import { osm } from "pigeon-maps/providers";

const ServiceCard = ({ service, loadingService, onApprove }) => {
  const isApproved = service.status === "Approved";

  // Extract coordinates (latitude and longitude) from the service object
  const { latitude, longitude } = service.location;

  const [center, setCenter] = useState([latitude, longitude]);
  const [zoom, setZoom] = useState(11);

  return (
    <div style={styles.card}>
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
        <Marker width={50} anchor={[latitude, longitude]}>
          <Overlay anchor={[latitude, longitude]} offset={[120, 79]}>
            <img
              style={styles.profileImage}
              src="https://cdn-icons-png.flaticon.com/128/149/149071.png"
              alt="alt"
            />
          </Overlay>
        </Marker>
        <ZoomControl />
      </Map>

      <div
        style={styles.approveButton(isApproved, loadingService)}
        onClick={() => !loadingService && onApprove(service.id)}
      >
        {loadingService === service._id ? (
          <div style={styles.spinner}></div>
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
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [loadingService, setLoadingService] = useState(null);

  const organizationName = localStorage.getItem("organization"); // Get admin's organization name

  // Fetch services
  const fetchServices = async () => {
    try {
      const response = await axios.get(
        "https://uga-cycle-backend-1.onrender.com/services/not-approved"
      );
      const fetchedServices = response.data.services;

      // Filter services by organization name
      const filteredServices = fetchedServices.filter(
        (service) => service.company === organizationName
      );

      const updatedServices = [
        ...new Map(
          [...filteredServices, ...services].map((item) => [item.id, item])
        ).values(),
      ];

      setServices(updatedServices);
      localStorage.setItem("services", JSON.stringify(updatedServices));
      setError("");
    } catch (err) {
      setError(err.response?.data?.message || "Failed to fetch Inboxes");
      console.error("Error fetching services:", err);
    } finally {
      setLoading(false);
    }
  };

  // Approve service
  const handleApprove = async (serviceId) => {
    setLoadingService(serviceId);
    try {
      await axios.put(
        `https://uga-cycle-backend-1.onrender.com/services/${serviceId}/approve`
      );
      // const updatedService = response.data.service;

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

  // Initial setup
  useEffect(() => {
    const savedServices = localStorage.getItem("services");
    if (savedServices) {
      const parsedServices = JSON.parse(savedServices).filter(
        (service) => service.company === organizationName
      ); // Filter saved services by organization name
      setServices(parsedServices);
      setLoading(false);
    }

    fetchServices();

    const interval = setInterval(fetchServices, 10000);
    return () => clearInterval(interval);
  }, [fetchServices]);

  if (loading) return <div style={styles.loading}>Loading services...</div>;
  if (error) return <div style={styles.error}>Error: {error}</div>;

  return (
    <div style={styles.container}>
      <h2 style={{ textAlign: "center", color: "#3b6d3b" }}>Inbox</h2>
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
// Utility styles
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
  heading: {
    textAlign: "center",
    fontSize: "2rem",
    color: "#333",
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
    backgroundColor: isApproved ? "green" : "#1976d2",
    borderRadius: "10px",
    cursor: loading ? "not-allowed" : "pointer",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
  }),
  spinner: {
    width: 20,
    height: 20,
    border: "3px solid white",
    borderTop: "3px solid #1976d2",
    borderRadius: "50%",
    animation: "spin 1s linear infinite",
  },
};

export default Inbox;
