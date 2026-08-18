export const trackEvent = (eventName, eventData = {}) => {
  console.log(`[ANALYTICS] Event Tracked: ${eventName}`, eventData);
  
  if (typeof window !== 'undefined') {
    try {
      const existingEventsJson = window.localStorage.getItem('saathapp_analytics_events');
      const existingEvents = existingEventsJson ? JSON.parse(existingEventsJson) : [];
      
      const newEvent = {
        id: `EVT-${Date.now()}-${Math.floor(Math.random() * 1000)}`,
        event: eventName,
        timestamp: new Date().toISOString(),
        ...eventData
      };
      
      existingEvents.push(newEvent);
      window.localStorage.setItem('saathapp_analytics_events', JSON.stringify(existingEvents));
    } catch (e) {
      console.warn('Analytics storage failed', e);
    }
  }
};
