import React, {createContext, useContext} from 'react';
import {apiService} from '../services/api';

interface APIContextType {
  api: typeof apiService;
}

const APIContext = createContext<APIContextType | undefined>(undefined);

export const APIProvider: React.FC<{children: React.ReactNode}> = ({
  children,
}) => {
  return (
    <APIContext.Provider value={{api: apiService}}>
      {children}
    </APIContext.Provider>
  );
};

export const useAPI = () => {
  const context = useContext(APIContext);
  if (context === undefined) {
    throw new Error('useAPI must be used within an APIProvider');
  }
  return context.api;
};
