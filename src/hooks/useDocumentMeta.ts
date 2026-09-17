import { useEffect } from 'react'

const SITE = 'Gastrolibertad'

export function useDocumentMeta(titulo: string, descripcion?: string) {
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

    return () => {
      document.title = tituloAnterior
      if (meta && descripcionAnterior !== undefined) {
        meta.content = descripcionAnterior
      }
    }
  }, [titulo, descripcion])
}
