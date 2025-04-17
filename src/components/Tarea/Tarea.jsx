import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'

const Tarea = ({ tarea, onEliminar, onActualizar, onIniciarEdicion, onCompletarTarea }) => {
  const [estaEditando, setEstaEditando] = useState(false)
  const [tituloEditado, setTituloEditado] = useState(tarea.titulo)
  const [descripcionEditada, setDescripcionEditada] = useState(tarea.descripcion)
  const [mostrarConfirmacion, setMostrarConfirmacion] = useState(false)

  const handleGuardar = () => {
    onActualizar(tarea.id, {
      titulo: tituloEditado,
      descripcion: descripcionEditada
    })
    setEstaEditando(false)
  }

  const handleCompletada = () => {
    onCompletarTarea(tarea.id, !tarea.completada)
  }

  const handleEliminar = () => {
    setMostrarConfirmacion(true)
  }

  const confirmarEliminacion = () => {
    onEliminar(tarea.id)
    setMostrarConfirmacion(false)
  }

  const cancelarEliminacion = () => {
    setMostrarConfirmacion(false)
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      className={`card ${tarea.completada ? 'completed' : ''}`}
    >
      {estaEditando ? (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="space-y-4"
        >
          <input
            type="text"
            value={tituloEditado}
            onChange={(e) => setTituloEditado(e.target.value)}
            className="input-base focus-ring"
            placeholder="Nombre"
          />
          <textarea
            value={descripcionEditada}
            onChange={(e) => setDescripcionEditada(e.target.value)}
            className="input-base focus-ring"
            placeholder="Descripción"
            rows="3"
          />
          <div className="flex gap-2">
            <button
              onClick={handleGuardar}
              className="button-success"
              aria-label="Guardar cambios"
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
              </svg>
            </button>
            <button
              onClick={() => setEstaEditando(false)}
              className="button-gray"
              aria-label="Cancelar edición"
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clipRule="evenodd" />
              </svg>
            </button>
          </div>
        </motion.div>
      ) : (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="flex justify-between items-start"
        >
          <div className="flex-1">
            <div className="flex items-center gap-2">
              <button
                onClick={handleCompletada}
                className="focus:outline-none"
                aria-label={tarea.completada ? "Marcar como pendiente" : "Marcar como completada"}
              >
                <motion.div
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className={`h-6 w-6 cursor-pointer transition-colors duration-200 ${
                      tarea.completada ? 'text-green-500' : 'text-gray-400'
                    }`}
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <motion.rect
                      x="3"
                      y="3"
                      width="18"
                      height="18"
                      rx="2"
                      strokeWidth="2"
                      initial={{ pathLength: 0 }}
                      animate={{ pathLength: 1 }}
                      transition={{ duration: 0.5 }}
                    />
                    {tarea.completada && (
                      <motion.path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="M9 12l2 2 4-4"
                        initial={{ pathLength: 0 }}
                        animate={{ pathLength: 1 }}
                        transition={{ duration: 0.5 }}
                      />
                    )}
                  </svg>
                </motion.div>
              </button>
              <h3 className={`text-lg font-medium ${tarea.completada ? 'completed' : 'text-gray-800'}`}>
                {tarea.titulo}
              </h3>
            </div>
            {tarea.descripcion && (
              <p className={`mt-2 ${tarea.completada ? 'completed' : 'text-gray-600'}`}>
                {tarea.descripcion}
              </p>
            )}
          </div>
          <div className="flex gap-2">
            {tarea.completada ? (
              <button
                disabled
                className="button-success opacity-50 cursor-not-allowed"
                aria-label="Tarea completada"
              >
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                  <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                </svg>
              </button>
            ) : (
              <>
                <button
                  onClick={() => onIniciarEdicion(tarea)}
                  className="button-primary"
                  aria-label="Editar tarea"
                >
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                    <path d="M13.586 3.586a2 2 0 112.828 2.828l-.793.793-2.828-2.828.793-.793zM11.379 5.793L3 14.172V17h2.828l8.38-8.379-2.83-2.828z" />
                  </svg>
                </button>
                <button
                  onClick={handleEliminar}
                  className="button-danger"
                  aria-label="Eliminar tarea"
                >
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                    <path fillRule="evenodd" d="M9 2a1 1 0 00-.894.553L7.382 4H4a1 1 0 000 2v10a2 2 0 002 2h8a2 2 0 002-2V6a1 1 0 100-2h-3.382l-.724-1.447A1 1 0 0011 2H9zM7 8a1 1 0 012 0v6a1 1 0 11-2 0V8zm5-1a1 1 0 00-1 1v6a1 1 0 102 0V8a1 1 0 00-1-1z" clipRule="evenodd" />
                  </svg>
                </button>
              </>
            )}
          </div>
        </motion.div>
      )}

      <AnimatePresence>
        {mostrarConfirmacion && (
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.9 }}
            className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50"
          >
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 20 }}
              className="bg-white p-6 rounded-lg shadow-lg max-w-sm w-full"
            >
              <h3 className="text-lg font-medium text-gray-900 mb-4">
                ¿Estás seguro de eliminar la tarea?
              </h3>
              <div className="flex justify-end gap-3">
                <button
                  onClick={cancelarEliminacion}
                  className="button-gray"
                >
                  Cancelar
                </button>
                <button
                  onClick={confirmarEliminacion}
                  className="button-danger"
                >
                  Confirmar
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  )
}

export default Tarea 