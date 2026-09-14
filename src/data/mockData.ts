import type { Producto, Testimonio, Categoria, Especificacion, ConfiguracionSitio } from '../types'

export const CATEGORIAS: { value: Categoria; label: string }[] = [
  { value: 'cocinas-a-gas', label: 'Cocinas a gas' },
  { value: 'cocinas-electricas', label: 'Cocinas eléctricas' },
  { value: 'campanas', label: 'Campanas extractoras' },
  { value: 'electrodomesticos', label: 'Electrodomésticos' },
  { value: 'accesorios', label: 'Accesorios para el hogar' },
]

const NOTA_GARANTIA = 'Todos nuestros productos cuentan con 6 meses de garantía.'
const NOTA_STOCK = 'Antes de realizar la compra, consultar stock disponible.'
const NOTA_GASISTA =
  'Las cocinas deben ser instaladas por un gasista matriculado para garantizar un uso seguro.'
const NOTA_TECNICO =
  'Recomendamos la instalación por un técnico matriculado para un funcionamiento seguro.'
const NOTA_MEDIDAS =
  'Verificá las medidas del espacio antes de la compra para asegurar una instalación correcta.'

const specsGas = (hornallas: number): Especificacion[] => [
  { label: 'Hornallas', valor: `${hornallas}` },
  { label: 'Encendido', valor: 'Electrónico' },
  { label: 'Material', valor: 'Acero inoxidable' },
  { label: 'Horno', valor: 'Con grill y visor' },
  { label: 'Tipo de gas', valor: 'Natural y envasado (incluye inyectores)' },
]

// Nota: son productos de ejemplo con fotos de stock genéricas.
// Cuando conectes Supabase vas a poder cargar tus propios productos,
// fotos reales y especificaciones desde el panel de Admin.
export let PRODUCTOS: Producto[] = [
  {
    id: '1',
    nombre: 'Cocina Industrial 4 Hornallas Con Plancha y Horno',
    categoria: 'cocinas-a-gas',
    precio: 580000,
    precioOriginal: 620000,
    rating: 4.8,
    reseñas: 12,
    stock: true,
    cantidadStock: 4,
    descripcion:
      'Cocina industrial a gas de 4 hornallas con plancha y horno, encendido electrónico y visor.',
    descripcionLarga:
      'Pensada para cocinas grandes o uso semi-industrial, combina 4 hornallas de alta potencia con una plancha lateral para cocción pareja y un horno amplio con visor y grill. Estructura de acero inoxidable, fácil de limpiar y pensada para uso intensivo diario.',
    medidas: '100 x 65 x 90 cm (ancho x profundidad x alto)',
    especificaciones: [...specsGas(4), { label: 'Plancha lateral', valor: 'Sí, acero pulido' }],
    garantiaMeses: 6,
    notasImportantes: [NOTA_GARANTIA, NOTA_GASISTA, NOTA_STOCK],
    imagenes: ['https://images.pexels.com/photos/7601144/pexels-photo-7601144.jpeg?auto=compress&cs=tinysrgb&w=800'],
    destacado: true,
    oferta: true,
    creadoEn: '2026-06-01',
  },
  {
    id: '2',
    nombre: 'Cocina Industrial 6 Hornallas con Horno Pizzero',
    categoria: 'cocinas-a-gas',
    precio: 370000,
    precioOriginal: null,
    rating: 4.8,
    reseñas: 12,
    stock: true,
    cantidadStock: 6,
    descripcion:
      'Cocina industrial de 6 hornallas con horno pizzero, ideal para emprendimientos gastronómicos.',
    descripcionLarga:
      'Diseñada para emprendimientos gastronómicos que necesitan cocción a alta temperatura: el horno pizzero alcanza temperaturas elevadas de forma pareja, mientras las 6 hornallas permiten preparar varios platos al mismo tiempo sin perder potencia.',
    medidas: '120 x 70 x 92 cm (ancho x profundidad x alto)',
    especificaciones: [
      ...specsGas(6),
      { label: 'Horno', valor: 'Tipo pizzero, alta temperatura' },
    ],
    garantiaMeses: 6,
    notasImportantes: [NOTA_GARANTIA, NOTA_GASISTA, NOTA_STOCK],
    imagenes: ['https://images.pexels.com/photos/10827395/pexels-photo-10827395.jpeg?auto=compress&cs=tinysrgb&w=800'],
    destacado: true,
    oferta: false,
    creadoEn: '2026-06-02',
  },
  {
    id: '3',
    nombre: 'Cocina Industrial 4 Hornallas Familiar',
    categoria: 'cocinas-a-gas',
    precio: 380000,
    precioOriginal: null,
    rating: 4.8,
    reseñas: 12,
    stock: true,
    cantidadStock: 5,
    descripcion:
      'Cocina a gas de 4 hornallas pensada para el uso familiar diario, con horno y grill.',
    descripcionLarga:
      'Un equilibrio entre tamaño compacto y capacidad de cocción, ideal para el día a día de una familia. El horno con grill permite gratinar y dorar sin necesidad de otro electrodoméstico.',
    medidas: '85 x 60 x 88 cm (ancho x profundidad x alto)',
    especificaciones: specsGas(4),
    garantiaMeses: 6,
    notasImportantes: [NOTA_GARANTIA, NOTA_GASISTA, NOTA_STOCK],
    imagenes: ['https://images.pexels.com/photos/5502254/pexels-photo-5502254.jpeg?auto=compress&cs=tinysrgb&w=800'],
    destacado: true,
    oferta: false,
    creadoEn: '2026-06-03',
  },
  {
    id: '4',
    nombre: 'Cocina Industrial 5 Hornallas Morelli Saho',
    categoria: 'cocinas-a-gas',
    precio: 590000,
    precioOriginal: null,
    rating: 4.8,
    reseñas: 12,
    stock: true,
    cantidadStock: 3,
    descripcion:
      'Cocina Morelli Saho de 5 hornallas, acero inoxidable, horno de gran capacidad.',
    descripcionLarga:
      'Un clásico de la marca Morelli: 5 hornallas de distinta potencia para adaptarse a cualquier tipo de cocción, con un horno de gran capacidad que admite bandejas grandes y fuentes para varias porciones.',
    medidas: '95 x 62 x 90 cm (ancho x profundidad x alto)',
    especificaciones: specsGas(5),
    garantiaMeses: 6,
    notasImportantes: [NOTA_GARANTIA, NOTA_GASISTA, NOTA_STOCK],
    imagenes: ['https://images.pexels.com/photos/39383578/pexels-photo-39383578.jpeg?auto=compress&cs=tinysrgb&w=800'],
    destacado: true,
    oferta: false,
    creadoEn: '2026-06-04',
  },
  {
    id: '5',
    nombre: 'Cocina Eléctrica 4 Anafes Vitrocerámica',
    categoria: 'cocinas-electricas',
    precio: 450000,
    precioOriginal: 520000,
    rating: 4.8,
    reseñas: 12,
    stock: true,
    cantidadStock: 3,
    descripcion: 'Cocina eléctrica con anafes vitrocerámicos y horno eléctrico.',
    descripcionLarga:
      'Combina el diseño moderno de la vitrocerámica con la practicidad de un horno eléctrico con temporizador. Ideal para quienes prefieren evitar la conexión a gas sin resignar potencia de cocción.',
    medidas: '85 x 60 x 88 cm (ancho x profundidad x alto)',
    especificaciones: [
      { label: 'Anafes', valor: '4' },
      { label: 'Potencia', valor: '~3000W' },
      { label: 'Panel', valor: 'Táctil vitrocerámico' },
      { label: 'Horno', valor: 'Eléctrico con temporizador' },
    ],
    garantiaMeses: 6,
    notasImportantes: [NOTA_GARANTIA, NOTA_GASISTA, NOTA_STOCK],
    imagenes: ['https://images.pexels.com/photos/10827399/pexels-photo-10827399.jpeg?auto=compress&cs=tinysrgb&w=800'],
    destacado: true,
    oferta: true,
    creadoEn: '2026-06-05',
  },
  {
    id: '6',
    nombre: 'Campana Extractora Slim Acero Morelli Ferro',
    categoria: 'campanas',
    precio: 326000,
    precioOriginal: 360000,
    rating: 4.8,
    reseñas: 12,
    stock: true,
    cantidadStock: 4,
    descripcion:
      'Campana extractora slim de acero inoxidable, 3 velocidades, filtro lavable.',
    descripcionLarga:
      'Diseño slim que se integra a cocinas modernas sin restar espacio visual. Su motor de bajo consumo con 3 velocidades permite regular la extracción según la intensidad de cocción.',
    medidas: '60 cm de ancho (pared)',
    especificaciones: [
      { label: 'Velocidades', valor: '3' },
      { label: 'Filtro', valor: 'Aluminio lavable' },
      { label: 'Motor', valor: 'Bajo consumo' },
      { label: 'Salida de aire', valor: 'Superior / trasera' },
    ],
    garantiaMeses: 6,
    notasImportantes: [NOTA_GARANTIA, NOTA_TECNICO, NOTA_STOCK],
    imagenes: ['https://images.pexels.com/photos/12119355/pexels-photo-12119355.jpeg?auto=compress&cs=tinysrgb&w=800'],
    destacado: true,
    oferta: true,
    creadoEn: '2026-06-06',
  },
  {
    id: '7',
    nombre: 'Campana Extractora Slim Acero Gastrolibertad',
    categoria: 'campanas',
    precio: 250000,
    precioOriginal: null,
    rating: 4.8,
    reseñas: 12,
    stock: true,
    cantidadStock: 5,
    descripcion:
      'Campana extractora slim de línea propia, acero inoxidable, fácil instalación.',
    descripcionLarga:
      'Nuestra línea propia, pensada para una instalación simple y un mantenimiento sencillo, con filtro extraíble y lavable.',
    medidas: '60 cm de ancho (pared)',
    especificaciones: [
      { label: 'Velocidades', valor: '3' },
      { label: 'Filtro', valor: 'Aluminio lavable' },
      { label: 'Motor', valor: 'Bajo consumo' },
    ],
    garantiaMeses: 6,
    notasImportantes: [NOTA_GARANTIA, NOTA_TECNICO, NOTA_STOCK],
    imagenes: ['https://images.pexels.com/photos/15062155/pexels-photo-15062155.jpeg?auto=compress&cs=tinysrgb&w=800'],
    destacado: false,
    oferta: false,
    creadoEn: '2026-06-07',
  },
  {
    id: '8',
    nombre: 'Campana Extractora 60cm Acero',
    categoria: 'campanas',
    precio: 220000,
    precioOriginal: null,
    rating: 4.8,
    reseñas: 12,
    stock: true,
    cantidadStock: 6,
    descripcion:
      'Campana extractora de pared de 60cm, acero inoxidable, filtro de aluminio lavable.',
    descripcionLarga:
      'Opción de entrada de nuestra línea de campanas, con el mismo acero inoxidable y filtro lavable, en formato de pared estándar de 60cm.',
    medidas: '60 cm de ancho (pared)',
    especificaciones: [
      { label: 'Velocidades', valor: '2' },
      { label: 'Filtro', valor: 'Aluminio lavable' },
    ],
    garantiaMeses: 6,
    notasImportantes: [NOTA_GARANTIA, NOTA_TECNICO, NOTA_STOCK],
    imagenes: ['https://images.pexels.com/photos/7601172/pexels-photo-7601172.jpeg?auto=compress&cs=tinysrgb&w=800'],
    destacado: false,
    oferta: false,
    creadoEn: '2026-06-08',
  },
  {
    id: '9',
    nombre: 'Heladera Drean Modelo HDR280F00B',
    categoria: 'electrodomesticos',
    precio: 600000,
    precioOriginal: null,
    rating: 4.8,
    reseñas: 12,
    stock: true,
    cantidadStock: 2,
    descripcion: 'Heladera con freezer Drean, 280 litros aproximados, bajo consumo.',
    descripcionLarga:
      'Heladera con freezer superior de buena capacidad para el día a día de una familia, con estantes regulables y bajo consumo eléctrico.',
    medidas: '60 x 65 x 170 cm (ancho x profundidad x alto)',
    especificaciones: [
      { label: 'Capacidad', valor: '280 L aprox.' },
      { label: 'Tipo', valor: 'Con freezer superior' },
      { label: 'Consumo', valor: 'Bajo consumo' },
    ],
    garantiaMeses: 6,
    notasImportantes: [NOTA_GARANTIA, NOTA_MEDIDAS, NOTA_STOCK],
    imagenes: ['https://images.pexels.com/photos/6835124/pexels-photo-6835124.jpeg?auto=compress&cs=tinysrgb&w=800'],
    destacado: true,
    oferta: false,
    creadoEn: '2026-06-09',
  },
  {
    id: '10',
    nombre: 'Horno Eléctrico 40 Litros',
    categoria: 'electrodomesticos',
    precio: 185000,
    precioOriginal: 210000,
    rating: 4.8,
    reseñas: 12,
    stock: true,
    cantidadStock: 7,
    descripcion:
      'Horno eléctrico de 40 litros, ideal para reforzar la cocina o para departamentos chicos.',
    descripcionLarga:
      'Un aliado extra en la cocina o la mejor opción principal para espacios chicos: 40 litros de capacidad, control de temperatura preciso y resistencias superior e inferior independientes.',
    medidas: '52 x 42 x 34 cm (ancho x profundidad x alto)',
    especificaciones: [
      { label: 'Capacidad', valor: '40 L' },
      { label: 'Temperatura máxima', valor: '250°C' },
      { label: 'Resistencias', valor: 'Superior e inferior independientes' },
    ],
    garantiaMeses: 6,
    notasImportantes: [NOTA_GARANTIA, NOTA_MEDIDAS, NOTA_STOCK],
    imagenes: ['https://images.pexels.com/photos/6835094/pexels-photo-6835094.jpeg?auto=compress&cs=tinysrgb&w=800'],
    destacado: false,
    oferta: true,
    creadoEn: '2026-06-10',
  },
  {
    id: '11',
    nombre: 'Set de Ollas Acero Inoxidable 5 Piezas',
    categoria: 'accesorios',
    precio: 95000,
    precioOriginal: null,
    rating: 4.8,
    reseñas: 12,
    stock: true,
    cantidadStock: 10,
    descripcion:
      'Set de 5 piezas de ollas de acero inoxidable, incluye utensilios de cocina.',
    descripcionLarga:
      'Set completo para equipar la cocina de una sola vez: incluye ollas de distintos tamaños y utensilios básicos, todo en acero inoxidable apto para todo tipo de anafes.',
    medidas: 'Ollas de 16, 18, 20, 24 y 28 cm de diámetro',
    especificaciones: [
      { label: 'Piezas', valor: '5' },
      { label: 'Material', valor: 'Acero inoxidable 18/10' },
      { label: 'Apto para', valor: 'Gas, eléctrico e inducción' },
    ],
    garantiaMeses: 6,
    notasImportantes: [NOTA_GARANTIA, NOTA_STOCK],
    imagenes: ['https://images.pexels.com/photos/5782042/pexels-photo-5782042.jpeg?auto=compress&cs=tinysrgb&w=800'],
    destacado: false,
    oferta: false,
    creadoEn: '2026-06-11',
  },
  {
    id: '12',
    nombre: 'Anafe 2 Hornallas a Gas',
    categoria: 'accesorios',
    precio: 78000,
    precioOriginal: null,
    rating: 4.8,
    reseñas: 12,
    stock: true,
    cantidadStock: 8,
    descripcion:
      'Anafe portátil a gas de 2 hornallas, ideal como refuerzo o para espacios chicos.',
    descripcionLarga:
      'Compacto y portátil, perfecto como segunda hornalla para eventos, quinchos o como refuerzo en la cocina principal. Encendido piezoeléctrico, no necesita fósforos ni encendedor.',
    medidas: '55 x 30 x 12 cm (ancho x profundidad x alto)',
    especificaciones: [
      { label: 'Hornallas', valor: '2' },
      { label: 'Encendido', valor: 'Piezoeléctrico' },
      { label: 'Uso', valor: 'Gas envasado' },
    ],
    garantiaMeses: 6,
    notasImportantes: [NOTA_GARANTIA, NOTA_GASISTA, NOTA_STOCK],
    imagenes: ['https://images.pexels.com/photos/15824944/pexels-photo-15824944.jpeg?auto=compress&cs=tinysrgb&w=800'],
    destacado: false,
    oferta: false,
    creadoEn: '2026-06-12',
  },
]

export let TESTIMONIOS: Testimonio[] = [
  {
    id: 't1',
    nombre: 'Marina G.',
    comentario:
      'Compré una cocina industrial y me asesoraron con las medidas. Llegó en dos días y perfecta.',
    foto: null,
    aprobado: true,
    creadoEn: '2026-05-10',
  },
  {
    id: 't2',
    nombre: 'Diego P.',
    comentario:
      'Excelente atención por WhatsApp, me confirmaron el stock al instante y coordinamos el envío.',
    foto: null,
    aprobado: true,
    creadoEn: '2026-05-15',
  },
  {
    id: 't3',
    nombre: 'Carla R.',
    comentario:
      'Muy buenos precios y productos de calidad. Ya les compré tres veces para mi emprendimiento.',
    foto: null,
    aprobado: true,
    creadoEn: '2026-05-20',
  },
]

export let CONFIGURACION: ConfiguracionSitio = {
  heroImagen: 'https://images.pexels.com/photos/10827395/pexels-photo-10827395.jpeg?auto=compress&cs=tinysrgb&w=1200',
  tileCocinas: 'https://images.pexels.com/photos/7601144/pexels-photo-7601144.jpeg?auto=compress&cs=tinysrgb&w=800',
  tileCampanas: 'https://images.pexels.com/photos/12119355/pexels-photo-12119355.jpeg?auto=compress&cs=tinysrgb&w=800',
  tileElectro: 'https://images.pexels.com/photos/6835124/pexels-photo-6835124.jpeg?auto=compress&cs=tinysrgb&w=800',
  tileAccesorios: 'https://images.pexels.com/photos/5782042/pexels-photo-5782042.jpeg?auto=compress&cs=tinysrgb&w=800',
  nosotrosImagen: 'https://images.pexels.com/photos/10827396/pexels-photo-10827396.jpeg?auto=compress&cs=tinysrgb&w=900',
}

export function setMockConfiguracion(config: ConfiguracionSitio) {
  CONFIGURACION = config
}

export function setMockProductos(productos: Producto[]) {
  PRODUCTOS = productos
}

export function setMockTestimonios(testimonios: Testimonio[]) {
  TESTIMONIOS = testimonios
}
