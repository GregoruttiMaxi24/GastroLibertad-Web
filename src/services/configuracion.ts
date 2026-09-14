import { supabase, isSupabaseConfigured } from '../lib/supabase'
import { CONFIGURACION, setMockConfiguracion } from '../data/mockData'
import type { ConfiguracionSitio } from '../types'

export async function obtenerConfiguracion(): Promise<ConfiguracionSitio> {
  if (isSupabaseConfigured && supabase) {
    const { data, error } = await supabase
      .from('configuracion')
      .select('*')
      .eq('id', 'home')
      .single()
    if (error || !data) return CONFIGURACION
    return {
      heroImagen: data.hero_imagen,
      tileCocinas: data.tile_cocinas,
      tileVariedad: data.tile_variedad,
      tileCampanas: data.tile_campanas,
      tileElectro: data.tile_electro,
      tileAccesorios: data.tile_accesorios,
      nosotrosImagen: data.nosotros_imagen,
    }
  }
  return Promise.resolve(CONFIGURACION)
}

export async function actualizarConfiguracion(
  config: ConfiguracionSitio
): Promise<void> {
  if (isSupabaseConfigured && supabase) {
    const { error } = await supabase.from('configuracion').upsert({
      id: 'home',
      hero_imagen: config.heroImagen,
      tile_cocinas: config.tileCocinas,
      tile_variedad: config.tileVariedad,
      tile_campanas: config.tileCampanas,
      tile_electro: config.tileElectro,
      tile_accesorios: config.tileAccesorios,
      nosotros_imagen: config.nosotrosImagen,
    })
    if (error) throw error
    return
  }
  setMockConfiguracion(config)
}
