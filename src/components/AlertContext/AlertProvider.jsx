import AlertContext from "./AlertContext";
import { useCallback, useState } from "react";

const AlertProvider = ({ children }) => {
  const [alert, setAlert] = useState({ message: "", type: "" });
  const showAlert = useCallback((message, type) => {
    setAlert({ message, type });
  }, []);

  const clearAlert = useCallback(() => {
    setAlert({ message: "", type: "" });
  }, []);

  return (
    <AlertContext.Provider value={{ alert, showAlert, clearAlert }}>
      {children}
    </AlertContext.Provider>
  );
};

export default AlertProvider;
