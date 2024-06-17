import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter as Router } from 'react-router-dom';
import App from './App';
import './css/style.css';
import './css/satoshi.css';
import 'jsvectormap/dist/css/jsvectormap.css';
import 'flatpickr/dist/flatpickr.min.css';
import { UserProvider } from './context/UserContext';
import { AuthProvider } from './context/AuthContext';
import { PostProvider } from './context/PostContext';

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <React.StrictMode>
    <UserProvider>
      <AuthProvider>
        <PostProvider>
          <Router>
            <App />
          </Router>
        </PostProvider>
      </AuthProvider>
    </UserProvider>
  </React.StrictMode>,
);
