import { useState, useEffect } from 'react'
import FormularioTareas from './components/FormularioTareas/FormularioTareas'
import ListaTareas from './components/ListaTareas/ListaTareas'
import './index.css'

function App() {
  const [tareas, setTareas] = useState(() => {
    const tareasGuardadas = localStorage.getItem('tareas')
    return tareasGuardadas ? JSON.parse(tareasGuardadas) : []
  })
  const [tareaEditando, setTareaEditando] = useState(null)
  const [mensaje, setMensaje] = useState('')
  const [busqueda, setBusqueda] = useState('')
  const [paginaActual, setPaginaActual] = useState(1)
  const [filtro, setFiltro] = useState('todas') // 'todas', 'pendientes', 'completadas'
  const tareasPorPagina = 5

  useEffect(() => {
    localStorage.setItem('tareas', JSON.stringify(tareas))
  }, [tareas])

  const agregarTarea = (nuevaTarea) => {
    if (tareaEditando) {
      setTareas(tareas.map(tarea => 
        tarea.id === tareaEditando.id ? nuevaTarea : tarea
      ))
      setMensaje('✅ Tarea actualizada')
    } else {
      setTareas([...tareas, nuevaTarea])
      setMensaje('✅ Tarea agregada')
    }
    setTareaEditando(null)
    setTimeout(() => setMensaje(''), 3000)
  }

  const eliminarTarea = (id) => {
    setTareas(tareas.filter(tarea => tarea.id !== id))
    setMensaje('❌ Tarea eliminada')
    setTimeout(() => setMensaje(''), 4000)
  }

  const actualizarTarea = (id, datosActualizados) => {
    setTareas(tareas.map(tarea => 
      tarea.id === id ? { ...tarea, ...datosActualizados } : tarea
    ))
  }

  const completarTarea = (id, nuevoEstado) => {
    setTareas(tareas.map(tarea => 
      tarea.id === id ? { ...tarea, completada: nuevoEstado } : tarea
    ))
    if (nuevoEstado) {
      setMensaje('✅ Tarea completada')
    } else {
      setMensaje('🕓Tarea pendiente')
    }
    setTimeout(() => setMensaje(''), 3000)
  }

  const iniciarEdicion = (tarea) => {
    setTareaEditando(tarea)
  }

  const cancelarEdicion = () => {
    setTareaEditando(null)
  }

  // Filtrar tareas
  const tareasFiltradas = tareas.filter(tarea => {
    const coincideConBusqueda = 
      tarea.titulo.toLowerCase().includes(busqueda.toLowerCase()) ||
      tarea.descripcion.toLowerCase().includes(busqueda.toLowerCase())
    
    if (filtro === 'pendientes') {
      return coincideConBusqueda && !tarea.completada
    } else if (filtro === 'completadas') {
      return coincideConBusqueda && tarea.completada
    }
    return coincideConBusqueda
  }).sort((a, b) => {
    // Ordenar tareas completadas al final
    if (a.completada && !b.completada) return 1
    if (!a.completada && b.completada) return -1
    return 0
  })

  // Calcular paginación
  const totalPaginas = Math.ceil(tareasFiltradas.length / tareasPorPagina)
  const indiceInicio = (paginaActual - 1) * tareasPorPagina
  const tareasPaginaActual = tareasFiltradas.slice(indiceInicio, indiceInicio + tareasPorPagina)

  const cambiarPagina = (nuevaPagina) => {
    setPaginaActual(nuevaPagina)
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 py-4">
      <div className="container mx-auto px-4">
        <h1 className="text-3xl font-bold text-center mb-4 text-gray-800">
          Gestor de Tareas
        </h1>
        
        {mensaje && (
          <div className="fixed top-4 right-4 p-4 bg-green-100 text-green-700 rounded-lg shadow-lg flex items-center gap-2 animate-fade-in z-50">
            <span className="text-xl">{mensaje}</span>
          </div>
        )}

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 max-w-7xl mx-auto">
          {/* Sección del formulario */}
          <div className="bg-white p-6 rounded-lg shadow-md h-fit">
            <h2 className="text-2xl font-semibold mb-4 text-gray-700">Agregar/Editar Tarea</h2>
            <FormularioTareas 
              onAgregarTarea={agregarTarea} 
              tareaEditando={tareaEditando}
              onCancelarEdicion={cancelarEdicion}
            />
          </div>

          {/* Sección de la lista de tareas */}
          <div className="bg-white p-6 rounded-lg shadow-md">
            <h2 className="text-2xl font-semibold mb-4 text-gray-700">Lista de Tareas</h2>
            
            <div className="flex items-center gap-4 mb-4">
              <div className="w-64">
                <input
                  type="text"
                  value={busqueda}
                  onChange={(e) => setBusqueda(e.target.value)}
                  placeholder="Buscar tareas..."
                  className="input-base focus-ring w-full"
                />
              </div>
              <div className="flex gap-2">
                <button
                  onClick={() => setFiltro('todas')}
                  className={`button-filter ${filtro === 'todas' ? 'active' : ''}`}
                >
                  Todas
                </button>
                <button
                  onClick={() => setFiltro('pendientes')}
                  className={`button-filter ${filtro === 'pendientes' ? 'active' : ''}`}
                >
                  Pendientes
                </button>
                <button
                  onClick={() => setFiltro('completadas')}
                  className={`button-filter ${filtro === 'completadas' ? 'active' : ''}`}
                >
                  Completadas
                </button>
              </div>
            </div>

            <div className="min-h-[400px]">
              <ListaTareas
                tareas={tareasPaginaActual}
                onEliminarTarea={eliminarTarea}
                onActualizarTarea={actualizarTarea}
                onIniciarEdicion={iniciarEdicion}
                onCompletarTarea={completarTarea}
              />
            </div>

            {/* Paginación */}
            {totalPaginas > 1 && (
              <div className="flex justify-center mt-6 gap-2">
                <button
                  onClick={() => cambiarPagina(paginaActual - 1)}
                  disabled={paginaActual === 1}
                  className="button-gray disabled:opacity-50"
                >
                  Anterior
                </button>
                {Array.from({ length: totalPaginas }, (_, i) => i + 1).map(numero => (
                  <button
                    key={numero}
                    onClick={() => cambiarPagina(numero)}
                    className={`button-base ${
                      paginaActual === numero 
                        ? 'bg-blue-500 text-white' 
                        : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
                    }`}
                  >
                    {numero}
                  </button>
                ))}
                <button
                  onClick={() => cambiarPagina(paginaActual + 1)}
                  disabled={paginaActual === totalPaginas}
                  className="button-gray disabled:opacity-50"
                >
                  Siguiente
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}

export default App
