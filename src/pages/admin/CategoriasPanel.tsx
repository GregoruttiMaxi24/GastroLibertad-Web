import { useEffect, useState } from 'react'
import {
  listarCategorias,
  crearCategoria,
  actualizarCategoria,
  eliminarCategoria,
} from '../../services/categorias'
import type { CategoriaItem } from '../../types'

function slugify(texto: string) {
  return texto
    .toLowerCase()
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/(^-|-$)/g, '')
}

const VACIO = { etiqueta: '', valor: '' }

export default function CategoriasPanel() {
  const [categorias, setCategorias] = useState<CategoriaItem[]>([])
  const [cargando, setCargando] = useState(true)
  const [editando, setEditando] = useState<string | null>(null)
  const [form, setForm] = useState(VACIO)
  const [mostrarForm, setMostrarForm] = useState(false)
  const [valorTocado, setValorTocado] = useState(false)

  function cargar() {
    setCargando(true)
    listarCategorias()
      .then(setCategorias)
      .finally(() => setCargando(false))
  }

  useEffect(cargar, [])

  function nuevaCategoria() {
    setForm(VACIO)
    setValorTocado(false)
    setEditando(null)
    setMostrarForm(true)
  }

  function editarCategoria(c: CategoriaItem) {
    setForm({ etiqueta: c.etiqueta, valor: c.valor })
    setValorTocado(true)
    setEditando(c.id)
    setMostrarForm(true)
  }

  function cambiarEtiqueta(etiqueta: string) {
    setForm((f) => ({
      etiqueta,
      valor: valorTocado ? f.valor : slugify(etiqueta),
    }))
  }

  async function guardar() {
    if (!form.etiqueta.trim() || !form.valor.trim()) return

    if (editando) {
      await actualizarCategoria(editando, form)
    } else {
      const orden = categorias.length
        ? Math.max(...categorias.map((c) => c.orden)) + 1
        : 1
      await crearCategoria({ ...form, orden })
    }
    setMostrarForm(false)
    cargar()
  }

  async function borrar(c: CategoriaItem) {
    if (
      !confirm(
        `¿Eliminar la categoría "${c.etiqueta}"? Los productos que ya la tengan asignada van a quedar sin categoría visible hasta que los edites.`
      )
    )
      return
    await eliminarCategoria(c.id)
    cargar()
  }

  return (
    <div>
      <div className="admin-panel__toolbar">
        <p className="admin-panel__hint">
          Estas son las categorías que aparecen en el filtro de la Tienda y
          en el desplegable al cargar un producto. El orden acá define el
          orden en que se muestran.
        </p>
        <button className="btn btn-primary btn-sm" onClick={nuevaCategoria}>
          + Nueva categoría
        </button>
      </div>

      {cargando ? (
        <p>Cargando…</p>
      ) : (
        <table className="admin-table">
          <thead>
            <tr>
              <th>Nombre</th>
              <th>Identificador</th>
              <th>Orden</th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            {categorias.map((c) => (
              <tr key={c.id}>
                <td>{c.etiqueta}</td>
                <td>
                  <code>{c.valor}</code>
                </td>
                <td>{c.orden}</td>
                <td className="admin-table__acciones">
                  <button
                    className="btn btn-outline btn-sm"
                    onClick={() => editarCategoria(c)}
                  >
                    Editar
                  </button>
                  <button
                    className="btn btn-danger-ghost"
                    onClick={() => borrar(c)}
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
            <h2>{editando ? 'Editar categoría' : 'Nueva categoría'}</h2>

            <label>
              Nombre (así se ve en el sitio)
              <input
                value={form.etiqueta}
                onChange={(e) => cambiarEtiqueta(e.target.value)}
                placeholder="Ej: Colchones y sommiers"
                autoFocus
              />
            </label>

            <label>
              Identificador interno
              <input
                value={form.valor}
                onChange={(e) => {
                  setValorTocado(true)
                  setForm({ ...form, valor: e.target.value })
                }}
              />
            </label>
            <p className="admin-panel__hint" style={{ marginTop: -8 }}>
              Se genera solo a partir del nombre. Solo tocalo si sabés lo que
              hacés — si lo cambiás en una categoría que ya tiene productos,
              esos productos van a dejar de aparecer bajo esa categoría hasta
              que los vuelvas a editar.
            </p>

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
