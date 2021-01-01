import React from 'react'
import { Formik, Form, Field } from 'formik'
import axios from '../configs/axios'
import tokenService from '../utils/tokenService'
import { GaEvent } from 'utils/analytics'
import { toast } from 'react-toastify'

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

            if (APIpath === 'login' && cb) {
                const userLogged = await axios({
                    method: 'get',
                    url: '/users/profile',
                    headers: {
                        'Authorization': data.token
                    }
                })
                cb(userLogged.data)
            }
        } catch (error) {
            //TODO: HANDLER ERROR
            toast.error(error.response ? error.response.data : 'Error at login', {
                autoClose: 2000
            })
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