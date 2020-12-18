import React from 'react'
import { connect } from 'react-redux'
import { Formik, Form, Field } from 'formik'
import axios from '../configs/axios'
import tokenService from '../utils/tokenService'


export const Auth = ({ match }) => {
    const isSignupRoute = match.path.slice(1) === 'signup'
    tokenService.compareTokenTime()

    if (isSignupRoute) {
        return (
            <div>
                <h1>Signup</h1>
                <AuthForm APIpath="signup"/>
            </div>
        )
    }

    return (
        <div>
            <h1>Login</h1>
            <AuthForm APIpath="login"/>
        </div>
    )
}


const AuthForm = ({ APIpath }) => {
    
    return (
        <Formik
            initialValues={{
                email: '',
                password: ''
            }}
            onSubmit={async (values) => {
                try {
                    const response = await axios.post('/' + APIpath, { ...values })
                    if (response.data) tokenService.toLocalStorage(response.data)
                } catch ({response}) {
                    console.log(response.data)
                }
            }}
        >
            <Form>
                <label htmlFor="email">Email</label>
                <Field id="email" name="email" placeholder="example@email.com"/>
                <label htmlFor="password">Password</label>
                <Field id="password" name="password"/>
                <button type="submit">{APIpath.toUpperCase()}</button>
            </Form>
        </Formik>
    )
}


const mapStateToProps = (state) => ({
    
})

const mapDispatchToProps = {
    
}

export default connect(mapStateToProps, mapDispatchToProps)(Auth)
