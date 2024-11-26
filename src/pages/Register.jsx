import React from "react";
import RegisterForm from "../components/RegisterForm";

function Register() {
  return (
    <div
      style={{ backgroundColor: "#3b6d3b", width: "100%", textAlign: "center" }}
    >
      <p style={{ fontSize: 30, fontWeight: "bold", color: "#fbfbda" }}>
        Uga-cycle
      </p>
      <RegisterForm />
    </div>
  );
}

export default Register;
