
import React, { createContext, useContext, useState } from 'react';

const HotelSearchContext = createContext();

export const HotelSearchProvider = ({ children }) => {
  const [searchCriteria, setSearchCriteria] = useState({});

  return (
    <HotelSearchContext.Provider value={{ searchCriteria, setSearchCriteria }}>
      {children}
    </HotelSearchContext.Provider>
  );
};

export const useHotelSearchContext = () => {
  const context = useContext(HotelSearchContext);
  if (!context) {
    throw new Error('useHotelSearchContext must be used within a HotelSearchProvider');
  }
  return context;
};
