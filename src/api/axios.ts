import axios from 'axios';

const api = axios.create({
  baseURL: import.meta.env.VITE_COSMOCLOUD_ENDPOINT, // Replace with your API base URL
  headers: {
    'projectId': import.meta.env.VITE_COSMOCLOUD_PROJECTID,
    'environmentId': import.meta.env.VITE_COSMOCLOUD_ENVIRONMENTID, // Replace with your authorization token if needed
  },
});

export default api;
