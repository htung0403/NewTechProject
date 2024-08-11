// src/api/services/auth.service.js
export const isAuthenticated = () => {
    // Check if the user is authenticated (e.g., by checking a token in localStorage)
    const token = localStorage.getItem('authToken');
    return !!token; // Returns true if token exists, false otherwise
  };