import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { listarProductos } from '../services/productos'
import { listarTestimonios } from '../services/testimonios'
import { obtenerConfiguracion } from '../services/configuracion'
import ProductCard from '../components/ProductCard'
import HeroCarousel from '../components/HeroCarousel'
import Reveal from '../components/Reveal'
import { IconAward, IconUsers, IconStar, IconTruck, IconWhatsApp, IconReceipt, IconCard } from '../components/Icons'
import type { Producto, Testimonio, ConfiguracionSitio } from '../types'
import { CONFIGURACION } from '../data/mockData'
import { useDocumentMeta } from '../hooks/useDocumentMeta'
import { useCategorias } from '../hooks/useCategorias'
import './Home.css'

const WHATSAPP_URL =
  'https://wa.me/5491132527581?text=%C2%A1Hola%20Gastrolibertad!%20Quiero%20hacer%20una%20consulta%20sobre%20sus%20productos.'

export default function Home() {
  useDocumentMeta(
    'Cocinas, campanas y electrodomésticos en Merlo',
    'Cocinas a gas y eléctricas, campanas extractoras y equipamiento para el hogar en Libertad, Merlo. Consultá stock por WhatsApp y recibí en Capital Federal y Zona Oeste del GBA.'
  )

  const [productos, setProductos] = useState<Producto[]>([])
  const [testimonios, setTestimonios] = useState<Testimonio[]>([])
  const [config, setConfig] = useState<ConfiguracionSitio>(CONFIGURACION)
  const { categorias } = useCategorias()

  useEffect(() => {
    listarProductos().then(setProductos)
    listarTestimonios(true).then(setTestimonios)
    obtenerConfiguracion().then(setConfig)
  }, [])

  const ofertas = productos.filter((p) => p.oferta)
  const destacados = productos.filter((p) => p.destacado)

  return (
    <>
      <section className="hero">
        <div className="container hero__grid">
          <HeroCarousel config={config} ofertas={ofertas} />

          <div className="hero__side">
            <Link
              to="/tienda"
              className="hero__tile"
              style={{ backgroundImage: `url(${config.tileCocinas})` }}
            >
              <div className="hero__tile-overlay" />
              <span className="hero__tile-text">
                Cocinas a gas/eléctrica
                <small>Ver más →</small>
              </span>
            </Link>
            <a
              href={WHATSAPP_URL}
              target="_blank"
              rel="noreferrer"
              className="hero__tile hero__tile--callout"
              style={{ backgroundImage: `url(${config.tileVariedad})` }}
            >
              <div className="hero__tile-overlay" />
              <span className="hero__tile-text">
                Tenemos variedad de artículos
                <small>
                  Bicicletas, colchones, muebles, parlantes y más — consultanos →
                </small>
              </span>
            </a>
          </div>
        </div>

        <div className="container hero__row">
          <Link
            to="/tienda?cat=campanas"
            className="hero__row-tile"
            style={{ backgroundImage: `url(${config.tileCampanas})` }}
          >
            <div className="hero__tile-overlay" />
            <span className="hero__tile-text">Campanas extractoras</span>
          </Link>
          <Link
            to="/tienda?cat=electrodomesticos"
            className="hero__row-tile"
            style={{ backgroundImage: `url(${config.tileElectro})` }}
          >
            <div className="hero__tile-overlay" />
            <span className="hero__tile-text">Electrodomésticos</span>
          </Link>
          <Link
            to="/tienda?cat=accesorios"
            className="hero__row-tile"
            style={{ backgroundImage: `url(${config.tileAccesorios})` }}
          >
            <div className="hero__tile-overlay" />
            <span className="hero__tile-text">Accesorios para el hogar</span>
          </Link>
        </div>
      </section>

      <Reveal>
        <section className="container stats">
          <div className="stats__item">
            <span className="stats__icon">
              <IconAward />
            </span>
            <div>
              <strong>10+ años de experiencia</strong>
              <p>Trayectoria en el rubro de cocinas y equipamiento para el hogar.</p>
            </div>
          </div>
          <div className="stats__item">
            <span className="stats__icon">
              <IconUsers />
            </span>
            <div>
              <strong>1000+ ventas realizadas</strong>
              <p>Clientes satisfechos con el producto y la atención.</p>
            </div>
          </div>
          <div className="stats__item">
            <span className="stats__icon">
              <IconStar />
            </span>
            <div>
              <strong>4.9 de valoración</strong>
              <p>Nos recomiendan por el asesoramiento y el cumplimiento.</p>
            </div>
          </div>
          <div className="stats__item">
            <span className="stats__icon">
              <IconTruck />
            </span>
            <div>
              <strong>Envíos propios</strong>
              <p>Envíos en Capital Federal y Zona Oeste del Gran Buenos Aires</p>
            </div>
          </div>
          <div className="stats__item">
            <span className="stats__icon">
              <IconReceipt />
            </span>
            <div>
              <strong>Facturación A, B y C</strong>
              <p>Para tu casa o para tu negocio, con la factura que necesites.</p>
            </div>
          </div>
          <div className="stats__item">
            <span className="stats__icon">
              <IconCard />
            </span>
            <div>
              <strong>Todas las tarjetas</strong>
              <p>Aceptamos todas las tarjetas de crédito y débito.</p>
            </div>
          </div>
        </section>
      </Reveal>

      {ofertas.length > 0 && (
        <section className="container section">
          <Reveal>
            <div className="section__header">
              <h2>Promociones</h2>
            </div>
          </Reveal>
          <div className="product-grid">
            {ofertas.map((p, i) => (
              <Reveal key={p.id} delay={i * 60}>
                <ProductCard producto={p} categoriaLabel={categorias.find((c) => c.valor === p.categoria)?.etiqueta} />
              </Reveal>
            ))}
          </div>
        </section>
      )}

      {destacados.length > 0 && (
        <section className="container section">
          <Reveal>
            <div className="section__header">
              <h2>Productos destacados</h2>
              <Link to="/tienda" className="btn btn-primary btn-sm">
                Más productos
              </Link>
            </div>
          </Reveal>
          <div className="product-grid">
            {destacados.map((p, i) => (
              <Reveal key={p.id} delay={i * 60}>
                <ProductCard producto={p} categoriaLabel={categorias.find((c) => c.valor === p.categoria)?.etiqueta} />
              </Reveal>
            ))}
          </div>
        </section>
      )}

      <Reveal>
        <section className="cta-banda">
          <div className="container cta-banda__inner">
            <h2>¿Buscás un modelo puntual?</h2>
            <p>
              Escribinos y te confirmamos disponibilidad, precio final y forma
              de envío. Atendemos de lunes a viernes 9:30 a 13:00 y 14:00 a
              16:30 · sábados 9:00 a 13:00.
            </p>
            <a
              href={WHATSAPP_URL}
              target="_blank"
              rel="noreferrer"
              className="btn btn-whatsapp"
            >
              <IconWhatsApp size={16} /> Consultar stock ahora
            </a>
          </div>
        </section>
      </Reveal>

      {testimonios.length > 0 && (
        <section className="container section">
          <Reveal>
            <div className="section__header">
              <h2>Lo que dicen nuestros clientes</h2>
            </div>
            <p className="section__subtext">
              Más de 1000+ ventas con clientes satisfechos por el servicio.
            </p>
          </Reveal>
          <div className="testimonios-grid">
            {testimonios.map((t, i) => (
              <Reveal key={t.id} delay={i * 80}>
                <figure className="testimonio">
                  <span className="rating__stars">★★★★★</span>
                  <blockquote>“{t.comentario}”</blockquote>
                  <figcaption>{t.nombre}</figcaption>
                </figure>
              </Reveal>
            ))}
          </div>
        </section>
      )}
    </>
  )
}
