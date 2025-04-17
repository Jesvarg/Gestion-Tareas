import Tarea from '../Tarea/Tarea'
import { motion, AnimatePresence } from 'framer-motion'

const ListaTareas = ({ tareas, onEliminarTarea, onActualizarTarea, onIniciarEdicion, onCompletarTarea }) => {
  if (tareas.length === 0) {
    return (
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className="text-center py-8"
      >
        <p className="text-gray-500 text-lg">Aún no hay tareas</p>
      </motion.div>
    )
  }

  return (
    <div className="grid gap-4">
      <AnimatePresence>
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
      </AnimatePresence>
    </div>
  )
}

export default ListaTareas