export const trackEvent = (eventName, eventData = {}) => {
  console.log(`[ANALYTICS] Event Tracked: ${eventName}`, eventData);
  // In a real app, this would send data to Mixpanel, Google Analytics, Firebase, etc.
};
