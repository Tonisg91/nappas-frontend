import axios from "axios"
import tokenService from "../utils/tokenService"

axios.defaults.baseURL = "http://localhost:5000/api"
axios.defaults.headers.common.Authorization = tokenService.getToken()
export default axios
