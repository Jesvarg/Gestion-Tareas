import { useState } from 'react'

const Tarea = ({ tarea, onEliminar, onActualizar, onIniciarEdicion, onCompletarTarea }) => {
  const [estaEditando, setEstaEditando] = useState(false)
  const [tituloEditado, setTituloEditado] = useState(tarea.titulo)
  const [descripcionEditada, setDescripcionEditada] = useState(tarea.descripcion)

  const handleGuardar = () => {
    onActualizar(tarea.id, {
      titulo: tituloEditado,
      descripcion: descripcionEditada
    })
    setEstaEditando(false)
  }

  const handleCompletada = () => {
    onCompletarTarea(tarea.id)
  }

  return (
    <div className={`card ${tarea.completada ? 'completed' : ''}`}>
      {estaEditando ? (
        <div className="space-y-4">
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
            >
              Guardar Cambios
            </button>
            <button
              onClick={() => setEstaEditando(false)}
              className="button-gray"
            >
              Cancelar
            </button>
          </div>
        </div>
      ) : (
        <div className="flex justify-between items-start">
          <div className="flex-1">
            <div className="flex items-center gap-2">
              <input
                type="checkbox"
                checked={tarea.completada}
                onChange={handleCompletada}
                className="h-5 w-5 cursor-pointer focus-ring"
              />
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
              >
                Completada
              </button>
            ) : (
              <>
                <button
                  onClick={() => onIniciarEdicion(tarea)}
                  className="button-primary"
                >
                  Editar
                </button>
                <button
                  onClick={() => onEliminar(tarea.id)}
                  className="button-danger"
                >
                  Eliminar
                </button>
              </>
            )}
          </div>
        </div>
      )}
    </div>
  )
}

export default Tarea 