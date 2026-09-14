import { Link } from 'react-router-dom'
import type { Producto } from '../types'
import { CATEGORIAS } from '../data/mockData'
import { imagenesConFallback } from '../lib/placeholder'
import { IconWhatsApp } from './Icons'
import './ProductCard.css'

const formatoPrecio = new Intl.NumberFormat('es-AR', {
  style: 'currency',
  currency: 'ARS',
  maximumFractionDigits: 0,
})

export default function ProductCard({ producto }: { producto: Producto }) {
  const categoriaLabel = CATEGORIAS.find(
    (c) => c.value === producto.categoria
  )?.label
  const [imagenPrincipal] = imagenesConFallback(
    producto.imagenes,
    producto.categoria,
    producto.nombre
  )

  const mensaje = encodeURIComponent(
    `¡Hola Gastrolibertad! Quiero consultar por: ${producto.nombre}`
  )

  return (
    <div className="product-card">
      <Link to={`/tienda/${producto.id}`} className="product-card__image">
        <img src={imagenPrincipal} alt={producto.nombre} loading="lazy" />
        {producto.oferta && <span className="badge badge-oferta">Oferta</span>}
      </Link>
      <div className="product-card__body">
        <span className="product-card__cat">{categoriaLabel}</span>
        <Link to={`/tienda/${producto.id}`} className="product-card__nombre">
          <h3>{producto.nombre}</h3>
        </Link>
        <div className="rating">
          <span className="rating__stars">★★★★★</span>
          {producto.rating} ({producto.reseñas})
        </div>
        <div className="product-card__precios">
          {producto.precioOriginal && (
            <span className="product-card__precio-original">
              {formatoPrecio.format(producto.precioOriginal)}
            </span>
          )}
          <span className="product-card__precio">
            {formatoPrecio.format(producto.precio)}
          </span>
        </div>
        <span className={producto.stock ? 'product-card__stock' : 'product-card__stock is-sin-stock'}>
          {producto.stock ? 'Disponible' : 'Sin stock'} · consultá stock
        </span>
        <a
          href={`https://wa.me/5491132527581?text=${mensaje}`}
          target="_blank"
          rel="noreferrer"
          className="btn btn-whatsapp btn-block btn-sm"
        >
          <IconWhatsApp size={16} /> Consultar stock
        </a>
      </div>
    </div>
  )
}
