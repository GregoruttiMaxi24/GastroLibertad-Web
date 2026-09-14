import { useState } from 'react'
import { Link, NavLink, useNavigate } from 'react-router-dom'
import Logo from './Logo'
import {
  IconSearch,
  IconTruck,
  IconInstagram,
  IconFacebook,
  IconMenu,
} from './Icons'
import './Header.css'

const WHATSAPP_URL =
  'https://wa.me/5491132527581?text=%C2%A1Hola%20Gastrolibertad!%20Quiero%20hacer%20una%20consulta%20sobre%20sus%20productos.'

export default function Header() {
  const [abierto, setAbierto] = useState(false)
  const [busqueda, setBusqueda] = useState('')
  const navigate = useNavigate()

  function buscar(e: React.FormEvent) {
    e.preventDefault()
    navigate(`/tienda${busqueda ? `?buscar=${encodeURIComponent(busqueda)}` : ''}`)
  }

  return (
    <header className="site-header">
      <div className="container site-header__top">
        <Link to="/" className="site-header__brand">
          <Logo />
          <span>Gastrolibertad</span>
        </Link>

        <form className="site-header__search" onSubmit={buscar}>
          <input
            type="search"
            placeholder="Búsqueda de productos"
            value={busqueda}
            onChange={(e) => setBusqueda(e.target.value)}
          />
          <button type="submit" aria-label="Buscar">
            <IconSearch />
          </button>
        </form>

        <div className="site-header__info">
          <IconTruck size={20} />
          <span>Envíos en Capital Federal y Zona Oeste del Gran Buenos Aires</span>
        </div>

        <div className="site-header__social">
          <a
            href="https://www.instagram.com/gastro_libertad/"
            target="_blank"
            rel="noreferrer"
            aria-label="Instagram"
          >
            <IconInstagram />
          </a>
          <a
            href="https://www.facebook.com/GastroLibertad"
            target="_blank"
            rel="noreferrer"
            aria-label="Facebook"
          >
            <IconFacebook />
          </a>
        </div>

        <a
          href={WHATSAPP_URL}
          target="_blank"
          rel="noreferrer"
          className="btn btn-whatsapp btn-sm site-header__cta"
        >
          Consultar por WhatsApp
        </a>

        <button
          className="site-header__toggle"
          aria-label={abierto ? 'Cerrar menú' : 'Abrir menú'}
          aria-expanded={abierto}
          onClick={() => setAbierto((v) => !v)}
        >
          <IconMenu />
        </button>
      </div>

      <nav className={`site-nav ${abierto ? 'is-open' : ''}`}>
        <div className="container site-nav__inner">
          <NavLink to="/" end onClick={() => setAbierto(false)}>
            Inicio
          </NavLink>
          <NavLink to="/tienda" onClick={() => setAbierto(false)}>
            Productos
          </NavLink>
          <NavLink to="/nosotros" onClick={() => setAbierto(false)}>
            Nosotros
          </NavLink>
          <NavLink to="/contacto" onClick={() => setAbierto(false)}>
            Contacto
          </NavLink>
        </div>
      </nav>
    </header>
  )
}
