import jwt from 'jsonwebtoken'
class TokenService {
    constructor() {
        this.localStoragePath = '@nappas_userToken'
        this.currentDate = new Date(Date.now())
        this.JWT_KEY = process.env.REACT_APP_JWT_KEY
    }

    toLocalStorage(token) {
        localStorage.setItem(this.localStoragePath, JSON.stringify(token))
    }

    getTokenFromLocalStorage() {
        return JSON.parse(localStorage[this.localStoragePath])
    }

    compareTokenTime() {
        if (!this.getTokenFromLocalStorage()) return
        const { exp } = this.decodeToken(this.getTokenFromLocalStorage())
        const tokenExpireDate = new Date(Date.now() + exp)
        return tokenExpireDate > this.currentDate
    }

    getTokenForAxiosHeader() {
        return localStorage[this.localStoragePath] && this.compareTokenTime() ? this.getTokenFromLocalStorage() : null
    }

    decodeToken(token) {
        return jwt.decode(token, this.JWT_KEY)
    }

}

export default new TokenService()