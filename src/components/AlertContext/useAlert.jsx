import { useContext } from "react";
import AlertContext from "./AlertContext";

const useAlert = () => {
  return useContext(AlertContext);
};

export default useAlert;
