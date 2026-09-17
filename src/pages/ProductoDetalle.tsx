import { useEffect, useState } from 'react'
import { Link, useParams } from 'react-router-dom'
import { obtenerProducto } from '../services/productos'
import { useCategorias } from '../hooks/useCategorias'
import ProductGallery from '../components/ProductGallery'
import Reveal from '../components/Reveal'
import { imagenesConFallback } from '../lib/placeholder'
import {
  IconWhatsApp,
  IconWarning,
  IconCheck,
  IconCross,
  IconTruck,
  IconShield,
} from '../components/Icons'
import type { Producto } from '../types'
import './ProductoDetalle.css'

const WHATSAPP_BASE = 'https://wa.me/5491132527581?text='

const formatoPrecio = new Intl.NumberFormat('es-AR', {
  style: 'currency',
  currency: 'ARS',
  maximumFractionDigits: 0,
})

export default function ProductoDetalle() {
  const { id } = useParams<{ id: string }>()
  const [producto, setProducto] = useState<Producto | null>(null)
  const [cargando, setCargando] = useState(true)
  const { categorias } = useCategorias()

  useEffect(() => {
    if (!id) return
    setCargando(true)
    obtenerProducto(id)
      .then(setProducto)
      .finally(() => setCargando(false))
  }, [id])

  if (cargando) {
    return (
      <div className="container">
        <p>Cargando…</p>
      </div>
    )
  }

  if (!producto) {
    return (
      <div className="container producto-404">
        <h1>No encontramos este producto</h1>
        <p>Puede que ya no esté disponible.</p>
        <Link to="/tienda" className="btn btn-outline">
          Volver a la tienda
        </Link>
      </div>
    )
  }

  const mensaje = encodeURIComponent(
    `¡Hola Gastrolibertad! Quiero consultar por: ${producto.nombre}`
  )
  const categoriaLabel = categorias.find(
    (c) => c.valor === producto.categoria
  )?.etiqueta

  return (
    <section className="container producto-detalle">
      <p className="tienda__breadcrumb">
        <Link to="/">Inicio</Link> / {categoriaLabel}
      </p>

      <div className="producto-detalle__grid">
        <Reveal>
          <ProductGallery
            imagenes={imagenesConFallback(
              producto.imagenes,
              producto.categoria,
              producto.nombre
            )}
            alt={producto.nombre}
          />
        </Reveal>

        <Reveal delay={80}>
          <div className="producto-detalle__info">
            <span className="producto-detalle__marca">Gastrolibertad</span>
            <h1>{producto.nombre}</h1>

            <div className="rating">
              <span className="rating__stars">★★★★★</span>
              {producto.rating} ({producto.reseñas})
            </div>

            <div className="producto-detalle__aviso">
              <IconWarning size={16} />
              Antes de comprar, consultá stock disponible
            </div>

            <div className="product-card__precios producto-detalle__precios">
              {producto.precioOriginal && (
                <span className="product-card__precio-original">
                  {formatoPrecio.format(producto.precioOriginal)}
                </span>
              )}
              <span className="product-card__precio">
                {formatoPrecio.format(producto.precio)}
              </span>
            </div>

            {producto.stock ? (
              <p className="producto-detalle__stock is-ok">
                <IconCheck /> En stock — confirmamos por WhatsApp
              </p>
            ) : (
              <p className="producto-detalle__stock is-sin-stock">
                <IconCross /> Sin stock — consultanos por próximo ingreso
              </p>
            )}

            <p className="producto-detalle__descripcion-corta">
              {producto.descripcion}
            </p>

            <a
              href={`${WHATSAPP_BASE}${mensaje}`}
              target="_blank"
              rel="noreferrer"
              className="btn btn-whatsapp"
            >
              <IconWhatsApp size={16} /> Consultar stock por WhatsApp
            </a>

            <div className="producto-detalle__extra">
              <span>
                <IconTruck size={18} /> Envíos en Capital Federal y Zona
                Oeste del Gran Buenos Aires
              </span>
              <span>
                <IconShield size={18} /> Garantía de {producto.garantiaMeses}{' '}
                meses
              </span>
            </div>
          </div>
        </Reveal>
      </div>

      <Reveal>
        <div className="producto-detalle__abajo">
          <div>
            <h2>Descripción</h2>
            <p>{producto.descripcionLarga}</p>

            <table className="producto-detalle__specs">
              <tbody>
                <tr>
                  <th>Medidas</th>
                  <td>{producto.medidas}</td>
                </tr>
                {producto.especificaciones.map((esp) => (
                  <tr key={esp.label}>
                    <th>{esp.label}</th>
                    <td>{esp.valor}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <div className="producto-detalle__info-importante">
            <h2>Información importante</h2>
            <ul>
              {producto.notasImportantes.map((nota) => (
                <li key={nota}>{nota}</li>
              ))}
            </ul>
          </div>
        </div>
      </Reveal>
    </section>
  )
}
