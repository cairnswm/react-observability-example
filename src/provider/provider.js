import React, { createContext, useState, useEffect } from "react";
import { secureFetch } from "./fetch";

const oldFetch = fetch;
window.fetch = (...params) => {
  console.error("fetch is not allowed, use secureFetch or useFetch instead");
};
window.fetch = secureFetch;

// create context
const ObservabilityContext = createContext();

const ObservabilityProvider = (props) => {
  const { children } = props;

  const [token, setToken] = useState();

  const secureFetch = (...params) => {
    console.log("Provider Observe", ...params)
    return new Promise((resolve, reject) => {
      let config = params[1] || {};
      if (!config.header) {
        config.headers = { "Content-Type": "application/json" };
      }
      config.headers.Authorization = token ? `Bearer ${token}` : "";
      oldFetch(params[0], config)
        .then((res) => {
          const temp = res.clone()
          temp.json().then((json) => console.log("Provider Observability", json))
          resolve(res);
        })
        .catch((err) => {
          
          console.error("Provider error", err)
          reject(err);
        });
    });
  };

  return (
    // the Provider gives access to the context to its children
    <ObservabilityContext.Provider value={{fetch: secureFetch, token, setToken}}>
      {children}
    </ObservabilityContext.Provider>
  );
};

export { ObservabilityContext, ObservabilityProvider };
export default ObservabilityProvider;