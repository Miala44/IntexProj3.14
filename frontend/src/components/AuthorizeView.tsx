import React, { useState, useEffect } from 'react';
import { Navigate } from 'react-router-dom';
import UserContext from './UserContext';
import { handleAuthFetch } from '../api/MoviesAPI'; // ✅ Correct way to handle protected fetches

interface User {
  email: string;
  roles: string[];
}

function AuthorizeView(props: {
  children: React.ReactNode;
  requiredRole?: string;
}) {
  const [authorized, setAuthorized] = useState(false);
  const [loading, setLoading] = useState(true);
  const [user, setUser] = useState<User>({ email: '', roles: [] });

  useEffect(() => {
    async function fetchUser() {
      try {
        const response = await handleAuthFetch(
          'https://localhost:5000/pingauth'
        );

        const contentType = response.headers.get('content-type');
        if (!contentType?.includes('application/json'))
          throw new Error('Invalid format');

        const data = await response.json();
        const roles: string[] = data.roles || [];

        setUser({ email: data.email, roles });

        const roleMatch =
          !props.requiredRole ||
          roles.some(
            (role) => role.toLowerCase() === props.requiredRole?.toLowerCase()
          );

        setAuthorized(roleMatch);
      } catch (err) {
        console.warn('Not authorized or fetch failed', err);
        setAuthorized(false);
      } finally {
        setLoading(false);
      }
    }

    fetchUser();
  }, [props.requiredRole]);

  if (loading)
    return (
      <p className="text-center mt-5" style={{ color: 'white' }}>
        Loading...
      </p>
    );

  if (!authorized) return <Navigate to="/login" />;

  return (
    <UserContext.Provider value={user}>{props.children}</UserContext.Provider>
  );
}

export default AuthorizeView;
