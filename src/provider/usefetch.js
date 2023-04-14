import { useContext } from "react";
import { ObservabilityContext } from "./provider";

export const useFetch = () => {
    // get the context
    const context = useContext(ObservabilityContext);
  
    // if `undefined`, throw an error
    if (!context) {
      throw new Error("useFetch was used outside of its Provider");
    }
    const { fetch, token, setToken  } = context;
  
    return {fetch, token, setToken};
  };

export default useFetch;  