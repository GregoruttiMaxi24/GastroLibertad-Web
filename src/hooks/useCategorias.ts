import { useEffect, useState } from 'react'
import { listarCategorias } from '../services/categorias'
import type { CategoriaItem } from '../types'

export function useCategorias() {
  const [categorias, setCategorias] = useState<CategoriaItem[]>([])
  const [cargando, setCargando] = useState(true)

  useEffect(() => {
    listarCategorias()
      .then(setCategorias)
      .finally(() => setCargando(false))
  }, [])

  return { categorias, cargando }
}
