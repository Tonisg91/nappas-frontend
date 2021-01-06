import React from 'react'
import { connect } from 'react-redux'
import { AuthForm } from 'components'
import { Link } from 'react-router-dom'
import { getUserData } from '../reducers/users.reducer'

export const Auth = ({ match, getUserData }) => {
    const isSignupRoute = match.path.slice(1) === 'signup'

    if (isSignupRoute) {
        return (
            <div>
                <h1>Signup</h1>
                <AuthForm APIpath="signup" />
                <Link to="/login">Ya tienes una cuenta? Click aquí </Link>
            </div>
        )
    }

    return (
        <div>
            <h1>Login</h1>
            <AuthForm APIpath="login" cb={getUserData} />
            <Link to="/signup">Aún no te has registrado? Crea una cuenta!</Link>
        </div>
    )
}

const mapDispatchToProps = (dispatch) => ({
    getUserData: (userData) => {
        dispatch(getUserData(userData))
    },
})

export default connect(null, mapDispatchToProps)(Auth)
