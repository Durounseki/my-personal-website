import React, { useState, useEffect } from 'react';

function AlertMessage({ message, type, onDeleteMessage}) {
  const [showModal, setShowModal] = useState(false);

  useEffect(() => {
    if (message!=='') {
      setShowModal(true);
      const timer = setTimeout(() => {
        setShowModal(false);
        onDeleteMessage();
      }, 3000); // Close modal after 5 seconds

      return () => clearTimeout(timer); // Clear timeout on unmount or message change
    }
  }, [message, type, onDeleteMessage]); 

  const alertClass = `alert-message ${type}`;
  
  return (
    <>
      {showModal && (
        <div className={alertClass}> 
            <i className="fa-solid fa-circle-exclamation"></i><p>{message}</p>
        </div>
      )}
    </>
  );
}

export default AlertMessage;