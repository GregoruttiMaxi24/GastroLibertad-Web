import { useEffect, useMemo, useState } from 'react'
import { Link, useSearchParams } from 'react-router-dom'
import { listarProductos } from '../services/productos'
import { CATEGORIAS } from '../data/mockData'
import ProductCard from '../components/ProductCard'
import type { Producto } from '../types'
import './Tienda.css'

const PRECIO_MIN = 0
const PRECIO_MAX = 700000

export default function Tienda() {
  const [productos, setProductos] = useState<Producto[]>([])
  const [cargando, setCargando] = useState(true)
  const [params, setParams] = useSearchParams()
  const catActiva = params.get('cat') ?? ''
  const busqueda = (params.get('buscar') ?? '').toLowerCase()

  const [precioMax, setPrecioMax] = useState(PRECIO_MAX)
  const [precioAplicado, setPrecioAplicado] = useState(PRECIO_MAX)

  useEffect(() => {
    listarProductos()
      .then(setProductos)
      .finally(() => setCargando(false))
  }, [])

  const filtrados = useMemo(() => {
    return productos.filter((p) => {
      if (catActiva && p.categoria !== catActiva) return false
      if (busqueda && !p.nombre.toLowerCase().includes(busqueda)) return false
      if (p.precio > precioAplicado) return false
      return true
    })
  }, [productos, catActiva, busqueda, precioAplicado])

  function elegirCategoria(cat: string) {
    if (cat) setParams({ cat })
    else setParams({})
  }

  return (
    <section className="container tienda">
      <p className="tienda__breadcrumb">
        <Link to="/">Inicio</Link> / Productos
      </p>

      <div className="tienda__header">
        <h1>Tienda</h1>
        <span className="tienda__count">{filtrados.length} productos</span>
      </div>

      <div className="tienda__layout">
        <aside className="tienda__sidebar">
          <h4>Categorías</h4>
          <ul className="tienda__cats">
            <li>
              <button
                className={catActiva === '' ? 'is-active' : ''}
                onClick={() => elegirCategoria('')}
              >
                Todos los productos
              </button>
            </li>
            {CATEGORIAS.map((c) => (
              <li key={c.value}>
                <button
                  className={catActiva === c.value ? 'is-active' : ''}
                  onClick={() => elegirCategoria(c.value)}
                >
                  {c.label}
                </button>
              </li>
            ))}
          </ul>

          <div className="tienda__precio">
            <h4>Precio</h4>
            <p className="tienda__precio-valor">
              {new Intl.NumberFormat('es-AR', {
                style: 'currency',
                currency: 'ARS',
                maximumFractionDigits: 0,
              }).format(PRECIO_MIN)}{' '}
              —{' '}
              {new Intl.NumberFormat('es-AR', {
                style: 'currency',
                currency: 'ARS',
                maximumFractionDigits: 0,
              }).format(precioMax)}
            </p>
            <input
              type="range"
              min={PRECIO_MIN}
              max={PRECIO_MAX}
              step={5000}
              value={precioMax}
              onChange={(e) => setPrecioMax(Number(e.target.value))}
            />
            <div className="tienda__precio-acciones">
              <button
                className="btn btn-primary btn-sm"
                onClick={() => setPrecioAplicado(precioMax)}
              >
                Aplicar
              </button>
              <button
                className="btn btn-outline btn-sm"
                onClick={() => {
                  setPrecioMax(PRECIO_MAX)
                  setPrecioAplicado(PRECIO_MAX)
                }}
              >
                Limpiar
              </button>
            </div>
          </div>
        </aside>

        <div className="tienda__resultados">
          {cargando ? (
            <p>Cargando productos…</p>
          ) : filtrados.length === 0 ? (
            <p>No hay productos que coincidan con la búsqueda.</p>
          ) : (
            <div className="product-grid">
              {filtrados.map((p) => (
                <ProductCard key={p.id} producto={p} />
              ))}
            </div>
          )}
        </div>
      </div>
    </section>
  )
}
