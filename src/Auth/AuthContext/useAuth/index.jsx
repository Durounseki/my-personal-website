import { useContext } from "react";
import {AuthContext} from "..";

const useAuth = () => {
    return useContext(AuthContext);
}

export default useAuth;