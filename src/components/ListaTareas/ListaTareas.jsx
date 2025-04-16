import Tarea from '../Tarea/Tarea'

const ListaTareas = ({ tareas, onEliminarTarea, onActualizarTarea, onIniciarEdicion, onCompletarTarea }) => {
  if (tareas.length === 0) {
    return (
      <div className="text-center py-8">
        <p className="text-gray-500 text-lg">Aún no hay tareas</p>
      </div>
    )
  }

  return (
    <div className="grid gap-4">
      {tareas.map(tarea => (
        <Tarea
          key={tarea.id}
          tarea={tarea}
          onEliminar={onEliminarTarea}
          onActualizar={onActualizarTarea}
          onIniciarEdicion={onIniciarEdicion}
          onCompletarTarea={onCompletarTarea}
        />
      ))}
    </div>
  )
}

export default ListaTareas