import { createContext } from 'react';
interface User {
  email: string;
  roles: string[];
}
const UserContext = createContext<User | null>(null);
export default UserContext;
