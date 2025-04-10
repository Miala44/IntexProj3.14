import React, { useState, useEffect, createContext } from 'react';
import { Navigate } from 'react-router-dom';

interface User {
  email: string;
  roles: string[];
}

const UserContext = createContext<User | null>(null);

interface AuthorizeViewProps {
  children: React.ReactNode;
  requiredRole?: string; // <- Add this for admin page
}

function AuthorizeView({ children, requiredRole }: AuthorizeViewProps) {
  const [authorized, setAuthorized] = useState<boolean>(false);
  const [loading, setLoading] = useState<boolean>(true);
  const [user, setUser] = useState<User>({ email: '', roles: [] });

  useEffect(() => {
    async function fetchWithRetry(url: string, options: any) {
      try {
        const response = await fetch(url, options);
        const contentType = response.headers.get('content-type');

        if (!contentType || !contentType.includes('application/json')) {
          throw new Error('Invalid response format from server');
        }

        const data = await response.json();

        if (data.email) {
          setUser({ email: data.email, roles: data.roles || [] });

          const roleMatch =
            !requiredRole ||
            data.roles?.some(
              (role: string) =>
                role.toLowerCase() === requiredRole.toLowerCase()
            );

          setAuthorized(roleMatch);
        } else {
          throw new Error('Invalid user session');
        }
      } catch (error) {
        setAuthorized(false);
      } finally {
        setLoading(false);
      }
    }

    fetchWithRetry('https://localhost:5000/pingauth', {
      method: 'GET',
      credentials: 'include',
    });
  }, [requiredRole]);

  if (loading) return <p>Loading...</p>;

  if (!authorized) return <Navigate to="/login" />;

  return <UserContext.Provider value={user}>{children}</UserContext.Provider>;
}

export function AuthorizedUser(props: { value: string }) {
  const user = React.useContext(UserContext);
  if (!user) return null;

  return props.value === 'email' ? <>{user.email}</> : null;
}

export default AuthorizeView;

// import React, { useState, useEffect } from 'react';
// import { Navigate } from 'react-router-dom';
// import UserContext from './UserContext';
// import { handleAuthFetch } from '../api/MoviesAPI'; // ✅ Correct way to handle protected fetches

// interface User {
//   email: string;
//   roles: string[];
// }

// function AuthorizeView(props: {
//   children: React.ReactNode;
//   requiredRole?: string;
// }) {
//   const [authorized, setAuthorized] = useState(false);
//   const [loading, setLoading] = useState(true);
//   const [user, setUser] = useState<User>({ email: '', roles: [] });

//   useEffect(() => {
//     async function fetchUser() {
//       try {
//         const response = await handleAuthFetch(
//           'https://localhost:5000/pingauth'
//         );

//         const contentType = response.headers.get('content-type');
//         if (!contentType?.includes('application/json'))
//           throw new Error('Invalid format');

//         const data = await response.json();
//         const roles: string[] = data.roles || [];

//         setUser({ email: data.email, roles });

//         const roleMatch =
//           !props.requiredRole ||
//           roles.some(
//             (role) => role.toLowerCase() === props.requiredRole?.toLowerCase()
//           );

//         setAuthorized(roleMatch);
//       } catch (err) {
//         console.warn('Not authorized or fetch failed', err);
//         setAuthorized(false);
//       } finally {
//         setLoading(false);
//       }
//     }

//     fetchUser();
//   }, [props.requiredRole]);

//   if (loading)
//     return (
//       <p className="text-center mt-5" style={{ color: 'white' }}>
//         Loading...
//       </p>
//     );

//   if (!authorized) return <Navigate to="/login" />;

//   return (
//     <UserContext.Provider value={user}>{props.children}</UserContext.Provider>
//   );
// }

// export default AuthorizeView;
