import React from 'react'
import { Formik, Form, Field } from 'formik'
import axios from '../configs/axios'
import tokenService from '../utils/tokenService'

export default function AuthForm ({ APIpath }) {
    const buttonText = APIpath.toUpperCase()
    const initialValues = {
        email: '',
        password: ''
    }
    const onSubmit = async (values, { resetForm }) => {
        try {
            const { data } = await axios.post('/' + APIpath, { ...values })
            if (data.token) tokenService.toLocalStorage(data.token)
        } catch ({ response }) {
            //TODO: HANDLER ERROR
            console.log(response.data)
        } finally {
            resetForm()
        }
    }


    return (
        <Formik
            initialValues={initialValues}
            onSubmit={() => onSubmit()}
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