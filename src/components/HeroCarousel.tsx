import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import type { Producto, ConfiguracionSitio } from '../types'
import { IconWhatsApp, IconChevronLeft, IconChevronRight } from './Icons'
import './HeroCarousel.css'

const WHATSAPP_URL =
  'https://wa.me/5491132527581?text=%C2%A1Hola%20Gastrolibertad!%20Quiero%20hacer%20una%20consulta%20sobre%20sus%20productos.'

const formatoPrecio = new Intl.NumberFormat('es-AR', {
  style: 'currency',
  currency: 'ARS',
  maximumFractionDigits: 0,
})

type Slide = { tipo: 'marca' } | { tipo: 'producto'; producto: Producto }

export default function HeroCarousel({
  config,
  ofertas,
}: {
  config: ConfiguracionSitio
  ofertas: Producto[]
}) {
  const slides: Slide[] = [
    { tipo: 'marca' },
    ...ofertas.slice(0, 3).map((p) => ({ tipo: 'producto' as const, producto: p })),
  ]
  const [activo, setActivo] = useState(0)

  useEffect(() => {
    setActivo((i) => (i >= slides.length ? 0 : i))
  }, [slides.length])

  useEffect(() => {
    if (slides.length <= 1) return
    const intervalo = setInterval(() => {
      setActivo((i) => (i + 1) % slides.length)
    }, 6000)
    return () => clearInterval(intervalo)
  }, [slides.length])

  function anterior() {
    setActivo((i) => (i === 0 ? slides.length - 1 : i - 1))
  }
  function siguiente() {
    setActivo((i) => (i + 1) % slides.length)
  }

  return (
    <div className="hero-carousel">
      {slides.map((slide, i) => {
        const imagen =
          slide.tipo === 'marca' ? config.heroImagen : slide.producto.imagenes[0]

        return (
          <div
            key={slide.tipo === 'marca' ? 'marca' : slide.producto.id}
            className={`hero-carousel__slide ${i === activo ? 'is-active' : ''}`}
            style={{ backgroundImage: `url(${imagen})` }}
          >
            <div className="hero__overlay" />

            {slide.tipo === 'marca' ? (
              <div className="hero__content">
                <p className="hero__eyebrow">
                  Envíos en Capital Federal y Zona Oeste del Gran Buenos Aires
                </p>
                <h1>Equipamos tu cocina y también tu casa</h1>
                <p>
                  Cocinas, campanas y artículos para el hogar. Sin carrito:
                  consultás stock y precio por WhatsApp y te respondemos al
                  momento.
                </p>
                <p>
                  Consultá también por heladeras, aires acondicionados, bicis,
                  alacenas, muebles y más.
                </p>
                <div className="hero__actions">
                  <a
                    href={WHATSAPP_URL}
                    target="_blank"
                    rel="noreferrer"
                    className="btn btn-whatsapp"
                  >
                    <IconWhatsApp size={16} /> Consultar por WhatsApp
                  </a>
                  <Link to="/tienda" className="btn hero__btn-ver">
                    Ver productos →
                  </Link>
                </div>
              </div>
            ) : (
              <div className="hero__content">
                <span className="badge badge-oferta">Oferta</span>
                <h1 className="hero-carousel__titulo-producto">
                  {slide.producto.nombre}
                </h1>
                <div className="hero-carousel__precios">
                  {slide.producto.precioOriginal && (
                    <span className="hero-carousel__precio-original">
                      {formatoPrecio.format(slide.producto.precioOriginal)}
                    </span>
                  )}
                  <span className="hero-carousel__precio">
                    {formatoPrecio.format(slide.producto.precio)}
                  </span>
                </div>
                <div className="hero__actions">
                  <Link
                    to={`/tienda/${slide.producto.id}`}
                    className="btn btn-whatsapp"
                  >
                    Ver esta oferta →
                  </Link>
                </div>
              </div>
            )}
          </div>
        )
      })}

      {slides.length > 1 && (
        <>
          <button
            className="hero-carousel__arrow hero-carousel__arrow--left"
            onClick={anterior}
            aria-label="Diapositiva anterior"
          >
            <IconChevronLeft />
          </button>
          <button
            className="hero-carousel__arrow hero-carousel__arrow--right"
            onClick={siguiente}
            aria-label="Diapositiva siguiente"
          >
            <IconChevronRight />
          </button>

          <div className="hero-carousel__dots">
            {slides.map((_, i) => (
              <button
                key={i}
                className={`hero-carousel__dot ${i === activo ? 'is-active' : ''}`}
                onClick={() => setActivo(i)}
                aria-label={`Ir a la diapositiva ${i + 1}`}
              />
            ))}
          </div>
        </>
      )}
    </div>
  )
}
