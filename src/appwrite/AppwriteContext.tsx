import { View, Text } from 'react-native'
import React, { FC, PropsWithChildren, createContext, useState } from 'react'

import AppWriteService from './service';

type AppContextType = {
  appwrite: AppWriteService;
  isLoggedIn: boolean;
  setIsLoggedIn: (isLoggedIn:boolean)=>void;
}

export const AppwriteContext = createContext<AppContextType>({
  appwrite: new AppWriteService(),
  isLoggedIn: false,
  setIsLoggedIn: ()=>{}
});

export const AppwriteProvider: FC<PropsWithChildren> = ({children}) => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const defaultValue = {
    appwrite: new AppWriteService(),
    isLoggedIn,
    setIsLoggedIn,
  };
  return (
    <AppwriteContext.Provider value={defaultValue}>
      {children}
    </AppwriteContext.Provider>
  )
}

// export default AppwriteContext