import { Formik, Form, Field } from 'formik'
import { useNavigate } from 'react-router-dom'
import * as Yup from 'yup'
import Alerta from './Alerta'




export const Formulario = ({cliente, cargando}) => {

    const navigate = useNavigate()

    const nuevoClienteSchema = Yup.object().shape({
        nombre: Yup.string()
            .min(3, 'El Nombre es muy corto')
            .max(20, 'El Nombre es muy largo')
            .required('El Nombre del Cliente es Obligatorio'),
        empresa: Yup.string()
            .required('El Nombre de la empresa es obligatorio'),
        email: Yup.string()
            .email('Email no válido')
            .required('El email es obligatorio'),
        telefono: Yup.number()
            .positive('Número no válido')
            .integer('Número no válido')
            .typeError('El Número no es válido')
    })

    
        const handleSubmit = async (valores) => {
            try {
                let respuesta 
                if(cliente.id) {
                    // Editando un registro
                    const url = `${import.meta.env.VITE_API_URL}/${id}`
                    respuesta = await fetch(url, {
                        method: 'PUT',
                        body: JSON.stringify(valores),
                        headers: {
                            'Content-Type': 'application/json'
                        }
                    })
    
                } else {
                    // Nuevo Registro
                    const url = `http://localhost:4000/clientes/${id}`
                    respuesta = await fetch(url, {
                        method: 'POST',
                        body: JSON.stringify(valores),
                        headers: {
                            'Content-Type': 'application/json'
                        }
                    })
                }
    
                await respuesta.json()
                navigate('/clientes')
            } catch (error) {
                console.log(error)
            }
        } 

    return (
        <div className='bg-white mt-10 px-5 py-10 rounded-md shadow-md md:w-3/4 mx-auto'>
            <h1 className='text-gray-600 font-bold text-xl uppercase text-center'>{cliente?.nombre ? 'Editar Cliente' : 'Agregar Cliente'}</h1>
            <Formik
                initialValues={{
                    nombre: cliente?.nombre ?? "",
                    empresa: cliente?.empresa ?? "",
                    email: cliente?.email ?? "",
                    telefono: cliente?.telefono ?? "",
                    notas: cliente?.notas ?? "",
                }}
                enableReinitialize={true}
                onSubmit={ async (values,{resetForm}) => {
                    await handleSubmit(values)

                    resetForm()
                }}

                validationSchema={nuevoClienteSchema}
            >
                {({ errors, touched }) => {
                    return (
                        <Form className='mt-10'>
                            <div className='mb-4'>
                                <label
                                    className='text-gray-800'
                                    htmlFor='Nombre'
                                >Nombre: </label>
                                <Field
                                    id='nombre'
                                    type='text'
                                    placeholder="Nombre del Cliente"
                                    className='mt-2 block w-full p-3 bg-gray-100'
                                    name="nombre"
                                />
                                {errors.nombre && touched.nombre ? (
                                    <div className="text-center my-4 bg-red-600 text-white font-bold p-3 uppercase">
                                        {errors.nombre}
                                    </div>
                                ) : null}
                            </div>

                            <div className='mb-4'>
                                <label
                                    className='text-gray-800'
                                    htmlFor='empresa'
                                >Empresa </label>
                                <Field
                                    id='empresa'
                                    type='text'
                                    placeholder="Nombre de la Empresa"
                                    className='mt-2 block w-full p-3 bg-gray-100'
                                    name="empresa"
                                />
                                {errors.empresa && touched.empresa ? (
                                    <div className="text-center my-4 bg-red-600 text-white font-bold p-3 uppercase">
                                        {errors.empresa}
                                    </div>
                                ) : null}
                            </div>

                            <div className='mb-4'>
                                <label
                                    className='text-gray-800'
                                    htmlFor='email'
                                >Email </label>
                                <Field
                                    id='email'
                                    type='email'
                                    placeholder="Ejemplo@gmail.com"
                                    className='mt-2 block w-full p-3 bg-gray-100'
                                    name='email'
                                />
                                {errors.email && touched.email ? (
                                    <div className="text-center my-4 bg-red-600 text-white font-bold p-3 uppercase">
                                        {errors.email}
                                    </div>
                                ) : null}
                            </div>

                            <div className='mb-4'>
                                <label
                                    className='text-gray-800'
                                    htmlFor='tel'
                                >Telefono </label>
                                <Field
                                    id='tel'
                                    type='tel'
                                    placeholder="899-123-4567"
                                    className='mt-2 block w-full p-3 bg-gray-100'
                                    name='telefono'
                                />
                                {errors.telefono && touched.telefono ? (
                                    <div className="text-center my-4 bg-red-600 text-white font-bold p-3 uppercase">
                                        {errors.telefono}
                                    </div>
                                ) : null}
                            </div>

                            <div className="mb-4">
                                <label
                                    className="text-gray-800"
                                    htmlFor="notas"
                                >Notas:</label>
                                <Field
                                    as="textarea"
                                    id="notas"
                                    type="text"
                                    className="mt-2 block w-full p-3 bg-gray-50 h-40"
                                    placeholder="Notas del Cliente"
                                    name="notas"
                                />

                                <input
                                    type="submit"
                                    value={cliente?.nombre ? 'Editar Cliente' : 'Agregar Cliente'}
                                    className="mt-5 w-full bg-indigo-600 p-3 text-white
                         font-bold uppercase text-lg"
                                />
                            </div>
                        </Form>
                    )
                }}
            </Formik>
        </div>
    )
}

Formulario.defaultProps = {
    cliente: {},
    cargando: false
}
