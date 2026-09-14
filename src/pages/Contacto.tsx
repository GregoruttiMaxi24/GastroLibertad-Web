import { useState, type FormEvent } from 'react'
import { IconMapPin, IconClock, IconWhatsApp } from '../components/Icons'
import { IconTruck } from '../components/Icons'
import './Estaticas.css'

const DIRECCION = 'Juan B. Justo 2550, Libertad, Merlo, Buenos Aires'
const MAPS_EMBED = `https://www.google.com/maps?q=${encodeURIComponent(
  DIRECCION
)}&output=embed`
const MAPS_LINK = `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(
  DIRECCION
)}`

export default function Contacto() {
  const [producto, setProducto] = useState('')
  const [detalle, setDetalle] = useState('')

  function enviar(e: FormEvent) {
    e.preventDefault()
    const lineas = [
      '¡Hola Gastrolibertad!',
      producto && `Me interesa: ${producto}`,
      detalle && `Detalle: ${detalle}`,
    ].filter(Boolean)
    const mensaje = encodeURIComponent(lineas.join('\n'))
    window.open(`https://wa.me/5491132527581?text=${mensaje}`, '_blank')
  }

  return (
    <section className="container contacto">
      <h1>Contacto</h1>
      <p>Armá tu consulta y se abre WhatsApp con el mensaje listo para enviar.</p>

      <div className="contacto__grid">
        <form className="contacto__form" onSubmit={enviar}>
          <label>
            ¿Qué producto te interesa?
            <input
              value={producto}
              onChange={(e) => setProducto(e.target.value)}
              placeholder="Ej: Cocina industrial 4 hornallas"
            />
          </label>
          <label>
            Detalle de la consulta
            <textarea
              rows={4}
              value={detalle}
              onChange={(e) => setDetalle(e.target.value)}
              placeholder="Contanos color, medidas, zona de envío…"
            />
          </label>
          <button type="submit" className="btn btn-whatsapp">
            <IconWhatsApp size={16} /> Enviar consulta por WhatsApp
          </button>
        </form>

        <div className="contacto__info">
          <div className="contacto__info-item">
            <IconMapPin />
            <span>
              Juan B. Justo 2550, entre España y Eva Perón, Libertad, Merlo
            </span>
          </div>
          <div className="contacto__info-item">
            <IconClock />
            <span>
              Lunes a viernes 9:30 a 13:00 y 14:00 a 16:30 · Sábados 9:00 a
              13:00
            </span>
          </div>
          <div className="contacto__info-item">
            <IconTruck />
            <span>Envíos en Capital Federal y Zona Oeste del Gran Buenos Aires</span>
          </div>
        </div>
      </div>

      <h2 className="contacto__mapa-titulo">Dónde estamos</h2>
      <p>Juan B. Justo 2550, entre España y Eva Perón, Libertad, Merlo</p>
      <div className="contacto__mapa">
        <iframe
          title="Ubicación de Gastrolibertad"
          src={MAPS_EMBED}
          loading="lazy"
          referrerPolicy="no-referrer-when-downgrade"
        />
      </div>
      <a href={MAPS_LINK} target="_blank" rel="noreferrer" className="contacto__mapa-link">
        Cómo llegar en Google Maps
      </a>
    </section>
  )
}
