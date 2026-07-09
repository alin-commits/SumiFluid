# SumiFluid

Sitio estático (HTML/CSS/JS sin build) de Sumifluid S.L.

## Estructura

```
index.html                 Home (raíz, requerido por el hosting)
hidraulica/index.html      Categoría Hidráulica  -> /hidraulica/
neumatica/index.html       Categoría Neumática   -> /neumatica/
estanqueidad/index.html    Categoría Estanqueidad -> /estanqueidad/
vacio/index.html           Categoría Vacío       -> /vacio/
marcas/index.html          Marcas                -> /marcas/
contacto/index.html        Contacto              -> /contacto/
hidraulica/*.html          Fichas de producto de Hidráulica
neumatica/*.html           Fichas de producto de Neumática
estanqueidad/*.html        Fichas de producto de Estanqueidad
vacio/*.html                Fichas de producto de Vacío

assets/css/styles.css      Estilos
assets/js/main.js          JS propio del sitio
assets/js/vendor/          Librerías de terceros (gsap, ScrollTrigger, manifest)
assets/img/                Imágenes, organizadas por categoría

tools/                     Scripts Python de generación/mantenimiento (dev-time only, no se sube al hosting)
  generate_families.py     Genera las páginas de familia de producto
  inject_faq.py            Inyecta bloques de FAQ en páginas existentes
  faq_data_completo.py     Datos de FAQ por familia

*.html (raíz, hidraulica.html, neumatica.html, etc.)  Redirecciones a las nuevas URLs con carpeta
  (mantienen vivos los enlaces/índices antiguos; ver también .htaccess y _redirects)
```

## Redirecciones de URLs antiguas

Las páginas de categoría se movieron de `hidraulica.html` a `hidraulica/` (URLs más limpias). Para no perder enlaces
externos ni posicionamiento SEO ya indexado:

- `hidraulica.html`, `neumatica.html`, `estanqueidad.html`, `vacio.html`, `marcas.html` y `contacto.html` siguen
  existiendo en la raíz como páginas de redirección (meta-refresh + `rel=canonical`) hacia su nueva URL.
- `.htaccess` incluye redirecciones 301 reales para hosting Apache.
- `_redirects` incluye el mismo mapeo para hosting tipo Netlify.

Revisa con tu proveedor de hosting cuál de los dos mecanismos aplica (o si necesitas configurar algo distinto).

## Desarrollo

No hay build. Para añadir una familia de producto nueva, edita `tools/generate_families.py` y ejecútalo desde la raíz
del repo con Python 3.
