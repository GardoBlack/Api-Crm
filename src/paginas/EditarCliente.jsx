import { Formulario } from "../components/Formulario";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

const EditarCliente = () => {
  const [cliente, setCliente] = useState({})
  const [cargando, setCargando] = useState(true)
  const { id } = useParams()

  useEffect(() => {
    setCargando(!cargando)
    const obtenerClienteApi = async () => {
      try {
        const url = `http://localhost:4000/clientes/${id}`
        const respuesta = await fetch(url)
        const resultado = await respuesta.json()
        setCliente(resultado)
      } catch (error) {
        console.log(error)
      }
      setCargando(false)
    }

    obtenerClienteApi()

  }, [])
  return (
    <>
      <h1 className="font-black text-4xl text-green-600">Editar Cliente</h1>
      <p className="mt-3">Usa Este Formulario para Editar un Cliente</p>

      {cliente?.nombre ? (
        <Formulario
          cliente={cliente}
          cargando={cargando}
        />
      ) : <p>Cliente ID no válido</p>}
    </>
  )
}

export default EditarCliente;
