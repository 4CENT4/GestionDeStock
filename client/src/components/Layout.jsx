import React, { useEffect, useState } from 'react';
import Sidebar from './Sidebar'; 

const Layout = ({ children }) => {
  const [role, setRole] = useState('');

  useEffect(() => {
    const userRole = localStorage.getItem('role'); 
    setRole(userRole);
  }, []);

  return (
    <div className="min-h-screen flex">

      <Sidebar role={role} /> 
      <div className="flex-1">{children}</div>
    </div>
  );
};

export default Layout;
