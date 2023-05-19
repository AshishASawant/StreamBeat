import axios from "axios";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";



const BASE_URL = "http://localhost:5000/api";
const AUTH_TOKEN = "your_auth_token";

const headers = {
  Authorization: "Bearer " + AUTH_TOKEN,
};




export const fetchBackendData = async (reqType, url, body) => {
    try {
      let response;
  
      if (reqType === "GET") {
        response = await axios.get(BASE_URL + url, {
          headers,
          params: body,
        });
      } else if (reqType === "POST") {
        response = await axios.post(BASE_URL + url, body, {
          headers,
        });
      } else if (reqType === "PUT") {
        response = await axios.put(BASE_URL + url, body, {
          headers,
        });
      } else if (reqType === "DELETE") {
        response = await axios.delete(BASE_URL + url, {
          headers,
          data: body,
        });
      }
  
      // Display success toast
      toast.success(response.data.message || 'success', {
        position: "top-right",
        autoClose: 1000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "dark",
        });;
  
      return response.data;
    } catch (err) {
      // Display error toast
      toast.error(err.response.data.message || 'success', {
        position: "top-right",
        autoClose: 1000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "dark",
        });;
      console.log(err);
      throw err;
    }
  };