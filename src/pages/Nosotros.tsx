import { useEffect, useState } from 'react'
import { IconWhatsApp } from '../components/Icons'
import { obtenerConfiguracion } from '../services/configuracion'
import { CONFIGURACION } from '../data/mockData'
import './Estaticas.css'

const WHATSAPP_URL =
  'https://wa.me/5491132527581?text=%C2%A1Hola%20Gastrolibertad!%20Quiero%20hacer%20una%20consulta%20sobre%20sus%20productos.'

export default function Nosotros() {
  const [imagen, setImagen] = useState(CONFIGURACION.nosotrosImagen)

  useEffect(() => {
    obtenerConfiguracion().then((c) => setImagen(c.nosotrosImagen))
  }, [])

  return (
    <section className="container nosotros">
      <div className="nosotros__grid">
        <div>
          <h1>Gastrolibertad</h1>
          <p>
            Somos un comercio dedicado a la venta de cocinas, campanas,
            artículos para el hogar y emprendimientos, ofreciendo soluciones
            prácticas y funcionales para equipar tu cocina y tus espacios.
          </p>
          <p>
            Vas a encontrar productos pensados tanto para el uso diario como
            para quienes buscan renovar o mejorar su hogar, con una atención
            cercana y personalizada.
          </p>
          <p>
            Contamos con más de 10+ años de experiencia en el rubro y más de
            1000+ ventas realizadas, con clientes satisfechos por el
            servicio.
          </p>
          <p>
            Nos encontrás en Juan B. Justo 2550, entre España y Eva Perón,
            Libertad, Merlo.
          </p>
          <p>
            Horario de atención: Lunes a viernes 9:30 a 13:00 y 14:00 a
            16:30 · Sábados 9:00 a 13:00.
          </p>
          <a
            href={WHATSAPP_URL}
            target="_blank"
            rel="noreferrer"
            className="btn btn-whatsapp"
          >
            <IconWhatsApp size={16} /> Hablar con nosotros
          </a>
        </div>
        <div className="nosotros__imagen">
          <img src={imagen} alt="Cocina equipada por Gastrolibertad" />
        </div>
      </div>
    </section>
  )
}
