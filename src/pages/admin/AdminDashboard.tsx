import { useState } from 'react'
import { Link } from 'react-router-dom'
import { useAuth } from '../../contexts/AuthContext'
import ProductosPanel from './ProductosPanel'
import TestimoniosPanel from './TestimoniosPanel'
import DisenioPanel from './DisenioPanel'
import './Admin.css'

type Tab = 'productos' | 'testimonios' | 'diseño'

export default function AdminDashboard() {
  const { admin, logout } = useAuth()
  const [tab, setTab] = useState<Tab>('productos')

  return (
    <div className="admin-panel">
      <header className="admin-panel__header">
        <div>
          <Link to="/" className="admin-panel__brand">
            Gastrolibertad
          </Link>
          <span className="admin-panel__user">{admin?.email}</span>
        </div>
        <button className="btn btn-outline btn-sm" onClick={() => logout()}>
          Cerrar sesión
        </button>
      </header>

      <div className="admin-panel__tabs">
        <button
          className={tab === 'productos' ? 'is-active' : ''}
          onClick={() => setTab('productos')}
        >
          Productos y stock
        </button>
        <button
          className={tab === 'testimonios' ? 'is-active' : ''}
          onClick={() => setTab('testimonios')}
        >
          Reseñas
        </button>
        <button
          className={tab === 'diseño' ? 'is-active' : ''}
          onClick={() => setTab('diseño')}
        >
          Diseño (hero e imágenes)
        </button>
      </div>

      <div className="admin-panel__content">
        {tab === 'productos' && <ProductosPanel />}
        {tab === 'testimonios' && <TestimoniosPanel />}
        {tab === 'diseño' && <DisenioPanel />}
      </div>
    </div>
  )
}
