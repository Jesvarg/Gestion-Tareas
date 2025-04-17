import { useState, useEffect } from 'react'

const FormularioTarea = ({ onAgregarTarea, tareaEditando, onCancelarEdicion }) => {
  const [titulo, setTitulo] = useState('')
  const [descripcion, setDescripcion] = useState('')
  const [errores, setErrores] = useState({
    titulo: '',
    descripcion: ''
  })

  useEffect(() => {
    if (tareaEditando) {
      setTitulo(tareaEditando.titulo)
      setDescripcion(tareaEditando.descripcion)
    } else {
      setTitulo('')
      setDescripcion('')
    }
  }, [tareaEditando])

  const validarCampo = (campo, valor) => {
    switch (campo) {
      case 'titulo':
        if (!valor.trim()) {
          return 'El nombre es requerido'
        }
        if (valor.length > 15) {
          return 'El nombre no puede tener más de 15 caracteres'
        }
        return ''
      case 'descripcion':
        if (valor.length > 50) {
          return 'La descripción no puede tener más de 50 caracteres'
        }
        return ''
      default:
        return ''
    }
  }

  const handleChange = (campo, valor) => {
    const error = validarCampo(campo, valor)
    setErrores(prev => ({ ...prev, [campo]: error }))
    
    if (campo === 'titulo') {
      setTitulo(valor)
    } else {
      setDescripcion(valor)
    }
  }

  const validarFormulario = () => {
    const tituloError = validarCampo('titulo', titulo)
    const descripcionError = validarCampo('descripcion', descripcion)
    
    setErrores({
      titulo: tituloError,
      descripcion: descripcionError
    })

    return !tituloError && !descripcionError
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

  const handleKeyDown = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault()
      handleSubmit(e)
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
          onChange={(e) => handleChange('titulo', e.target.value)}
          onKeyDown={handleKeyDown}
          maxLength={15}
          className={`input-base focus-ring ${
            errores.titulo ? 'border-red-500' : ''
          }`}
          placeholder="Ingrese el nombre de la tarea"
          aria-invalid={!!errores.titulo}
          aria-describedby="titulo-error"
        />
        <div className="flex justify-between text-xs mt-1">
          <span id="titulo-error" className="text-red-500">
            {errores.titulo}
          </span>
          <span className="text-gray-500">{titulo.length}/15</span>
        </div>
      </div>

      <div className="mb-6">
        <label htmlFor="descripcion" className="block text-gray-700 text-sm font-bold mb-2">
          Descripción <span></span>
        </label>
        <textarea
          id="descripcion"
          value={descripcion}
          onChange={(e) => handleChange('descripcion', e.target.value)}
          onKeyDown={handleKeyDown}
          maxLength={50}
          className={`input-base focus-ring ${
            errores.descripcion ? 'border-red-500' : ''
          }`}
          placeholder="Ingrese la descripción de la tarea"
          rows="4"
          aria-invalid={!!errores.descripcion}
          aria-describedby="descripcion-error"
        />
        <div className="flex justify-between text-xs mt-1">
          <span id="descripcion-error" className="text-red-500">
            {errores.descripcion}
          </span>
          <span className="text-gray-500">{descripcion.length}/50</span>
        </div>
      </div>

      <div className="flex items-center justify-center gap-2">
        <button
          type="submit"
          disabled={!!errores.titulo || !titulo.trim()}
          className={`button-primary ${
            !!errores.titulo || !titulo.trim() ? 'disabled' : ''
          }`}
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