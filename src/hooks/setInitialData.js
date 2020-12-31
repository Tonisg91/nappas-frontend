import tokenService from '../utils/tokenService'
import axios from '../configs/axios'

export default async function setInitialData (handler, hasData, cb) {
    try {
        if (!hasData) {
            handler.setLoading(true)
            if (handler.hasError) return handler.setLoading(false)

            const announcements = await axios.get('/announcements')
            cb.getList(announcements.data)

            if (!tokenService.compareTokenTime()) return
            const user = await axios.get(`/users/${tokenService.getUserId()}`)
            cb.getUserData(user.data)

        }
    } catch (error) {
        handler.setHasError(error.response ? error.response.data : 'Server Error')
    } finally {
        handler.setLoading(false)
    }
}