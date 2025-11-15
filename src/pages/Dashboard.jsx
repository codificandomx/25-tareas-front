import React, {useEffect} from 'react'
import { useNavigate } from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux'
import TareaForm from '../components/TareaForm'
import Spinner from '../components/Spinner'
import {getTareas, reset} from '../features/tareas/tareaSlice'
import { toast } from 'react-toastify'
import TareaItem from '../components/TareaItem'

const Dashboard = () => {

  const navigate = useNavigate()
  const dispatch = useDispatch()

  const {user} = useSelector((state)=> state.auth)
  const { tareas, isLoading, isError, isSuccess, message } = useSelector((state)=> state.tarea)

  useEffect(()=>{

    if (isError) {
      toast.error(message)
    }

    if(!user) {
      navigate('/login')
    } else {
      dispatch(getTareas())
    }

  }, [user, navigate, isError, message, dispatch])

  if (isLoading) {
    return <Spinner />
  }

  return (
    <>
      <section className="heading">
        <h3>Bienvenido {user && user.nombre}</h3>
        <p>Dashboard de Tareas App</p>
      </section>

      <TareaForm />

      <section className="content">
        {tareas.length > 0 ? (
            <div className='tareas'>
              {tareas.map((tarea)=>(
                <TareaItem key={tarea._id} tarea={tarea} />
              ))}
            </div>
        ):(
          <h3>No hay tareas para mostrar</h3>
        )}
      </section>
    </>
  )
}

export default Dashboard
