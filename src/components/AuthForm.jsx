import React from 'react'
import { Formik, Form, Field } from 'formik'
import axios from '../configs/axios'
import tokenService from '../utils/tokenService'

export default function AuthForm ({ APIpath }) {

    return (
        <Formik
            initialValues={{
                email: '',
                password: ''
            }}
            onSubmit={async (values) => {
                try {
                    const { data } = await axios.post('/' + APIpath, { ...values })
                    if (data.token) tokenService.toLocalStorage(data.token)
                } catch ({ response }) {
                    console.log(response.data)
                }
            }}
        >
            <Form>
                <label htmlFor="email">Email</label>
                <Field id="email" name="email" placeholder="example@email.com" />
                <label htmlFor="password">Password</label>
                <Field id="password" name="password" type="password" />
                <button type="submit">{APIpath.toUpperCase()}</button>
            </Form>
        </Formik>
    )
}