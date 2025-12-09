import React, { useState } from "react";
import { GoogleLogin } from "@react-oauth/google";
import { useNavigate } from "react-router-dom";
import api from "../api";
import Alert from "./Alert";

const GoogleLoginButton = () => {
  const navigate = useNavigate();
  const [error, setError] = useState("");

  const handleSuccess = async (credentialResponse) => {
    setError("");

    try {
      await api.post("/auth/google", {
        credential: credentialResponse.credential,
      });

      navigate("/dashboard");
    } catch (err) {
      if (err.response?.data?.error) {
        setError(err.response.data.error);
      } else {
        setError("Google login failed. Please try again.");
      }
    }
  };

  const handleError = () => {
    setError("Google login was cancelled or failed. Please try again.");
  };

  return (
    <div style={{ marginTop: "10px" }}>
      {error && <Alert type="error" message={error} />}
      <GoogleLogin onSuccess={handleSuccess} onError={handleError} useOneTap={false} />
    </div>
  );
};

export default GoogleLoginButton;
