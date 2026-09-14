import { useState } from 'react'
import { IconChevronLeft, IconChevronRight } from './Icons'
import './ProductGallery.css'

export default function ProductGallery({
  imagenes,
  alt,
}: {
  imagenes: string[]
  alt: string
}) {
  const [activa, setActiva] = useState(0)

  function anterior() {
    setActiva((i) => (i === 0 ? imagenes.length - 1 : i - 1))
  }

  function siguiente() {
    setActiva((i) => (i === imagenes.length - 1 ? 0 : i + 1))
  }

  return (
    <div className="gallery">
      <div className="gallery__main">
        <div className="gallery__zoom">
          <img key={activa} src={imagenes[activa]} alt={alt} />
        </div>

        {imagenes.length > 1 && (
          <>
            <button
              className="gallery__arrow gallery__arrow--left"
              onClick={anterior}
              aria-label="Imagen anterior"
            >
              <IconChevronLeft />
            </button>
            <button
              className="gallery__arrow gallery__arrow--right"
              onClick={siguiente}
              aria-label="Imagen siguiente"
            >
              <IconChevronRight />
            </button>
          </>
        )}
      </div>

      {imagenes.length > 1 && (
        <div className="gallery__thumbs">
          {imagenes.map((img, i) => (
            <button
              key={img + i}
              className={`gallery__thumb ${i === activa ? 'is-active' : ''}`}
              onClick={() => setActiva(i)}
              aria-label={`Ver imagen ${i + 1}`}
            >
              <img src={img} alt="" />
            </button>
          ))}
        </div>
      )}
    </div>
  )
}
