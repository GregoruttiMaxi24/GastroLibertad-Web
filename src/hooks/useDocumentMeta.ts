import { useEffect } from 'react'

const SITE = 'Gastrolibertad'
const SITE_URL = 'https://www.gastrolibertad.com.ar'

export function useDocumentMeta(
  titulo: string,
  descripcion?: string,
  ruta?: string
) {
  useEffect(() => {
    const tituloAnterior = document.title
    document.title = titulo ? `${titulo} — ${SITE}` : SITE

    let meta = document.querySelector(
      'meta[name="description"]'
    ) as HTMLMetaElement | null
    const descripcionAnterior = meta?.content

    if (descripcion) {
      if (!meta) {
        meta = document.createElement('meta')
        meta.name = 'description'
        document.head.appendChild(meta)
      }
      meta.content = descripcion
    }

    let canonical = document.querySelector(
      'link[rel="canonical"]'
    ) as HTMLLinkElement | null
    const canonicalAnterior = canonical?.href

    const rutaFinal = ruta ?? window.location.pathname
    if (!canonical) {
      canonical = document.createElement('link')
      canonical.rel = 'canonical'
      document.head.appendChild(canonical)
    }
    canonical.href = `${SITE_URL}${rutaFinal}`

    return () => {
      document.title = tituloAnterior
      if (meta && descripcionAnterior !== undefined) {
        meta.content = descripcionAnterior
      }
      if (canonical && canonicalAnterior !== undefined) {
        canonical.href = canonicalAnterior
      }
    }
  }, [titulo, descripcion, ruta])
}
