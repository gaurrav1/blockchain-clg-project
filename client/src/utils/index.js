export const daysLeft = (deadline) => {
  const now = Math.floor(Date.now() / 1000); // Current time in seconds
  const timeLeft = deadline - now; // Time difference in seconds
  return timeLeft > 0 ? Math.ceil(timeLeft / (60 * 60 * 24)) : 0;
};

  
  export const calculateBarPercentage = (goal, raisedAmount) => {
    const percentage = Math.round((raisedAmount * 100) / goal);
  
    return percentage;
  };
  
  export const checkIfImage = (url, callback) => {
    const img = new Image();
    img.src = url;
  
    if (img.complete) callback(true);
  
    img.onload = () => callback(true);
    img.onerror = () => callback(false);
  };
  