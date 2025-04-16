import { useState, useEffect } from 'react'

const FormularioTarea = ({ onAgregarTarea, tareaEditando, onCancelarEdicion }) => {
  const [titulo, setTitulo] = useState('')
  const [descripcion, setDescripcion] = useState('')
  const [error, setError] = useState('')

  useEffect(() => {
    if (tareaEditando) {
      setTitulo(tareaEditando.titulo)
      setDescripcion(tareaEditando.descripcion)
    } else {
      setTitulo('')
      setDescripcion('')
    }
  }, [tareaEditando])

  const validarFormulario = () => {
    if (!titulo.trim()) {
      setError('El nombre es requerido')
      return false
    }
    if (titulo.length > 15) {
      setError('El nombre no puede tener más de 15 caracteres')
      return false
    }
    if (descripcion.length > 50) {
      setError('La descripción no puede tener más de 50 caracteres')
      return false
    }
    setError('')
    return true
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    if (validarFormulario()) {
      onAgregarTarea({
        id: tareaEditando ? tareaEditando.id : Date.now(),
        titulo: titulo.trim(),
        descripcion: descripcion.trim(),
        completada: tareaEditando ? tareaEditando.completada : false
      })
      setTitulo('')
      setDescripcion('')
    }
  }

  return (
    <form onSubmit={handleSubmit} className="w-full">
      <div className="mb-4">
        <label htmlFor="titulo" className="block text-gray-700 text-sm font-bold mb-2">
          Título * <span></span>
        </label>
        <input
          type="text"
          id="titulo"
          value={titulo}
          onChange={(e) => setTitulo(e.target.value)}
          maxLength={15}
          className="input-base focus-ring"
          placeholder="Ingrese el nombre de la tarea"
        />
        <div className="flex justify-between text-xs text-gray-500 mt-1">
          <span>{error && <span className="text-red-500">{error}</span>}</span>
          <span>{titulo.length}/15</span>
        </div>
      </div>

      <div className="mb-6">
        <label htmlFor="descripcion" className="block text-gray-700 text-sm font-bold mb-2">
          Descripción <span></span>
        </label>
        <textarea
          id="descripcion"
          value={descripcion}
          onChange={(e) => setDescripcion(e.target.value)}
          maxLength={50}
          className="input-base focus-ring"
          placeholder="Ingrese la descripción de la tarea"
          rows="4"
        />
        <div className="flex justify-end text-xs text-gray-500 mt-1">
          <span>{descripcion.length}/50</span>
        </div>
      </div>

      <div className="flex items-center justify-center gap-2">
        <button
          type="submit"
          disabled={!!error || !titulo.trim()}
          className={`button-primary ${!!error || !titulo.trim() ? 'disabled' : ''}`}
        >
          {tareaEditando ? 'Guardar Cambios' : 'Agregar Tarea'}
        </button>
        {tareaEditando && (
          <button
            type="button"
            onClick={onCancelarEdicion}
            className="button-gray"
          >
            Cancelar
          </button>
        )}
      </div>
    </form>
  )
}

export default FormularioTarea