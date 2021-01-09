import tokenService from '../utils/tokenService'
import axios from '../configs/axios'
import io from 'socket.io-client'

const SOCKET_SERVER_URL = 'http://localhost:5000'

export default async function setInitialData(handler, dataObject, cb) {
    try {
        if (!dataObject.hasData) {
            handler.setLoading(true)
            if (handler.hasError) return handler.setLoading(false)

            const announcements = await axios.get('/announcements')
            cb.getList(announcements.data)

            if (!tokenService.compareTokenTime()) return
            const user = await axios.get('/users/profile')
            cb.getUserData(user.data)
        }

        if (!dataObject.socketRef && dataObject.currentUser) {
            const socket = io.connect(SOCKET_SERVER_URL)
            cb.getSocketRef(socket)
        }
    } catch (error) {
        console.error(error)
        handler.setHasError(
            error.response ? error.response.data : 'Server Error'
        )
    } finally {
        handler.setLoading(false)
    }
}
