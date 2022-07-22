import axios from "axios";

export default {
    apiEndPoint:"https://stockbook-api.herokuapp.com/api/v1/",
    get: axios.get,
    post: axios.post,
    put: axios.put,
    patch: axios.patch,
    delete: axios.delete,
  };