import axios from "axios";


const apiUrl = import.meta.env.VITE_APP_API_URL;

export const UseAxios = () => {
  return async ({ url, body, header, method = "GET" }) => {
    return await axios({
      url: `${apiUrl}${url}`,
      method,
      data: {
        ...body,
      },
      headers: {
        token: JSON.parse(localStorage.getItem("token")),
        ...header,
      },
    })
      .then((data) => data)
      .catch((eror) => eror);
  };
};
