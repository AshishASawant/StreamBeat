import axios from 'axios';

const client_id = process.env.REACT_APP_CLIENT_ID2; // client id ---development app 
const client_secret='90d37eac0701466089029e223d48e307'
const redirect_uri = process.env.REACT_APP_REDIRECT_URL; //  redirect uri ---development app
const authEndpoint = 'https://accounts.spotify.com/authorize?';
const scopes = ['user-library-read', 'playlist-read-private'];
const tokenEndpoint = 'https://accounts.spotify.com/api/token';

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

let refreshToken=localStorage.getItem('token')

export const exchangeCodeForTokens = async (authorizationCode) => {
  try {
    const response = await axios.post(tokenEndpoint, null, {
      params: {
        grant_type: 'authorization_code',
        code: authorizationCode,
        redirect_uri: redirect_uri,
        client_id: client_id,
        client_secret: client_secret,
      },
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
      },
    });

    const { access_token, refresh_token } = response.data;

    setClientToken(access_token);
    refreshToken = refresh_token;
    console.log(refresh_token)

    // Store the refresh token securely for future use

    return access_token;
  } catch (error) {
    console.error('Error exchanging code for tokens:', error.response.data);
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
