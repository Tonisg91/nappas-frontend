import React from 'react'
import { connect } from 'react-redux'
import { useHistory } from 'react-router-dom'
import { Formik, Form, Field } from 'formik'
import axios from '../configs/axios'
import { toast } from 'react-toastify'


export const AddForm = ({ currentUser }) => {
    const initialValues = {
        title: '',
        category: 'otros',
        description:'',
        budget: '',
        tags: '',
        location: {
            lat: null,
            lng: null,
            city: '',
            state: '',
        }
    }
    const history = useHistory()

    if (!currentUser) history.push('/login')

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

    const getLocation = (values, setValues) => {
        if ('geolocation' in navigator) {
            navigator.geolocation.getCurrentPosition(async ({ coords }) => {
                const { latitude, longitude } = coords
                const { data } = await axios({
                    method: 'get',
                    url: `https://maps.googleapis.com/maps/api/geocode/json?latlng=${latitude},${longitude}&key=${process.env.REACT_APP_GEOLOCATION_KEY}`,
                    headers: null
                })

                const city = data.results[0].address_components[2].long_name
                const state = data.results[0].address_components[3].long_name

                setValues({
                    ...values,
                    location: { 
                        ...values.location,
                        lat: latitude,
                        lng: longitude,
                        city,
                        state
                    }
                })
            })
        }
    }

    return (
        <div>
            <h1>Crear Anuncio</h1>
            <Formik
                initialValues={initialValues}
                onSubmit={onSubmit}
            >
                {({values, setValues}) => (
                        <Form>
                            <div className="form-field">
                                <label htmlFor="title">Título</label>
                                <Field
                                    id="title"
                                    name="title"
                                    placeholder="Qué trabajo ofreces?"
                                />
                            </div>
                            <div className="form-field">
                                <label htmlFor="category">Categoría</label>
                                <Field
                                    as="select"
                                    id="category"
                                    name="category"
                                >
                                    <option value="construccion">Construcción</option>
                                    <option value="informatica">Informática</option>
                                    <option value="jardineria">Jardinería</option>
                                    <option value="mecanica">Mecánica</option>
                                    <option value="pintura">Pintura</option>
                                    <option value="otros">Otros</option>
                                </Field>
                            </div>
                            <div className="form-field">
                                <label htmlFor="description">Descripción</label>
                                <Field
                                    component="textarea"
                                    cols="20"
                                    rows="10"
                                    id="description"
                                    name="description"
                                    placeholder="Explica qué hay que hacer..."
                                />
                            </div>
                            <div className="form-field">
                                <label htmlFor="budget">Presupuesto Aproximado</label>
                                <Field
                                    type="number"
                                    id="budget"
                                    name="budget"
                                />
                            </div>
                            <div className="form-field">
                                <label htmlFor="tags">Palabras Clave</label>
                                <Field
                                    id="tags"
                                    name="tags"
                                    placeholder="Escribe palabras clave separas con coma"
                                />
                            </div>
                            <button
                                //TODO: MOSTRAR MAPA
                                type="button"
                                id='geolocation-btn'
                                onClick={() => getLocation(values, setValues)}
                            >
                                Añadir Ubicación
                        </button>
                            <button type="submit">Crear trabajo</button>
                        </Form>
                    )
                }
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

