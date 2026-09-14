# Gastrolibertad

Sitio de Gastrolibertad (cocinas, campanas y equipamiento para el hogar)
migrado de Lovable a un proyecto React + Vite propio, con panel de Admin.

## Requisitos

- Node.js 18 o superior.

## Puesta en marcha local

```bash
npm install
npm run dev
```

Esto levanta el sitio en `http://localhost:5173`. Sin configurar nada más,
la tienda y el panel de Admin funcionan con **datos de ejemplo en memoria**
(productos y reseñas ficticios) para que puedas probar todo el flujo.

Login de prueba del panel de Admin (`/admin`):

- Email: `admin@gastrolibertad.com`
- Contraseña: `demo1234`

> Los datos de ejemplo se reinician cada vez que recargás la página, porque
> viven en memoria del navegador. Para persistir de verdad, conectá
> Supabase (siguiente sección).

## Conectar Supabase (para persistencia real y multiusuario)

1. Creá un proyecto gratis en [supabase.com](https://supabase.com).
2. Andá a **SQL Editor** y ejecutá el contenido de `supabase/schema.sql`
   (crea las tablas `productos`, `testimonios` y `configuracion`, con las
   reglas de acceso, y los permisos del bucket de imágenes).
3. Andá a **Storage** y creá un bucket nuevo llamado `imagenes`, marcado
   como **Public bucket** (así las fotos subidas se pueden ver desde el
   sitio). Esto es lo que permite subir fotos desde la PC en el Admin, en
   vez de tener que pegar siempre una URL.
4. Andá a **Authentication → Users** y creá un usuario por cada persona que
   necesite entrar al Admin (por ejemplo vos y el dueño de Gastrolibertad).
5. Copiá `.env.example` a `.env` y completá:
   ```
   VITE_SUPABASE_URL=https://xxxx.supabase.co
   VITE_SUPABASE_ANON_KEY=xxxx
   ```
   (los encontrás en **Project Settings → API** de tu proyecto Supabase).
6. Reiniciá `npm run dev`. A partir de acá, el sitio y el Admin leen y
   escriben directamente en Supabase, y el login usa las cuentas reales que
   creaste en el paso 4.

## Cargar tus productos y fotos reales

Con Supabase conectado, entrá a `/admin`, iniciá sesión y desde la pestaña
**Productos y stock** vas a poder:

- Crear, editar y eliminar productos.
- Marcar/desmarcar el stock con un clic (esto es lo que se ve como
  "Stock disponible" / "Sin stock" en la tienda).
- Elegir qué productos aparecen en "Productos destacados" de la Home.

Desde **Reseñas** podés cargar los comentarios reales de tus clientes
(nombre, comentario y foto opcional) y aprobarlos para que se muestren en
la Home, reemplazando los de muestra.

> Este proyecto no incluye todavía un servicio de subida de imágenes: las
> fotos de productos y reseñas se cargan pegando una URL. Si querés subir
> archivos directamente desde el panel, se puede sumar usando
> **Supabase Storage** más adelante.

## Deploy (salir de Lovable)

El proyecto es un sitio estático estándar de Vite, así que se puede
publicar en cualquier hosting, por ejemplo:

- **Vercel** o **Netlify**: conectá el repositorio de GitHub, con comando
  de build `npm run build` y carpeta de salida `dist`. Cargá ahí las
  mismas variables `VITE_SUPABASE_URL` y `VITE_SUPABASE_ANON_KEY`.
  Cada vez que subís un cambio al repositorio, el sitio se actualiza solo.
- **Hosting compartido tipo Hostinger** (o cualquiera que solo permita
  subir archivos, sin correr Node): ver el paso a paso abajo.

### Deploy en Hostinger (o hosting compartido similar)

Este tipo de hosting no ejecuta el proyecto: solo sirve los archivos ya
compilados. Los pasos son:

1. **Completá el `.env`** con las credenciales reales de Supabase (ver
   sección anterior) *antes* de compilar. Las variables `VITE_...`
   quedan "horneadas" dentro de los archivos en el paso siguiente, no se
   pueden cambiar después de subir el sitio sin volver a compilar.
2. Compilá el proyecto:
   ```bash
   npm install
   npm run build
   ```
   Esto genera una carpeta `dist/` con HTML, CSS y JS ya listos.
3. Subí el **contenido** de `dist/` (no la carpeta en sí, ni el resto del
   proyecto) a `public_html` de Hostinger, usando el Administrador de
   Archivos de hPanel o por FTP. Si el sitio va en un subdominio o
   subcarpeta, subí el contenido ahí.
4. El proyecto ya incluye un archivo `.htaccess` (dentro de `public/`,
   así que termina en `dist/.htaccess` al compilar) necesario para que
   rutas como `/tienda` o `/admin` funcionen al entrar directo o recargar
   la página. Sin ese archivo, esas URLs tirarían error 404 en Apache.
   Verificá que se haya subido también (a veces los clientes FTP ocultan
   archivos que empiezan con punto).
5. Activá el certificado SSL gratuito desde hPanel para que el sitio
   quede en `https://`.

**Importante:** cada vez que cambies el *código* del sitio (diseño,
textos fijos, etc.) vas a tener que repetir los pasos 2 y 3 (compilar y
volver a subir `dist/`). Los cambios de *contenido* (productos, stock,
reseñas) no necesitan esto: se hacen desde `/admin` una vez que Supabase
está conectado, y se reflejan solos porque se leen en el momento desde
la base de datos.

Si preferís no tener que repetir ese paso manual cada vez, Vercel o
Netlify hacen lo mismo automáticamente con cada cambio en el código.

## Estructura del proyecto

```
src/
  components/   Header, Footer, botón de WhatsApp, tarjeta de producto
  contexts/      Autenticación del Admin
  data/          Datos de ejemplo (mientras no hay Supabase)
  lib/           Cliente de Supabase
  pages/         Home, Tienda, Producto, Nosotros, Contacto
  pages/admin/   Login y panel de Admin (productos, stock, reseñas)
  services/      Funciones que leen/escriben productos y reseñas
  types/         Tipos de datos (Producto, Testimonio, Admin)
supabase/
  schema.sql     Esquema SQL para crear las tablas en Supabase
```
