import { useEffect } from "react";

function AlertMessage({ message, type, onDeleteMessage }) {
  useEffect(() => {
    if (!message) return;

    const timer = setTimeout(() => {
      onDeleteMessage();
    }, 3000);

    return () => clearTimeout(timer);
  }, [message, onDeleteMessage]);

  const alertClass = `alert-message ${type}`;

  if (!message) return null;

  return (
    <div className={alertClass}>
      <i className="fa-solid fa-circle-exclamation"></i>
      <p>{message}</p>
    </div>
  );
}

export default AlertMessage;
