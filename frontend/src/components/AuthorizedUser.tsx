import React from 'react';
import UserContext from './UserContext';
export function AuthorizedUser(props: { value: string }) {
  const user = React.useContext(UserContext);
  if (!user) return null;
  return props.value === 'email' ? <>{user.email}</> : null;
}
export default AuthorizedUser;
