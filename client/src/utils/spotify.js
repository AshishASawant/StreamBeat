import axios from 'axios';

const client_id = process.env.REACT_APP_CLIENT_ID2; // client id ---development app 
const redirect_uri = process.env.REACT_APP_REDIRECT_URL; //  redirect uri ---development app
const authEndpoint = 'https://accounts.spotify.com/authorize?';
const scopes = ['user-library-read', 'playlist-read-private','streaming',
'user-read-email',
'user-read-private',
'user-library-read',
'user-library-modify',
'user-read-playback-state',
'user-modify-playback-state'];
const tokenEndpoint = 'https://accounts.spotify.com/api/token';

export const loginEndpoint = `${authEndpoint}client_id=${client_id}&redirect_uri=${redirect_uri}&scope=${scopes.join("%20")}&response_type=code&show_dialog=true`;

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




export default apiClient;
