-- Ejecutar en el SQL Editor de tu proyecto de Supabase.

create table if not exists productos (
  id uuid primary key default gen_random_uuid(),
  nombre text not null,
  categoria text not null,
  precio numeric not null default 0,
  precio_original numeric,
  rating numeric not null default 4.8,
  resenas integer not null default 0,
  stock boolean not null default true,
  cantidad_stock integer,
  descripcion text default '',
  descripcion_larga text default '',
  medidas text default '',
  especificaciones jsonb default '[]',
  garantia_meses integer not null default 6,
  notas_importantes text[] default '{}',
  imagenes text[] default '{}',
  destacado boolean not null default false,
  oferta boolean not null default false,
  creado_en timestamptz not null default now()
);

create table if not exists testimonios (
  id uuid primary key default gen_random_uuid(),
  nombre text not null,
  comentario text not null,
  foto text,
  aprobado boolean not null default false,
  creado_en timestamptz not null default now()
);

-- Fila única con las imágenes del hero y los tiles de categorías de la Home,
-- y la imagen de la página Nosotros. Se edita desde /admin, pestaña "Diseño".
create table if not exists configuracion (
  id text primary key default 'home',
  hero_imagen text,
  tile_cocinas text,
  tile_variedad text,
  tile_campanas text,
  tile_electro text,
  tile_accesorios text,
  nosotros_imagen text
);

-- Categorías de productos. Se editan desde /admin, pestaña "Categorías".
create table if not exists categorias (
  id uuid primary key default gen_random_uuid(),
  valor text not null unique,
  etiqueta text not null,
  orden integer not null default 0
);

alter table productos enable row level security;
alter table testimonios enable row level security;
alter table configuracion enable row level security;
alter table categorias enable row level security;

-- Lectura pública (para que la tienda y la home puedan mostrar productos
-- y reseñas sin necesidad de estar logueado).
create policy "Lectura pública de productos"
  on productos for select
  using (true);

create policy "Lectura pública de testimonios"
  on testimonios for select
  using (true);

create policy "Lectura pública de configuración"
  on configuracion for select
  using (true);

create policy "Lectura pública de categorías"
  on categorias for select
  using (true);

-- Escritura solo para usuarios autenticados (los admins que crees en
-- Authentication > Users dentro de Supabase).
create policy "Admins pueden escribir productos"
  on productos for all
  using (auth.role() = 'authenticated')
  with check (auth.role() = 'authenticated');

create policy "Admins pueden escribir testimonios"
  on testimonios for all
  using (auth.role() = 'authenticated')
  with check (auth.role() = 'authenticated');

create policy "Admins pueden escribir configuración"
  on configuracion for all
  using (auth.role() = 'authenticated')
  with check (auth.role() = 'authenticated');

create policy "Admins pueden escribir categorías"
  on categorias for all
  using (auth.role() = 'authenticated')
  with check (auth.role() = 'authenticated');

-- Storage: bucket para las imágenes que se suban desde el Admin (productos,
-- reseñas, hero). El bucket "imagenes" se crea a mano desde Storage > New
-- bucket (marcalo como "Public bucket"); estas políticas habilitan la
-- lectura pública y que los admins logueados puedan subir archivos.
create policy "Lectura pública del bucket imagenes"
  on storage.objects for select
  using (bucket_id = 'imagenes');

create policy "Admins pueden subir al bucket imagenes"
  on storage.objects for insert
  with check (bucket_id = 'imagenes' and auth.role() = 'authenticated');
