import React from 'react';
import { useAuth } from '../contexts/AuthContext';

interface ProtectedProps {
  roles: ('USER' | 'ADMIN')[];
  children: React.ReactNode;
}

const Protected: React.FC<ProtectedProps> = ({ roles, children }) => {
  const { user } = useAuth();
  
  if (!user || !roles.includes(user.role)) return null;

  return <>{children}</>;
};

export default Protected;
