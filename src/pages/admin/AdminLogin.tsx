import { useState, type FormEvent } from 'react'
import { Navigate, useNavigate } from 'react-router-dom'
import { useAuth } from '../../contexts/AuthContext'
import { isSupabaseConfigured } from '../../lib/supabase'
import './Admin.css'

export default function AdminLogin() {
  const { admin, login } = useAuth()
  const navigate = useNavigate()
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState<string | null>(null)
  const [enviando, setEnviando] = useState(false)

  if (admin) return <Navigate to="/admin/panel" replace />

  async function onSubmit(e: FormEvent) {
    e.preventDefault()
    setEnviando(true)
    setError(null)
    const err = await login(email, password)
    setEnviando(false)
    if (err) setError(err)
    else navigate('/admin/panel')
  }

  return (
    <div className="admin-login">
      <form className="admin-login__card" onSubmit={onSubmit}>
        <h1>Acceso Admin</h1>
        <p className="admin-login__sub">
          Panel para gestionar productos, stock y reseñas de Gastrolibertad.
        </p>

        {!isSupabaseConfigured && (
          <div className="admin-login__aviso">
            Supabase todavía no está conectado. Podés entrar con la cuenta de
            prueba: <strong>admin@gastrolibertad.com</strong> /{' '}
            <strong>demo1234</strong>
          </div>
        )}

        <label>
          Email
          <input
            type="email"
            required
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            autoComplete="username"
          />
        </label>
        <label>
          Contraseña
          <input
            type="password"
            required
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            autoComplete="current-password"
          />
        </label>

        {error && <p className="admin-login__error">{error}</p>}

        <button className="btn btn-primary" type="submit" disabled={enviando}>
          {enviando ? 'Ingresando…' : 'Ingresar'}
        </button>
      </form>
    </div>
  )
}
