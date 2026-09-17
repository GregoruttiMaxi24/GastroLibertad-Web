export interface CategoriaItem {
  id: string
  valor: string
  etiqueta: string
  orden: number
}

export interface Especificacion {
  label: string
  valor: string
}

export interface Producto {
  id: string
  nombre: string
  categoria: string
  precio: number
  precioOriginal: number | null
  rating: number
  reseñas: number
  stock: boolean
  cantidadStock: number | null
  descripcion: string
  descripcionLarga: string
  medidas: string
  especificaciones: Especificacion[]
  garantiaMeses: number
  notasImportantes: string[]
  imagenes: string[]
  destacado: boolean
  oferta: boolean
  creadoEn: string
}

export interface Testimonio {
  id: string
  nombre: string
  comentario: string
  foto: string | null
  aprobado: boolean
  creadoEn: string
}

export interface ConfiguracionSitio {
  heroImagen: string
  tileCocinas: string
  tileVariedad: string
  tileCampanas: string
  tileElectro: string
  tileAccesorios: string
  nosotrosImagen: string
}

export interface Admin {
  id: string
  email: string
}
