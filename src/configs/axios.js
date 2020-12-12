import axios from 'axios'

axios.defaults.baseURL = "http://localhost:5000/api"
axios.defaults.headers.common['Authorization'] = localStorage.nappasUserConfig ? localStorage.nappasUserConfig.auth_token : null

export default axios