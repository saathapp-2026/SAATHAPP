import React, { createContext, useContext, useState, useEffect } from 'react';

const ShoppingJourneyContext = createContext();

export const useShoppingJourney = () => {
  return useContext(ShoppingJourneyContext);
};

export const ShoppingJourneyProvider = ({ children }) => {
  const [journeyState, setJourneyState] = useState({
    totalShoppingDays: 0,
    currentStreak: 0,
    longestStreak: 0,
    lastQualifiedShoppingDate: null,
    nextMilestone: null,
    daysRemainingToMilestone: 0,
    isLoading: true,
    error: null,
  });

  useEffect(() => {
    // In a real application, fetch from the API here
    // Example: fetchShoppingJourneyStats()
    const fetchStats = async () => {
      try {
        // Mock data loading
        setTimeout(() => {
          setJourneyState({
            totalShoppingDays: 43,
            currentStreak: 18,
            longestStreak: 24,
            lastQualifiedShoppingDate: new Date().toISOString(),
            nextMilestone: 30,
            daysRemainingToMilestone: 12,
            isLoading: false,
            error: null,
          });
        }, 1000);
      } catch (error) {
        setJourneyState(prev => ({ ...prev, isLoading: false, error: error.message }));
      }
    };

    fetchStats();
  }, []);

  return (
    <ShoppingJourneyContext.Provider value={{ journeyState, setJourneyState }}>
      {children}
    </ShoppingJourneyContext.Provider>
  );
};
