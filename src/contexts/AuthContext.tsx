import {
  createContext,
  useContext,
  useEffect,
  useState,
  type ReactNode,
} from 'react'
import { supabase, isSupabaseConfigured } from '../lib/supabase'
import type { Admin } from '../types'

interface AuthContextValue {
  admin: Admin | null
  cargando: boolean
  login: (email: string, password: string) => Promise<string | null>
  logout: () => Promise<void>
}

const AuthContext = createContext<AuthContextValue | undefined>(undefined)

// Credenciales de prueba mientras no hay Supabase conectado.
// Reemplazalas o eliminalas una vez que conectes Supabase Auth real.
const MOCK_ADMINS = [
  { email: 'admin@gastrolibertad.com', password: 'demo1234' },
]
const MOCK_SESSION_KEY = 'gl_mock_admin_session'

export function AuthProvider({ children }: { children: ReactNode }) {
  const [admin, setAdmin] = useState<Admin | null>(null)
  const [cargando, setCargando] = useState(true)

  useEffect(() => {
    if (isSupabaseConfigured && supabase) {
      supabase.auth.getSession().then(({ data }) => {
        const user = data.session?.user
        setAdmin(user ? { id: user.id, email: user.email ?? '' } : null)
        setCargando(false)
      })
      const { data: listener } = supabase.auth.onAuthStateChange(
        (_event, session) => {
          const user = session?.user
          setAdmin(user ? { id: user.id, email: user.email ?? '' } : null)
        }
      )
      return () => listener.subscription.unsubscribe()
    } else {
      const saved = sessionStorage.getItem(MOCK_SESSION_KEY)
      if (saved) setAdmin(JSON.parse(saved))
      setCargando(false)
    }
  }, [])

  async function login(email: string, password: string) {
    if (isSupabaseConfigured && supabase) {
      const { error } = await supabase.auth.signInWithPassword({
        email,
        password,
      })
      return error ? error.message : null
    }
    const match = MOCK_ADMINS.find(
      (a) => a.email === email && a.password === password
    )
    if (!match) return 'Email o contraseña incorrectos.'
    const session: Admin = { id: 'mock-admin', email: match.email }
    sessionStorage.setItem(MOCK_SESSION_KEY, JSON.stringify(session))
    setAdmin(session)
    return null
  }

  async function logout() {
    if (isSupabaseConfigured && supabase) {
      await supabase.auth.signOut()
    } else {
      sessionStorage.removeItem(MOCK_SESSION_KEY)
      setAdmin(null)
    }
  }

  return (
    <AuthContext.Provider value={{ admin, cargando, login, logout }}>
      {children}
    </AuthContext.Provider>
  )
}

export function useAuth() {
  const ctx = useContext(AuthContext)
  if (!ctx) throw new Error('useAuth debe usarse dentro de AuthProvider')
  return ctx
}
