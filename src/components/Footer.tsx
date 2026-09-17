import { Link } from 'react-router-dom'
import { IconInstagram, IconFacebook } from './Icons'
import './Footer.css'

const WHATSAPP_URL =
  'https://wa.me/5491132527581?text=%C2%A1Hola%20Gastrolibertad!%20Quiero%20hacer%20una%20consulta%20sobre%20sus%20productos.'

export default function Footer() {
  return (
    <footer className="site-footer">
      <div className="container site-footer__grid">
        <div>
          <p className="footer-heading">Gastrolibertad</p>
          <p>Equipamos tu cocina y también tu casa.</p>
          <p>
            Consultá también por heladeras, aires acondicionados, bicis,
            alacenas, muebles y más.
          </p>
          <div className="site-footer__social">
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
            className="btn btn-whatsapp btn-sm"
            style={{ marginTop: 16 }}
          >
            Escribinos por WhatsApp
          </a>
        </div>

        <div>
          <p className="footer-heading">Enlaces</p>
          <ul className="site-footer__links">
            <li>
              <Link to="/">Inicio</Link>
            </li>
            <li>
              <Link to="/tienda">Productos</Link>
            </li>
            <li>
              <Link to="/nosotros">Nosotros</Link>
            </li>
            <li>
              <Link to="/contacto">Contacto</Link>
            </li>
          </ul>
        </div>

        <div>
          <p className="footer-heading">Dónde estamos</p>
          <p>Juan B. Justo 2550, entre España y Eva Perón, Libertad, Merlo</p>
          <p>
            Lunes a viernes 9:30 a 13:00 y 14:00 a 16:30
            <br />
            Sábados 9:00 a 13:00
          </p>
          <p>Envíos en Capital Federal y Zona Oeste del Gran Buenos Aires</p>
        </div>
      </div>

      <div className="container site-footer__bottom">
        <span>© {new Date().getFullYear()} Gastrolibertad</span>
        <Link to="/admin" className="site-footer__admin">
          Acceso Admin
        </Link>
      </div>
    </footer>
  )
}
