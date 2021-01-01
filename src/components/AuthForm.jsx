import React from 'react'
import { Formik, Form, Field } from 'formik'
import axios from '../configs/axios'
import tokenService from '../utils/tokenService'
import { GaEvent } from 'utils/analytics'

export default function AuthForm ({ APIpath, cb = null }) {
    const buttonText = APIpath.toUpperCase()
    const initialValues = {
        email: '',
        password: ''
    }
    const onSubmit = async (values, { resetForm }) => {
        try {
            //TODO: FIX ISSUE WHEN USER LOGIN
            const { data } = await axios.post('/' + APIpath, { ...values })
            if (data.token) tokenService.toLocalStorage(data.token)
            const userLogged = await axios({
                method: 'get',
                url: `/users/profile`,
                headers: {
                    'Authorization': data.token
                }
            })
            if (cb) cb(userLogged.data)
        } catch (error) {
            //TODO: HANDLER ERROR
            console.log(error)
        } finally {
            GaEvent(APIpath, 'User')
            resetForm()
        }
    }


    return (
        <Formik
            initialValues={initialValues}
            onSubmit={onSubmit}
        >
            <Form
            >
                <label htmlFor="email">Email</label>
                <Field id="email" name="email" placeholder="example@email.com" />
                <label htmlFor="password">Password</label>
                <Field id="password" name="password" type="password" />
                <button type="submit">{buttonText}</button>
            </Form>
        </Formik>
    )
}