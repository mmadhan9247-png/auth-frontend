import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import App from './App';
import { GoogleOAuthProvider } from '@react-oauth/google';

const clientId =
  process.env.REACT_APP_GOOGLE_CLIENT_ID ||
  '680905646956-5i53ab61lg54mdlt2mcvn3q81vcqojmg.apps.googleusercontent.com';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <GoogleOAuthProvider clientId={clientId}>
      <App />
    </GoogleOAuthProvider>
  </React.StrictMode>
);
