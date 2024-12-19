import { useState, useEffect } from 'react';
import PropTypes from 'prop-types';

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

AlertMessage.propTypes = {
  message: PropTypes.string.isRequired,
  type: PropTypes.string.isRequired,
  onDeleteMessage: PropTypes.func.isRequired
}

export default AlertMessage;