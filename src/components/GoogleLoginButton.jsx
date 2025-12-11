import React, { useState } from "react";
import { GoogleLogin } from "@react-oauth/google";
import { useNavigate } from "react-router-dom";
import api from "../api";
import Alert from "./Alert";

const GoogleLoginButton = () => {
  const navigate = useNavigate();
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const handleSuccess = async (credentialResponse) => {
    setError("");
    setSuccess("");

    try {
      const res = await api.post("/auth/google", {
        credential: credentialResponse.credential,
      });

      if (res.data && res.data.access_token) {
        localStorage.setItem("access_token", res.data.access_token);
      }

      setSuccess("Google login successful! Redirecting...");

      setTimeout(() => {
        navigate("/dashboard");
      }, 1200);
    } catch (err) {
      if (err.response?.data?.error) {
        setError(err.response.data.error);
      } else {
        setError("Google login failed. Please try again.");
      }
    }
  };

  const handleError = () => {
    setSuccess("");
    setError("Google login was cancelled or failed. Please try again.");
  };

  return (
    <div style={{ marginTop: "10px" }}>
      {success && <Alert type="success" message={success} />}
      {error && <Alert type="error" message={error} />}
      <GoogleLogin onSuccess={handleSuccess} onError={handleError} useOneTap={false} />
    </div>
  );
};

export default GoogleLoginButton;
