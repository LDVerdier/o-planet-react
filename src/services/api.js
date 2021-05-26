import axios from 'axios';
import { baseUrlApi } from 'src/data/url';

export default (() => {
  const api = axios.create({
    baseURL: baseUrlApi,
  });
  const get = (url, thenCallback, errorCallback, config = {}) => {
    api
      .get(url, config)
      .then(thenCallback)
      .catch(errorCallback);
  };
  const post = (url, payload, thenCallback, errorCallback, config = {}) => {
    api
      .post(url, payload, config)
      .then(thenCallback)
      .catch(errorCallback);
  };
  const patch = (url, payload, thenCallback, errorCallback, config = {}) => {
    api
      .patch(url, payload, config)
      .then(thenCallback)
      .catch(errorCallback);
  };
  const del = (url, thenCallback, errorCallback, config = {}) => {
    api
      .delete(url, config)
      .then(thenCallback)
      .catch(errorCallback);
  };

  const setJWT = (JWT) => {
    api.defaults.headers.common.Authorization = `Bearer ${JWT}`;
  };
  return {
    get,
    post,
    patch,
    del,
    setJWT,
  };
})();
