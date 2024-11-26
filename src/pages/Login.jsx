import React from "react";
import LoginForm from "../components/LoginForm";

function Login() {
  return (
    <div
      style={{ backgroundColor: "#3b6d3b", width: "100%", textAlign: "center" }}
    >
      <p style={{ fontSize: 30, fontWeight: "bold", color: "#fbfbda" }}>
        Uga-cycle
      </p>
      <LoginForm />
    </div>
  );
}

export default Login;
