import { useEffect, useState } from 'react'
import {
  listarTestimonios,
  crearTestimonio,
  actualizarTestimonio,
  eliminarTestimonio,
} from '../../services/testimonios'
import ImageInput from '../../components/ImageInput'
import type { Testimonio } from '../../types'

const VACIO = { nombre: '', comentario: '', foto: '', aprobado: true }

export default function TestimoniosPanel() {
  const [testimonios, setTestimonios] = useState<Testimonio[]>([])
  const [cargando, setCargando] = useState(true)
  const [mostrarForm, setMostrarForm] = useState(false)
  const [form, setForm] = useState(VACIO)

  function cargar() {
    setCargando(true)
    listarTestimonios()
      .then(setTestimonios)
      .finally(() => setCargando(false))
  }

  useEffect(cargar, [])

  async function guardar() {
    await crearTestimonio({
      nombre: form.nombre,
      comentario: form.comentario,
      foto: form.foto || null,
      aprobado: form.aprobado,
    })
    setForm(VACIO)
    setMostrarForm(false)
    cargar()
  }

  async function alternarAprobado(t: Testimonio) {
    await actualizarTestimonio(t.id, { aprobado: !t.aprobado })
    cargar()
  }

  async function borrar(id: string) {
    if (!confirm('¿Eliminar esta reseña?')) return
    await eliminarTestimonio(id)
    cargar()
  }

  return (
    <div>
      <div className="admin-panel__toolbar">
        <p className="admin-panel__hint">
          Cargá las reseñas reales de tus clientes para reemplazar las de
          muestra. Solo se muestran en la Home las que están "Aprobadas".
        </p>
        <button
          className="btn btn-primary btn-sm"
          onClick={() => setMostrarForm(true)}
        >
          + Nueva reseña
        </button>
      </div>

      {cargando ? (
        <p>Cargando…</p>
      ) : (
        <table className="admin-table">
          <thead>
            <tr>
              <th>Cliente</th>
              <th>Comentario</th>
              <th>Estado</th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            {testimonios.map((t) => (
              <tr key={t.id}>
                <td>{t.nombre}</td>
                <td className="admin-table__comentario">{t.comentario}</td>
                <td>
                  <button
                    className={`badge ${
                      t.aprobado ? 'badge-success' : 'badge-danger'
                    } admin-table__stock`}
                    onClick={() => alternarAprobado(t)}
                  >
                    {t.aprobado ? 'Aprobada' : 'Oculta'}
                  </button>
                </td>
                <td className="admin-table__acciones">
                  <button
                    className="btn btn-danger-ghost"
                    onClick={() => borrar(t.id)}
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
            <h2>Nueva reseña</h2>

            <label>
              Nombre del cliente
              <input
                value={form.nombre}
                onChange={(e) => setForm({ ...form, nombre: e.target.value })}
              />
            </label>

            <label>
              Comentario
              <textarea
                rows={3}
                value={form.comentario}
                onChange={(e) =>
                  setForm({ ...form, comentario: e.target.value })
                }
              />
            </label>

            <ImageInput
              label="Foto del cliente (opcional)"
              value={form.foto}
              onChange={(url) => setForm({ ...form, foto: url })}
            />

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
