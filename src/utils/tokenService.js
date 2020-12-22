import jwt from 'jsonwebtoken'
class TokenService {
    constructor() {
        this.localStoragePath = '@nappas_userToken'
        this.JWT_KEY = process.env.REACT_APP_JWT_KEY
        this.currentDate = new Date(Date.now())
        this.userToken = JSON.parse(localStorage.getItem(this.localStoragePath))
    }

    getUserId() {
        return this.decodeToken()._id
    }

    removeToken() {
        localStorage.removeItem(this.localStoragePath)
    }

    toLocalStorage(token) {
        localStorage.setItem(this.localStoragePath, JSON.stringify(token))
    }

    compareTokenTime() {
        if (!this.userToken) return false
        const { exp } = this.decodeToken()
        const tokenExpireDate = new Date(Date.now() + exp)

        if (tokenExpireDate < this.currentDate) {
            this.removeToken()
            return false
        }

        return true
    }

    getToken() {
        if (!this.compareTokenTime()) return null

        return this.userToken
    }

    decodeToken() {
        return jwt.decode(this.userToken, this.JWT_KEY)
    }
}

export default new TokenService()