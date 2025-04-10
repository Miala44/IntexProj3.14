// components/Logout.tsx
import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const Logout = ({ children }: { children?: React.ReactNode }) => {
  const navigate = useNavigate();

  useEffect(() => {
    // clear auth state (example)
    localStorage.removeItem('token'); // or sessionStorage, etc.

    // redirect after short delay
    const timeout = setTimeout(() => {
      navigate('/login');
    }, 1000);

    return () => clearTimeout(timeout); // cleanup
  }, [navigate]);

  return (
    <div style={{ marginTop: '2rem', color: 'white'}}>
      {children ?? <h2>Logging out...</h2>}
    </div>
  );
};

export default Logout;
