import React from 'react';
import { Navigate, useLocation } from 'react-router-dom';

export default function ProtectedRoute({ user, children }) {
  const location = useLocation();

  if (!user) {
    // Not logged in, redirect to login and save attempted path in state
    return <Navigate to="/login" replace state={{ from: location }} />;
  }

  // Optional: check if user is admin
  if (user.role !== 'admin') {
    return <div>
      <h2>Unauthorized</h2>
      <p>You do not have permission to view this page.</p>
    </div>;
  }

  // Authorized, show the protected page
  return children;
}
