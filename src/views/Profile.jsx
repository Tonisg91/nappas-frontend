import React from 'react'
import { connect } from 'react-redux'
import { useHistory } from 'react-router-dom'
import tokenService from '../utils/tokenService'
import { logout } from '../reducers/users.reducer'
import { GaEvent } from 'utils/analytics'


export const Profile = ({ currentUser, logout }) => {
    const history = useHistory()
    if (!currentUser) history.push('/login')

    const handleLogout = () => {
        tokenService.removeToken(logout)
        GaEvent('Logout', 'User')
        history.push('/')
    }

    const { announcements, email, photo, reviews, workInProgress } = currentUser

    return (
        <div>
            <h1>PROFILE</h1>
            <button onClick={handleLogout} >LOGOUT</button>
        </div>
    )
}

const mapStateToProps = (state) => ({
    currentUser: state.currentUser
})

const mapDispatchToProps = dispatch => ({
    logout: () => {
        dispatch(logout())
    }
})

export default connect(mapStateToProps, mapDispatchToProps)(Profile)

