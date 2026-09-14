import type { Categoria } from '../types'

type Clave = Categoria | 'hero' | 'nosotros' | 'campanas-tile' | 'electro-tile' | 'accesorios-tile'

const ICONOS: Record<string, string> = {
  'cocinas-a-gas':
    '<path d="M0,-42 C18,-14 18,12 0,42 C-18,12 -18,-14 0,-42 Z" />',
  'cocinas-electricas':
    '<path d="M-6,-42 L16,-42 L-2,-2 L18,-2 L-14,42 L0,2 L-16,2 Z" fill="#fff" stroke="none" />',
  campanas:
    '<path d="M-42,-18 L42,-18 L16,20 L-16,20 Z" /><line x1="0" y1="20" x2="0" y2="38" />',
  'campanas-tile':
    '<path d="M-42,-18 L42,-18 L16,20 L-16,20 Z" /><line x1="0" y1="20" x2="0" y2="38" />',
  electrodomesticos:
    '<rect x="-26" y="-42" width="52" height="84" rx="6" /><line x1="-26" y1="-8" x2="26" y2="-8" />',
  'electro-tile':
    '<rect x="-26" y="-42" width="52" height="84" rx="6" /><line x1="-26" y1="-8" x2="26" y2="-8" />',
  accesorios:
    '<path d="M-22,-16 L22,-16 L28,34 L-28,34 Z" /><path d="M-12,-16 C-12,-32 12,-32 12,-16" />',
  'accesorios-tile':
    '<path d="M-22,-16 L22,-16 L28,34 L-28,34 Z" /><path d="M-12,-16 C-12,-32 12,-32 12,-16" />',
  hero: '<path d="M-38,10 L0,-30 L38,10 L38,42 L-38,42 Z" /><rect x="-10" y="14" width="20" height="28" />',
  nosotros:
    '<path d="M-38,10 L0,-30 L38,10 L38,42 L-38,42 Z" /><rect x="-10" y="14" width="20" height="28" />',
}

const COLORES: Record<string, [string, string]> = {
  'cocinas-a-gas': ['#1d5c8a', '#2563eb'],
  'cocinas-electricas': ['#2563eb', '#60a5fa'],
  campanas: ['#334155', '#64748b'],
  'campanas-tile': ['#334155', '#64748b'],
  electrodomesticos: ['#0f766e', '#2dd4bf'],
  'electro-tile': ['#0f766e', '#2dd4bf'],
  accesorios: ['#6d28d9', '#c084fc'],
  'accesorios-tile': ['#6d28d9', '#c084fc'],
  hero: ['#ec4899', '#2563eb'],
  nosotros: ['#ec4899', '#2563eb'],
}

function escapeXml(s: string) {
  return s.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;')
}

export function placeholderImage(clave: Clave, etiqueta = ''): string {  const [c1, c2] = COLORES[clave] ?? ['#334155', '#64748b']
  const icono = ICONOS[clave] ?? ''
  const label = etiqueta.length > 40 ? etiqueta.slice(0, 40) + '…' : etiqueta

  const svg = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 480 360">
    <defs>
      <linearGradient id="g" x1="0" y1="0" x2="1" y2="1">
        <stop offset="0%" stop-color="${c1}"/>
        <stop offset="100%" stop-color="${c2}"/>
      </linearGradient>
    </defs>
    <rect width="480" height="360" fill="url(#g)"/>
    <g transform="translate(240,150)" fill="none" stroke="#ffffff" stroke-width="5" stroke-linejoin="round" stroke-linecap="round" opacity="0.92">
      ${icono}
    </g>
    ${
      label
        ? `<text x="240" y="262" text-anchor="middle" font-family="Arial, sans-serif" font-size="17" fill="#ffffff">${escapeXml(
            label
          )}</text>`
        : ''
    }
    <text x="240" y="${
      label ? 288 : 260
    }" text-anchor="middle" font-family="Arial, sans-serif" font-size="12" fill="#ffffff" opacity="0.78">Foto de ejemplo — cambiala desde el Admin</text>
  </svg>`

  return `data:image/svg+xml,${encodeURIComponent(svg)}`
}

// Devuelve las imágenes del producto, o un placeholder si todavía no cargó
// ninguna foto (por ejemplo, un producto recién creado desde el Admin).
export function imagenesConFallback(
  imagenes: string[],
  categoria: Categoria,
  nombre: string
): string[] {
  return imagenes.length > 0 ? imagenes : [placeholderImage(categoria, nombre)]
}
