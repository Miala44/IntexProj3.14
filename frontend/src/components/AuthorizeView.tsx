import React, { useState, useEffect, createContext } from 'react';
import { Navigate } from 'react-router-dom';

const UserContext = createContext<User | null>(null);

interface User {
  email: string;
}

function AuthorizeView(props: { children: React.ReactNode }) {
  const [authorized, setAuthorized] = useState<boolean>(false);
  const [loading, setLoading] = useState<boolean>(true); // add a loading state
  //const navigate = useNavigate();
  let emptyuser: User = { email: '' };

  const [user, setUser] = useState(emptyuser);

  useEffect(() => {
    async function fetchWithRetry(url: string, options: any) {
      try {
        const response = await fetch(url, options);
        //console.log('AuthorizeView: Raw Response:', response);

        const contentType = response.headers.get('content-type');

        // Ensure response is JSON before parsing
        if (!contentType || !contentType.includes('application/json')) {
          throw new Error('Invalid response format from server');
        }

        const data = await response.json();

        if (data.email) {
          setUser({ email: data.email });
          setAuthorized(true);
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
  }, []);

  if (loading) {
    return <p>Loading...</p>;
  }

  if (authorized) {
    return (
      <UserContext.Provider value={user}>{props.children}</UserContext.Provider>
    );
  }

  return <Navigate to="/login" />;
}

export function AuthorizedUser(props: { value: string }) {
  const user = React.useContext(UserContext);

  if (!user) return null; // Prevents errors if context is null

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
