import React, { createContext, useState } from 'react';
type Props = {
    children: React.ReactNode;
  }
export const UserContext = createContext(null);

export const UserProvider = ({ children }:Props) => {
  const [contextEmail, setContextEmail] = useState< string>('');

  return (
    <UserContext.Provider value={{ contextEmail,setContextEmail}}>
      {children}
    </UserContext.Provider>
  );
};
