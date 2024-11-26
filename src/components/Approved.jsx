import React, { useEffect, useState } from "react";
import axios from "axios";

const styles = {
  container: {
    fontFamily: "Arial, sans-serif",
    backgroundColor: "#fbfbda",
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
    backgroundColor: isApproved ? "green" : "crimson",
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

const ServiceCard = ({ service, loadingService, onApprove, remainingTime }) => {
  const isApproved = service.status === "approved";

  return (
    <div style={styles.card}>
      <p style={{ textAlign: "right" }}>
        <strong>Remaining Time:</strong> {remainingTime || "Calculating..."}
      </p>
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
            {isApproved ? "Approved" : "Disapprove"}
          </p>
        )}
      </div>
    </div>
  );
};

const Approved = () => {
  const [services, setServices] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [loadingService, setLoadingService] = useState(null);

  const adminOrganizationName = localStorage.getItem("organization");

  const calculateRemainingTime = (service) => {
    const registrationType = service.registrationType.toLowerCase();
    const now = new Date();
    const postDate = new Date(service.date);

    let expirationDate;

    if (registrationType === "monthly") {
      expirationDate = new Date(postDate.setMonth(postDate.getMonth() + 1));
    } else if (registrationType === "mid-yearly") {
      expirationDate = new Date(postDate.setMonth(postDate.getMonth() + 6));
    } else if (registrationType === "annual") {
      expirationDate = new Date(
        postDate.setFullYear(postDate.getFullYear() + 1)
      );
    } else {
      return null;
    }

    const remainingTime = expirationDate - now;
    if (remainingTime <= 0) return "Expired";

    const days = Math.floor(remainingTime / (1000 * 60 * 60 * 24));
    const hours = Math.floor((remainingTime / (1000 * 60 * 60)) % 24);
    const minutes = Math.floor((remainingTime / (1000 * 60)) % 60);

    return `${days}d ${hours}h ${minutes}m`;
  };

  const fetchServices = async () => {
    try {
      const response = await axios.get(
        "https://uga-cycle-backend-1.onrender.com/services/approved"
      );
      const fetchedServices = response.data.services;

      const filteredServices = fetchedServices.filter(
        (service) =>
          service.companyName.toLowerCase() ===
          adminOrganizationName.toLowerCase()
      );

      setServices(filteredServices);
      localStorage.setItem("services", JSON.stringify(filteredServices));
      setError("");
    } catch (err) {
      setError(err.response?.data?.message || "Failed to fetch services");
      console.error("Error fetching services:", err);
    } finally {
      setLoading(false);
    }
  };

  const handleDisapprove = async (serviceId) => {
    setLoadingService(serviceId);
    try {
      await axios.put(
        `https://uga-cycle-backend-1.onrender.com/services/${serviceId}/disapprove`
      );

      setServices((prev) =>
        prev.filter((service) => service._id !== serviceId)
      );
      alert("Service disapproved automatically!");
    } catch (err) {
      console.error("Error disapproving service:", err);
    } finally {
      setLoadingService(null);
    }
  };

  useEffect(() => {
    fetchServices();

    const interval = setInterval(fetchServices, 10000);

    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    const timer = setInterval(() => {
      services.forEach((service) => {
        const remainingTime = calculateRemainingTime(service);
        if (remainingTime === "Expired") {
          handleDisapprove(service.id);
        }
      });
    }, 10000);

    return () => clearInterval(timer);
  }, [services]);

  if (loading) return <div style={styles.loading}>Loading services...</div>;
  if (error) return <div style={styles.error}>Error: {error}</div>;

  return (
    <div style={styles.container}>
      <h2 style={{ textAlign: "center", color: "#3b6d3b" }}>
        Approved Customers
      </h2>
      {services.length === 0 ? (
        <p style={styles.noServices}>No services found.</p>
      ) : (
        services.map((service) => (
          <ServiceCard
            key={service.id}
            service={service}
            loadingService={loadingService}
            onApprove={handleDisapprove}
            remainingTime={calculateRemainingTime(service)}
          />
        ))
      )}
    </div>
  );
};

export default Approved;
