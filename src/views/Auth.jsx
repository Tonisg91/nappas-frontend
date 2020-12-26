import React from 'react'
import { AuthForm } from '../components'
import { Link } from 'react-router-dom'

export const Auth = ({ match }) => {
    const isSignupRoute = match.path.slice(1) === 'signup'

    if (isSignupRoute) {
        return (
            <div>
                <h1>Signup</h1>
                <AuthForm APIpath="signup"/>
                <Link to="/login" >Ya tienes una cuenta? Click aquí </Link>
            </div>
        )
    }

    return (
        <div>
            <h1>Login</h1>
            <AuthForm APIpath="login"/>
            <Link to="/signup" >Aún no te has registrado? Crea una cuenta!</Link>
        </div>
    )
}

export default Auth
