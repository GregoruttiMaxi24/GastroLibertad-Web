import { supabase, isSupabaseConfigured } from '../lib/supabase'
import { CATEGORIAS, setMockCategorias } from '../data/mockData'
import type { CategoriaItem } from '../types'

const uid = () => Math.random().toString(36).slice(2, 10)

function filaACategoria(fila: any): CategoriaItem {
  return {
    id: fila.id,
    valor: fila.valor,
    etiqueta: fila.etiqueta,
    orden: fila.orden ?? 0,
  }
}

export async function listarCategorias(): Promise<CategoriaItem[]> {
  if (isSupabaseConfigured && supabase) {
    const { data, error } = await supabase
      .from('categorias')
      .select('*')
      .order('orden', { ascending: true })
    if (error) throw error
    return (data ?? []).map(filaACategoria)
  }
  return Promise.resolve([...CATEGORIAS])
}

export async function crearCategoria(
  categoria: Omit<CategoriaItem, 'id'>
): Promise<CategoriaItem> {
  if (isSupabaseConfigured && supabase) {
    const { data, error } = await supabase
      .from('categorias')
      .insert({
        valor: categoria.valor,
        etiqueta: categoria.etiqueta,
        orden: categoria.orden,
      })
      .select()
      .single()
    if (error) throw error
    return filaACategoria(data)
  }
  const nueva: CategoriaItem = { ...categoria, id: uid() }
  setMockCategorias([...CATEGORIAS, nueva])
  return Promise.resolve(nueva)
}

export async function actualizarCategoria(
  id: string,
  cambios: Partial<CategoriaItem>
): Promise<void> {
  if (isSupabaseConfigured && supabase) {
    const fila: Record<string, unknown> = {}
    if (cambios.valor !== undefined) fila.valor = cambios.valor
    if (cambios.etiqueta !== undefined) fila.etiqueta = cambios.etiqueta
    if (cambios.orden !== undefined) fila.orden = cambios.orden

    const { error } = await supabase.from('categorias').update(fila).eq('id', id)
    if (error) throw error
    return
  }
  setMockCategorias(
    CATEGORIAS.map((c) => (c.id === id ? { ...c, ...cambios } : c))
  )
}

export async function eliminarCategoria(id: string): Promise<void> {
  if (isSupabaseConfigured && supabase) {
    const { error } = await supabase.from('categorias').delete().eq('id', id)
    if (error) throw error
    return
  }
  setMockCategorias(CATEGORIAS.filter((c) => c.id !== id))
}
