import axios from 'axios';

const client_id = process.env.REACT_APP_CLIENT_ID2; // client id ---development app 
const redirect_uri = 'http://localhost:3000/music/login'; //  redirect uri ---development app
const authEndpoint = 'https://accounts.spotify.com/authorize?';
const scopes = ['user-library-read', 'playlist-read-private'];

export const loginEndpoint = `${authEndpoint}client_id=${client_id}&redirect_uri=${redirect_uri}&scope=${scopes.join("%20")}&response_type=token&show_dialog=true`;

const apiClient = axios.create({
  baseURL: "https://api.spotify.com/v1/",
});

let token = null;

export const setClientToken = (newToken) => {
  token = newToken;
  apiClient.defaults.headers.common['Authorization'] = `Bearer ${token}`;
};

export const getClientToken = () => {
  return token;
};

export const refreshToken = async () => {
  try {
    const response = await axios.post('https://accounts.spotify.com/api/token', null, {
      params: {
        grant_type: 'refresh_token',
        refresh_token: localStorage.getItem('token'),
        client_id,
      },
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
      },
    });
    const newToken = response.data.access_token;
    setClientToken(newToken);
    return newToken;
  } catch (error) {
    console.error('Error refreshing token:', error);
    throw error;
  }
};

apiClient.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config;
    if (error.response.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true;
      try {
        const newToken = await refreshToken(/* pass your refresh token here */);
        originalRequest.headers.Authorization = `Bearer ${newToken}`;
        return axios(originalRequest);
      } catch (refreshError) {
        // Handle refresh token error
        console.error('Error refreshing token:', refreshError);
        throw refreshError;
      }
    }
    return Promise.reject(error);
  }
);

export default apiClient;
