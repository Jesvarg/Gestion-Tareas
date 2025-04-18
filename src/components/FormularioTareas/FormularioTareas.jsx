import { useState, useEffect } from 'react'

const FormularioTarea = ({ onAgregarTarea, tareaEditando, onCancelarEdicion }) => {
  const [titulo, setTitulo] = useState('')
  const [descripcion, setDescripcion] = useState('')
  const [errores, setErrores] = useState({
    titulo: '',
    descripcion: ''
  })
  const [touched, setTouched] = useState({
    titulo: false,
    descripcion: false
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

  const handleBlur = (campo) => {
    setTouched(prev => ({ ...prev, [campo]: true }))
    const valor = campo === 'titulo' ? titulo : descripcion
    const error = validarCampo(campo, valor)
    setErrores(prev => ({ ...prev, [campo]: error }))
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
      setTouched({ titulo: false, descripcion: false })
    }
  }

  const handleKeyDown = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault()
      handleSubmit(e)
    }
  }

  const hayErrores = !!errores.titulo || !!errores.descripcion

  return (
    <form onSubmit={handleSubmit} className="form-container">
      <div className="form-group">
        <label htmlFor="titulo" className="form-label">
          Título * <span></span>
        </label>
        <input
          type="text"
          id="titulo"
          value={titulo}
          onChange={(e) => handleChange('titulo', e.target.value)}
          onBlur={() => handleBlur('titulo')}
          onKeyDown={handleKeyDown}
          maxLength={15}
          className={`input-base ${
            touched.titulo && errores.titulo ? 'border-red-500' : ''
          }`}
          placeholder="Ingrese el nombre de la tarea"
          aria-invalid={touched.titulo && !!errores.titulo}
          aria-describedby="titulo-error"
        />
        <div className="flex justify-between text-xs mt-1">
          <span id="titulo-error" className="error-message">
            {touched.titulo && errores.titulo}
          </span>
          <span className="text-gray-500">{titulo.length}/15</span>
        </div>
      </div>

      <div className="form-group">
        <label htmlFor="descripcion" className="form-label">
          Descripción <span></span>
        </label>
        <textarea
          id="descripcion"
          value={descripcion}
          onChange={(e) => handleChange('descripcion', e.target.value)}
          onBlur={() => handleBlur('descripcion')}
          onKeyDown={handleKeyDown}
          maxLength={50}
          className={`input-base ${
            touched.descripcion && errores.descripcion ? 'border-red-500' : ''
          }`}
          placeholder="Ingrese la descripción de la tarea"
          rows="3"
          aria-invalid={touched.descripcion && !!errores.descripcion}
          aria-describedby="descripcion-error"
        />
        <div className="flex justify-between text-xs mt-1">
          <span id="descripcion-error" className="error-message">
            {touched.descripcion && errores.descripcion}
          </span>
          <span className="text-gray-500">{descripcion.length}/50</span>
        </div>
      </div>

      <div className="flex flex-col sm:flex-row items-center justify-center gap-2">
        <button
          type="submit"
          disabled={hayErrores || !titulo.trim()}
          className={`button-primary w-full sm:w-auto ${
            hayErrores || !titulo.trim() ? 'opacity-50 cursor-not-allowed' : ''
          }`}
        >
          {tareaEditando ? 'Guardar Cambios' : 'Agregar Tarea'}
        </button>
        {tareaEditando && (
          <button
            type="button"
            onClick={onCancelarEdicion}
            className="button-gray w-full sm:w-auto"
          >
            Cancelar
          </button>
        )}
      </div>
    </form>
  )
}

export default FormularioTarea