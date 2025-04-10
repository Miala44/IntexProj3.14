import React, { useContext } from 'react';
import UserContext from './UserContext';
import { Navigate } from 'react-router-dom';
function AdminAuthorizeView(props: { children: React.ReactNode }) {
  const user = useContext(UserContext);
  if (!user) return <Navigate to="/login" />;
  if (!user.roles.includes('Admin')) return <Navigate to="/login" />;
  return <>{props.children}</>;
}
export default AdminAuthorizeView;
