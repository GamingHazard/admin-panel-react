import React, { useEffect, useState } from "react";
import axios from "axios";

// Utility styles
const styles = {
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
    width: "100%",
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

// ServiceCard Component
const ServiceCard = ({ service, loadingService, onApprove }) => {
  const isApproved = service.status === "approved";

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
        <strong>Location:</strong> {service.location || "Not defined"}
      </p>
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

// Main Inbox Component
const Inbox = () => {
  const [services, setServices] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [loadingService, setLoadingService] = useState(null);

  // Fetch services
  const fetchServices = async () => {
    try {
      const response = await axios.get(
        "https://uga-cycle-backend-1.onrender.com/services/not-approved"
      );
      const fetchedServices = response.data.services;

      const updatedServices = [
        ...new Map(
          [...fetchedServices, ...services].map((item) => [item.id, item])
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
      const response = await axios.put(
        `https://uga-cycle-backend-1.onrender.com/services/${serviceId}/approve`
      );
      const updatedService = response.data.service;

      setServices((prev) =>
        prev.map((service) =>
          service._id === serviceId
            ? { ...service, status: "approved" }
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
      setServices(JSON.parse(savedServices));
      setLoading(false);
    }

    fetchServices();

    const interval = setInterval(fetchServices, 10000);
    return () => clearInterval(interval);
  }, []);

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

export default Inbox;
