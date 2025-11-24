import React from "react";

const Alert = ({ type, message }) => {
  if (!message) return null;

  const styles = {
    success: {
      background: "#d4edda",
      color: "#155724",
      padding: "10px",
      borderRadius: "5px",
      marginBottom: "10px",
      border: "1px solid #c3e6cb",
    },
    error: {
      background: "#f8d7da",
      color: "#721c24",
      padding: "10px",
      borderRadius: "5px",
      marginBottom: "10px",
      border: "1px solid #f5c6cb",
    },
  };

  return <div style={styles[type]}>{message}</div>;
};

export default Alert;
