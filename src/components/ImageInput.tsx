import { useRef, useState } from 'react'
import { subirImagen } from '../services/storage'
import './ImageInput.css'

export default function ImageInput({
  value,
  onChange,
  label,
}: {
  value: string
  onChange: (url: string) => void
  label?: string
}) {
  const fileRef = useRef<HTMLInputElement>(null)
  const [subiendo, setSubiendo] = useState(false)
  const [error, setError] = useState<string | null>(null)

  async function onFile(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0]
    if (!file) return
    setSubiendo(true)
    setError(null)
    try {
      const url = await subirImagen(file)
      onChange(url)
    } catch {
      setError(
        'No se pudo subir el archivo (revisá que exista el bucket "imagenes" en Supabase Storage). Mientras tanto, podés pegar una URL.'
      )
    } finally {
      setSubiendo(false)
      if (fileRef.current) fileRef.current.value = ''
    }
  }

  return (
    <div className="image-input">
      {label && <span className="image-input__label">{label}</span>}

      {value && (
        <div className="image-input__preview">
          <img src={value} alt="" />
        </div>
      )}

      <div className="image-input__row">
        <input
          type="text"
          value={value}
          onChange={(e) => onChange(e.target.value)}
          placeholder="Pegar URL de una imagen…"
        />
        <button
          type="button"
          className="btn btn-outline btn-sm"
          onClick={() => fileRef.current?.click()}
          disabled={subiendo}
        >
          {subiendo ? 'Subiendo…' : 'Subir desde PC'}
        </button>
        <input
          ref={fileRef}
          type="file"
          accept="image/*"
          hidden
          onChange={onFile}
        />
      </div>

      {error && <p className="image-input__error">{error}</p>}
    </div>
  )
}
