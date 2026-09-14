import { supabase, isSupabaseConfigured } from '../lib/supabase'
import { PRODUCTOS, setMockProductos } from '../data/mockData'
import type { Producto, Especificacion } from '../types'

const uid = () => Math.random().toString(36).slice(2, 10)

// Supabase/Postgres usa nombres de columna en snake_case (precio_original,
// cantidad_stock, etc). Estas dos funciones traducen entre eso y los
// nombres que usa el resto del sitio (precioOriginal, cantidadStock, etc).

function filaAProducto(fila: any): Producto {
  return {
    id: fila.id,
    nombre: fila.nombre,
    categoria: fila.categoria,
    precio: fila.precio,
    precioOriginal: fila.precio_original ?? null,
    rating: fila.rating ?? 4.8,
    reseñas: fila.resenas ?? 0,
    stock: fila.stock,
    cantidadStock: fila.cantidad_stock ?? null,
    descripcion: fila.descripcion ?? '',
    descripcionLarga: fila.descripcion_larga ?? '',
    medidas: fila.medidas ?? '',
    especificaciones: (fila.especificaciones ?? []) as Especificacion[],
    garantiaMeses: fila.garantia_meses ?? 6,
    notasImportantes: fila.notas_importantes ?? [],
    imagenes: fila.imagenes ?? [],
    destacado: fila.destacado ?? false,
    oferta: fila.oferta ?? false,
    creadoEn: fila.creado_en,
  }
}

function productoAFila(producto: Partial<Producto>): Record<string, unknown> {
  const fila: Record<string, unknown> = {}
  if (producto.nombre !== undefined) fila.nombre = producto.nombre
  if (producto.categoria !== undefined) fila.categoria = producto.categoria
  if (producto.precio !== undefined) fila.precio = producto.precio
  if (producto.precioOriginal !== undefined)
    fila.precio_original = producto.precioOriginal
  if (producto.rating !== undefined) fila.rating = producto.rating
  if (producto.reseñas !== undefined) fila.resenas = producto.reseñas
  if (producto.stock !== undefined) fila.stock = producto.stock
  if (producto.cantidadStock !== undefined)
    fila.cantidad_stock = producto.cantidadStock
  if (producto.descripcion !== undefined) fila.descripcion = producto.descripcion
  if (producto.descripcionLarga !== undefined)
    fila.descripcion_larga = producto.descripcionLarga
  if (producto.medidas !== undefined) fila.medidas = producto.medidas
  if (producto.especificaciones !== undefined)
    fila.especificaciones = producto.especificaciones
  if (producto.garantiaMeses !== undefined)
    fila.garantia_meses = producto.garantiaMeses
  if (producto.notasImportantes !== undefined)
    fila.notas_importantes = producto.notasImportantes
  if (producto.imagenes !== undefined) fila.imagenes = producto.imagenes
  if (producto.destacado !== undefined) fila.destacado = producto.destacado
  if (producto.oferta !== undefined) fila.oferta = producto.oferta
  return fila
}

export async function listarProductos(): Promise<Producto[]> {
  if (isSupabaseConfigured && supabase) {
    const { data, error } = await supabase
      .from('productos')
      .select('*')
      .order('creado_en', { ascending: false })
    if (error) throw error
    return (data ?? []).map(filaAProducto)
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
    if (error || !data) return null
    return filaAProducto(data)
  }
  return Promise.resolve(PRODUCTOS.find((p) => p.id === id) ?? null)
}

export async function crearProducto(
  producto: Omit<Producto, 'id' | 'creadoEn'>
): Promise<Producto> {
  if (isSupabaseConfigured && supabase) {
    const { data, error } = await supabase
      .from('productos')
      .insert(productoAFila(producto))
      .select()
      .single()
    if (error) throw error
    return filaAProducto(data)
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
      .update(productoAFila(cambios))
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
