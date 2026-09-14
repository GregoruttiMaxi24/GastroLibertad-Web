import { supabase, isSupabaseConfigured } from '../lib/supabase'
import { PRODUCTOS, setMockProductos } from '../data/mockData'
import type { Producto } from '../types'

const uid = () => Math.random().toString(36).slice(2, 10)

export async function listarProductos(): Promise<Producto[]> {
  if (isSupabaseConfigured && supabase) {
    const { data, error } = await supabase
      .from('productos')
      .select('*')
      .order('creado_en', { ascending: false })
    if (error) throw error
    return data as Producto[]
  }
  return Promise.resolve([...PRODUCTOS])
}

export async function obtenerProducto(id: string): Promise<Producto | null> {
  if (isSupabaseConfigured && supabase) {
    const { data, error } = await supabase
      .from('productos')
      .select('*')
      .eq('id', id)
      .single()
    if (error) return null
    return data as Producto
  }
  return Promise.resolve(PRODUCTOS.find((p) => p.id === id) ?? null)
}

export async function crearProducto(
  producto: Omit<Producto, 'id' | 'creadoEn'>
): Promise<Producto> {
  if (isSupabaseConfigured && supabase) {
    const { data, error } = await supabase
      .from('productos')
      .insert(producto)
      .select()
      .single()
    if (error) throw error
    return data as Producto
  }
  const nuevo: Producto = {
    ...producto,
    id: uid(),
    creadoEn: new Date().toISOString(),
  }
  setMockProductos([nuevo, ...PRODUCTOS])
  return Promise.resolve(nuevo)
}

export async function actualizarProducto(
  id: string,
  cambios: Partial<Producto>
): Promise<void> {
  if (isSupabaseConfigured && supabase) {
    const { error } = await supabase
      .from('productos')
      .update(cambios)
      .eq('id', id)
    if (error) throw error
    return
  }
  setMockProductos(
    PRODUCTOS.map((p) => (p.id === id ? { ...p, ...cambios } : p))
  )
}

export async function eliminarProducto(id: string): Promise<void> {
  if (isSupabaseConfigured && supabase) {
    const { error } = await supabase.from('productos').delete().eq('id', id)
    if (error) throw error
    return
  }
  setMockProductos(PRODUCTOS.filter((p) => p.id !== id))
}
