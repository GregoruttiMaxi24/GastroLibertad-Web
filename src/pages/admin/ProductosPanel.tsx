import { useEffect, useState } from 'react'
import {
  listarProductos,
  crearProducto,
  actualizarProducto,
  eliminarProducto,
} from '../../services/productos'
import { useCategorias } from '../../hooks/useCategorias'
import ImageInput from '../../components/ImageInput'
import type { Producto, Especificacion } from '../../types'

const VACIO = {
  nombre: '',
  categoria: '',
  precio: 0,
  precioOriginal: 0,
  rating: 0,
  reseñas: 0,
  stock: true,
  cantidadStock: 0,
  descripcion: '',
  descripcionLarga: '',
  medidas: '',
  especificacionesTexto: '',
  garantiaMeses: 6,
  notasTexto: 'Todos nuestros productos cuentan con 6 meses de garantía.\nAntes de realizar la compra, consultar stock disponible.',
  imagenes: [''],
  destacado: false,
  oferta: false,
}

function parseEspecificaciones(texto: string): Especificacion[] {
  return texto
    .split('\n')
    .map((linea) => linea.trim())
    .filter(Boolean)
    .map((linea) => {
      const [label, ...resto] = linea.split(':')
      return { label: label.trim(), valor: resto.join(':').trim() }
    })
}

function especificacionesATexto(especificaciones: Especificacion[]): string {
  return especificaciones.map((e) => `${e.label}: ${e.valor}`).join('\n')
}

export default function ProductosPanel() {
  const [productos, setProductos] = useState<Producto[]>([])
  const { categorias } = useCategorias()
  const [cargando, setCargando] = useState(true)
  const [editando, setEditando] = useState<string | null>(null)
  const [form, setForm] = useState(VACIO)
  const [mostrarForm, setMostrarForm] = useState(false)

  function cargar() {
    setCargando(true)
    listarProductos()
      .then(setProductos)
      .finally(() => setCargando(false))
  }

  useEffect(cargar, [])

  function nuevoProducto() {
    setForm(VACIO)
    setEditando(null)
    setMostrarForm(true)
  }

  function editarProducto(p: Producto) {
    setForm({
      nombre: p.nombre,
      categoria: p.categoria,
      precio: p.precio,
      precioOriginal: p.precioOriginal ?? 0,
      rating: p.rating,
      reseñas: p.reseñas,
      stock: p.stock,
      cantidadStock: p.cantidadStock ?? 0,
      descripcion: p.descripcion,
      descripcionLarga: p.descripcionLarga,
      medidas: p.medidas,
      especificacionesTexto: especificacionesATexto(p.especificaciones),
      garantiaMeses: p.garantiaMeses,
      notasTexto: p.notasImportantes.join('\n'),
      imagenes: p.imagenes.length ? p.imagenes : [''],
      destacado: p.destacado,
      oferta: p.oferta,
    })
    setEditando(p.id)
    setMostrarForm(true)
  }

  async function guardar() {
    const payload = {
      nombre: form.nombre,
      categoria: form.categoria,
      precio: form.precio,
      precioOriginal: form.precioOriginal > 0 ? form.precioOriginal : null,
      rating: form.rating,
      reseñas: form.reseñas,
      stock: form.stock,
      cantidadStock: form.cantidadStock,
      descripcion: form.descripcion,
      descripcionLarga: form.descripcionLarga,
      medidas: form.medidas,
      especificaciones: parseEspecificaciones(form.especificacionesTexto),
      garantiaMeses: form.garantiaMeses,
      notasImportantes: form.notasTexto
        .split('\n')
        .map((n) => n.trim())
        .filter(Boolean),
      imagenes: form.imagenes.filter(Boolean),
      destacado: form.destacado,
      oferta: form.oferta,
    }
    if (editando) {
      await actualizarProducto(editando, payload)
    } else {
      await crearProducto(payload)
    }
    setMostrarForm(false)
    cargar()
  }

  async function alternarStock(p: Producto) {
    await actualizarProducto(p.id, { stock: !p.stock })
    cargar()
  }

  async function borrar(id: string) {
    if (!confirm('¿Eliminar este producto?')) return
    await eliminarProducto(id)
    cargar()
  }

  return (
    <div>
      <div className="admin-panel__toolbar">
        <p className="admin-panel__hint">
          Marcá o desmarcá el stock con un clic, o editá los datos completos
          del producto, incluidas medidas y especificaciones.
        </p>
        <button className="btn btn-primary btn-sm" onClick={nuevoProducto}>
          + Nuevo producto
        </button>
      </div>

      {cargando ? (
        <p>Cargando…</p>
      ) : (
        <table className="admin-table">
          <thead>
            <tr>
              <th>Producto</th>
              <th>Categoría</th>
              <th>Precio</th>
              <th>Oferta</th>
              <th>Stock</th>
              <th>Destacado</th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            {productos.map((p) => (
              <tr key={p.id}>
                <td>{p.nombre}</td>
                <td>
                  {categorias.find((c) => c.valor === p.categoria)?.etiqueta}
                </td>
                <td>
                  {p.precioOriginal && (
                    <span
                      style={{
                        textDecoration: 'line-through',
                        color: 'var(--color-ink-soft)',
                        marginRight: 6,
                        fontSize: '0.8rem',
                      }}
                    >
                      {new Intl.NumberFormat('es-AR', {
                        style: 'currency',
                        currency: 'ARS',
                        maximumFractionDigits: 0,
                      }).format(p.precioOriginal)}
                    </span>
                  )}
                  {new Intl.NumberFormat('es-AR', {
                    style: 'currency',
                    currency: 'ARS',
                    maximumFractionDigits: 0,
                  }).format(p.precio)}
                </td>
                <td>{p.oferta ? 'Sí' : 'No'}</td>
                <td>
                  <button
                    className={`badge ${
                      p.stock ? 'badge-success' : 'badge-danger'
                    } admin-table__stock`}
                    onClick={() => alternarStock(p)}
                  >
                    {p.stock ? 'Disponible' : 'Sin stock'}
                  </button>
                </td>
                <td>{p.destacado ? 'Sí' : 'No'}</td>
                <td className="admin-table__acciones">
                  <button
                    className="btn btn-outline btn-sm"
                    onClick={() => editarProducto(p)}
                  >
                    Editar
                  </button>
                  <button
                    className="btn btn-danger-ghost"
                    onClick={() => borrar(p.id)}
                  >
                    Eliminar
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}

      {mostrarForm && (
        <div className="admin-modal" role="dialog" aria-modal="true">
          <div className="admin-modal__card">
            <h2>{editando ? 'Editar producto' : 'Nuevo producto'}</h2>

            <label>
              Nombre
              <input
                value={form.nombre}
                onChange={(e) => setForm({ ...form, nombre: e.target.value })}
              />
            </label>

            <label>
              Categoría
              <select
                value={form.categoria}
                onChange={(e) =>
                  setForm({ ...form, categoria: e.target.value })
                }
              >
                <option value="" disabled>
                  Seleccioná una categoría
                </option>
                {categorias.map((c) => (
                  <option key={c.id} value={c.valor}>
                    {c.etiqueta}
                  </option>
                ))}
              </select>
            </label>

            <label>
              Precio (ARS)
              <input
                type="number"
                value={form.precio}
                onChange={(e) =>
                  setForm({ ...form, precio: Number(e.target.value) })
                }
              />
            </label>

            <label>
              Precio anterior (opcional, para mostrar oferta)
              <input
                type="number"
                value={form.precioOriginal}
                onChange={(e) =>
                  setForm({
                    ...form,
                    precioOriginal: Number(e.target.value),
                  })
                }
              />
            </label>

            <label>
              Cantidad en stock
              <input
                type="number"
                value={form.cantidadStock}
                onChange={(e) =>
                  setForm({
                    ...form,
                    cantidadStock: Number(e.target.value),
                    stock: Number(e.target.value) > 0,
                  })
                }
              />
            </label>

            <label>
              Calificación (0 a 5) — dejar en 0 si todavía no tiene reseñas
              reales
              <input
                type="number"
                min={0}
                max={5}
                step={0.1}
                value={form.rating}
                onChange={(e) =>
                  setForm({ ...form, rating: Number(e.target.value) })
                }
              />
            </label>

            <label>
              Cantidad de reseñas
              <input
                type="number"
                min={0}
                value={form.reseñas}
                onChange={(e) =>
                  setForm({ ...form, reseñas: Number(e.target.value) })
                }
              />
            </label>

            <ImageInput
              label="Imagen principal"
              value={form.imagenes[0] ?? ''}
              onChange={(url) =>
                setForm({ ...form, imagenes: [url, form.imagenes[1] ?? ''] })
              }
            />

            <ImageInput
              label="Segunda imagen (opcional, para la galería)"
              value={form.imagenes[1] ?? ''}
              onChange={(url) =>
                setForm({ ...form, imagenes: [form.imagenes[0] ?? '', url] })
              }
            />

            <label>
              Descripción corta (se ve arriba, junto al precio)
              <textarea
                rows={2}
                value={form.descripcion}
                onChange={(e) =>
                  setForm({ ...form, descripcion: e.target.value })
                }
              />
            </label>

            <label>
              Descripción detallada (sección "Descripción")
              <textarea
                rows={4}
                value={form.descripcionLarga}
                onChange={(e) =>
                  setForm({ ...form, descripcionLarga: e.target.value })
                }
              />
            </label>

            <label>
              Medidas
              <input
                value={form.medidas}
                onChange={(e) => setForm({ ...form, medidas: e.target.value })}
                placeholder="Ej: 85 x 60 x 88 cm (ancho x profundidad x alto)"
              />
            </label>

            <label>
              Especificaciones (una por línea, formato "Nombre: valor")
              <textarea
                rows={4}
                value={form.especificacionesTexto}
                onChange={(e) =>
                  setForm({ ...form, especificacionesTexto: e.target.value })
                }
                placeholder={'Hornallas: 4\nEncendido: Electrónico'}
              />
            </label>

            <label>
              Garantía (meses)
              <input
                type="number"
                value={form.garantiaMeses}
                onChange={(e) =>
                  setForm({ ...form, garantiaMeses: Number(e.target.value) })
                }
              />
            </label>

            <label>
              Notas importantes (una por línea)
              <textarea
                rows={3}
                value={form.notasTexto}
                onChange={(e) =>
                  setForm({ ...form, notasTexto: e.target.value })
                }
              />
            </label>

            <label className="admin-modal__checkbox">
              <input
                type="checkbox"
                checked={form.destacado}
                onChange={(e) =>
                  setForm({ ...form, destacado: e.target.checked })
                }
              />
              Mostrar en "Productos destacados" de la Home
            </label>

            <label className="admin-modal__checkbox">
              <input
                type="checkbox"
                checked={form.oferta}
                onChange={(e) =>
                  setForm({ ...form, oferta: e.target.checked })
                }
              />
              Mostrar en "Promociones" (con badge de Oferta)
            </label>

            <div className="admin-modal__acciones">
              <button
                className="btn btn-outline"
                onClick={() => setMostrarForm(false)}
              >
                Cancelar
              </button>
              <button className="btn btn-primary" onClick={guardar}>
                Guardar
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
