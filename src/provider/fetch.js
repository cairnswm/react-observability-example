const localOldFetch = window.fetch;

export const secureFetch = (...params) => {
    const token = sessionStorage.getItem("csr.Token");
    console.log("secureFetch Observe", ...params)
    return new Promise((resolve, reject) => {
      let config = params[1] || {};
      if (!config.header) {
        config.headers = { "Content-Type": "application/json" };
      }
      config.headers.Authorization = token ? `Bearer ${token}` : "";
      localOldFetch(params[0], config)
        .then((res) => {
          const temp = res.clone()
          temp.json().then((json) => console.log("secureFetch Observability", json))
          resolve(res);
        })
        .catch((err) => {
          console.error("secureFetch error", err)
          reject(err);
        });
    });
  };