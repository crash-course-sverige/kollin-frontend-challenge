const getInfoMessage = (message, setInfoMessage, setShowFeedback) => {
  setInfoMessage(message);
  setShowFeedback(true);
  setTimeout(() => setShowFeedback(false), 3000);
  return;
};

export default getInfoMessage;
