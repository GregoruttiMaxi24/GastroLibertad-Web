import { supabase, isSupabaseConfigured } from '../lib/supabase'
import { TESTIMONIOS, setMockTestimonios } from '../data/mockData'
import type { Testimonio } from '../types'

const uid = () => Math.random().toString(36).slice(2, 10)

export async function listarTestimonios(
  soloAprobados = false
): Promise<Testimonio[]> {
  if (isSupabaseConfigured && supabase) {
    let query = supabase
      .from('testimonios')
      .select('*')
      .order('creado_en', { ascending: false })
    if (soloAprobados) query = query.eq('aprobado', true)
    const { data, error } = await query
    if (error) throw error
    return data as Testimonio[]
  }
  const lista = soloAprobados
    ? TESTIMONIOS.filter((t) => t.aprobado)
    : TESTIMONIOS
  return Promise.resolve([...lista])
}

export async function crearTestimonio(
  testimonio: Omit<Testimonio, 'id' | 'creadoEn'>
): Promise<Testimonio> {
  if (isSupabaseConfigured && supabase) {
    const { data, error } = await supabase
      .from('testimonios')
      .insert(testimonio)
      .select()
      .single()
    if (error) throw error
    return data as Testimonio
  }
  const nuevo: Testimonio = {
    ...testimonio,
    id: uid(),
    creadoEn: new Date().toISOString(),
  }
  setMockTestimonios([nuevo, ...TESTIMONIOS])
  return Promise.resolve(nuevo)
}

export async function actualizarTestimonio(
  id: string,
  cambios: Partial<Testimonio>
): Promise<void> {
  if (isSupabaseConfigured && supabase) {
    const { error } = await supabase
      .from('testimonios')
      .update(cambios)
      .eq('id', id)
    if (error) throw error
    return
  }
  setMockTestimonios(
    TESTIMONIOS.map((t) => (t.id === id ? { ...t, ...cambios } : t))
  )
}

export async function eliminarTestimonio(id: string): Promise<void> {
  if (isSupabaseConfigured && supabase) {
    const { error } = await supabase.from('testimonios').delete().eq('id', id)
    if (error) throw error
    return
  }
  setMockTestimonios(TESTIMONIOS.filter((t) => t.id !== id))
}
