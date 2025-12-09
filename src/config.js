let defaultBaseUrl = "http://localhost:5000";

if (typeof window !== "undefined") {
  const host = window.location.hostname;
  if (host.includes("vercel.app")) {
    defaultBaseUrl = "https://auth-backend-3oqm.onrender.com";
  }
}

export const API_BASE_URL =
  process.env.REACT_APP_API_BASE_URL || defaultBaseUrl;

export default API_BASE_URL;
