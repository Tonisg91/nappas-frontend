import React from 'react'
import { connect } from 'react-redux'
import { useHistory } from 'react-router-dom'
import { Formik, Form, Field } from 'formik'
import axios from '../configs/axios'
import { toast } from 'react-toastify'


export const AddForm = ({ currentUser }) => {
    const history = useHistory()

    if (!currentUser) history.push('/login')

    const initialValues = {
        title: '',
        category: 'otros',
        description:'',
        budget: '',
        tags: '',
    }

    const onSubmit = async (values, { resetForm }) => {
        try {
            await axios.post('/announcements', { ...values })
            toast.success('Anuncio publicado con éxito', {autoClose: 2000})
        } catch (error) {
            //TODO: HANDLER ERROR
            console.log(error.response ? error.response.data : 'Server Error')
        } finally {
            resetForm()
        }
    }

    return (
        <div>
            <h1>add announcement</h1>
            <Formik
                initialValues={initialValues}
                onSubmit={onSubmit}
            >
                    <Form>
                        <label htmlFor="title">Título</label>
                        <Field
                            id="title"
                            name="title"
                            placeholder="Qué trabajo ofreces?"
                        />
                        <label htmlFor="category">Categoría</label>
                        <Field
                            as="select"
                            id="category"
                            name="category"
                        >
                            <option value="construccion">Construcción</option>
                            <option value="jardineria">Jardinería</option>
                            <option value="informatica">Informática</option>
                            <option value="Pintura">Pintura</option>
                            <option value="otros">Otros</option>
                        
                        </Field>
                        <label htmlFor="description">Descripción</label>
                        <Field
                            id="description"
                            name="description"
                            placeholder="Explica qué hay que hacer..."
                        />
                        <label htmlFor="budget">Presupuesto Aproximado</label>
                        <Field
                            type="number"
                            id="budget"
                            name="budget"
                        />
                        <label htmlFor="tags">Palabras Clave</label>
                        <Field
                            id="tags"
                            name="tags"
                            placeholder="Escribe palabras clave separas con coma"
                        />
                        <button type="submit">Crear trabajo</button>
                    </Form>
            </Formik>
        </div>

    )
}

const mapStateToProps = (state) => ({
    currentUser: state.currentUser
})

const mapDispatchToProps = {
    
}

export default connect(mapStateToProps, mapDispatchToProps)(AddForm)

