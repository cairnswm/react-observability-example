export const secureFetch = (...params) => {
    const token = sessionStorage.getItem("csr.Token");
    return new Promise((resolve, reject) => {
      let config = params[1] || {};
      if (!config.header) {
        config.headers = { "Content-Type": "application/json" };
      }
      config.headers.Authorization = token ? `Bearer ${token}` : "";
      fetch(params[0], config)
        .then((res) => {
          resolve(res);
        })
        .catch((err) => {
          reject(err);
        });
    });
  };