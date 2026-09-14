import { useEffect, useState } from 'react'
import {
  obtenerConfiguracion,
  actualizarConfiguracion,
} from '../../services/configuracion'
import type { ConfiguracionSitio } from '../../types'
import { CONFIGURACION } from '../../data/mockData'
import ImageInput from '../../components/ImageInput'

const CAMPOS: { key: keyof ConfiguracionSitio; label: string; ayuda: string }[] = [
  {
    key: 'heroImagen',
    label: 'Imagen principal del hero (Home)',
    ayuda: 'La foto grande de la izquierda, arriba de todo en la Home.',
  },
  {
    key: 'tileCocinas',
    label: 'Tile "Cocinas a gas/eléctrica"',
    ayuda: 'La foto chica de arriba a la derecha, al lado del hero.',
  },
  {
    key: 'tileVariedad',
    label: 'Tile "Tenemos variedad de artículos"',
    ayuda: 'La foto de abajo a la derecha, la del cartel de bicicletas/colchones/muebles.',
  },
  {
    key: 'tileCampanas',
    label: 'Tile "Campanas extractoras"',
    ayuda: 'Primera foto de la fila de 3 categorías, debajo del hero.',
  },
  {
    key: 'tileElectro',
    label: 'Tile "Electrodomésticos"',
    ayuda: 'Segunda foto de esa misma fila.',
  },
  {
    key: 'tileAccesorios',
    label: 'Tile "Accesorios para el hogar"',
    ayuda: 'Tercera foto de esa misma fila.',
  },
  {
    key: 'nosotrosImagen',
    label: 'Foto de la página Nosotros',
    ayuda: 'La foto que aparece al lado del texto en /nosotros.',
  },
]

export default function DisenioPanel() {
  const [config, setConfig] = useState<ConfiguracionSitio>(CONFIGURACION)
  const [cargando, setCargando] = useState(true)
  const [guardando, setGuardando] = useState(false)
  const [guardado, setGuardado] = useState(false)

  useEffect(() => {
    obtenerConfiguracion()
      .then(setConfig)
      .finally(() => setCargando(false))
  }, [])

  async function guardar() {
    setGuardando(true)
    setGuardado(false)
    await actualizarConfiguracion(config)
    setGuardando(false)
    setGuardado(true)
    setTimeout(() => setGuardado(false), 2500)
  }

  if (cargando) return <p>Cargando…</p>

  return (
    <div>
      <p className="admin-panel__hint">
        Pegá la URL de una foto (por ejemplo, subida a Google Drive, Imgur o
        cualquier link directo a una imagen) para reemplazar cada foto de
        ejemplo del sitio. Dejá el campo vacío para volver a mostrar el
        placeholder de ejemplo.
      </p>

      <div className="disenio-grid">
        {CAMPOS.map((campo) => (
          <div className="disenio-campo" key={campo.key}>
            <ImageInput
              label={campo.label}
              value={config[campo.key]}
              onChange={(url) => setConfig({ ...config, [campo.key]: url })}
            />
            <p className="disenio-campo__ayuda">{campo.ayuda}</p>
          </div>
        ))}
      </div>

      <div className="admin-panel__toolbar" style={{ marginTop: 24 }}>
        <span />
        <button
          className="btn btn-primary"
          onClick={guardar}
          disabled={guardando}
        >
          {guardando ? 'Guardando…' : guardado ? '✓ Guardado' : 'Guardar cambios'}
        </button>
      </div>
    </div>
  )
}
