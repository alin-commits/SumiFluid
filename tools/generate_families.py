#!/usr/bin/env python3
# -*- coding: utf-8 -*-
"""
Genera las paginas de familia (todas comparten la misma estructura).
Dev-time only: no se sube al hosting, vive en tools/.
"""
import os
from pathlib import Path

ROOT = Path(__file__).resolve().parent.parent

CATS = {
    "hidraulica": {
        "label": "Hidráulica",
        "num": "01",
        "lead": "Componentes de hidráulica industrial con stock permanente en nuestro almacén de Elche. Si necesita una medida o prestación fuera de catálogo, la diseñamos y fabricamos en nuestro propio taller.",
        "brands": [
            ("Eaton", "https://sumifluid.com/wp-content/uploads/2017/06/eaton.png"),
            ("Sauer Danfoss", "https://sumifluid.com/wp-content/uploads/2017/06/sauer-danfoss.jpg"),
            ("Roquet", "https://sumifluid.com/wp-content/uploads/2017/06/roquet.jpg"),
            ("Donaldson", "https://sumifluid.com/wp-content/uploads/2017/06/donaldson.png"),
            ("TDZ", "https://sumifluid.com/wp-content/uploads/2017/06/tdz.png"),
            ("Mann Filter", "https://sumifluid.com/wp-content/uploads/2017/06/mann-filter.png"),
            ("Fontán", "https://sumifluid.com/wp-content/uploads/2017/06/fontan.png"),
        ],
    },
    "neumatica": {
        "label": "Neumática",
        "num": "02",
        "lead": "Componentes de neumática y automatización industrial, con stock permanente y fabricación a medida bajo normativa ISO 6431, ISO 6432 y Unitop cuando aplica.",
        "brands": [
            ("Aignep", "https://sumifluid.com/wp-content/uploads/2017/06/aignep.png"),
            ("Mecfluid", "https://sumifluid.com/wp-content/uploads/2017/06/mecfluid2.png"),
            ("TG Filter", "https://sumifluid.com/wp-content/uploads/2017/06/tg-filter.png"),
            ("Omal", "https://sumifluid.com/wp-content/uploads/2017/06/omal.png"),
            ("Fox", "https://sumifluid.com/wp-content/uploads/2017/06/fox.png"),
        ],
    },
    "estanqueidad": {
        "label": "Estanqueidad",
        "num": "03",
        "lead": "Más de 5.000 referencias en NBR, EPDM, VMQ, FKM y PTFE, para aplicaciones dinámicas y estáticas en cualquier sector industrial.",
        "brands": [
            ("Eaton", "https://sumifluid.com/wp-content/uploads/2017/06/eaton.png"),
            ("Roquet", "https://sumifluid.com/wp-content/uploads/2017/06/roquet.jpg"),
            ("Fontán", "https://sumifluid.com/wp-content/uploads/2017/06/fontan.png"),
            ("Omal", "https://sumifluid.com/wp-content/uploads/2017/06/omal.png"),
        ],
    },
    "vacio": {
        "label": "Vacío",
        "num": "04",
        "lead": "Soluciones de vacío industrial con foco en eficiencia energética, junto a fabricantes de referencia como COVAL y DVP Vacuum Technology.",
        "brands": [
            ("Aignep", "https://sumifluid.com/wp-content/uploads/2017/06/aignep.png"),
            ("Fox", "https://sumifluid.com/wp-content/uploads/2017/06/fox.png"),
            ("Omal", "https://sumifluid.com/wp-content/uploads/2017/06/omal.png"),
        ],
    },
}

# (slug, nombre, imagen_o_None)
FAMILIES = {
    "hidraulica": [
        ("motores-hidraulicos", "Motores Hidráulicos", "https://sumifluid.com/wp-content/uploads/2021/01/MOTORES_HIDRAULICOS_IMAGEN_2-150x150.jpg"),
        ("electrovalvulas-hidraulicas", "Electroválvulas Hidráulicas", "https://sumifluid.com/wp-content/uploads/2021/01/SUMIFLUID_HIDRAULICA_ELECTROVALVULAS_IMAGEN_1-150x150.jpg"),
        ("cilindros-hidraulicos", "Cilindros Hidráulicos", "https://sumifluid.com/wp-content/uploads/2021/01/CILINDROS_HIDRAULICOS_IMAGEN_2-150x150.jpg"),
        ("mangueras-hidraulicas", "Mangueras Hidráulicas", "https://sumifluid.com/wp-content/uploads/2021/02/MANGUERAS_HIDRAULICAS_IMAGEN_3-150x150.jpg"),
        ("centrales-hidraulicas", "Centrales Hidráulicas", "https://sumifluid.com/wp-content/uploads/2018/09/centrales-hidraulicas-alicante-1-150x150.jpg"),
        ("acumuladores-de-presion-hidraulica", "Acumuladores de Presión", None),
        ("bombas-hidraulicas", "Bombas Hidráulicas", None),
        ("bombas-trasvase", "Bombas Trasvase", None),
        ("campanas", "Campanas Hidráulicas", None),
        ("caudalimetros", "Caudalímetros Hidráulicos", None),
        ("caudalimetros-electromagneticos", "Caudalímetros Electromagnéticos", None),
        ("caudalimetros-ultrasonicos", "Caudalímetros de Ultrasonidos", None),
        ("depositos", "Depósitos Hidráulicos", None),
        ("distribuidores-hidraulicos", "Distribuidores Hidráulicos", None),
        ("divisores-de-caudal", "Divisores de Caudal", None),
        ("enfriadores-hidraulicos", "Enfriadores Hidráulicos", None),
        ("filtro-de-retorno", "Filtro de Retorno Hidráulico", None),
        ("intercambiadores-de-calor", "Intercambiadores de Calor", None),
        ("latiguillos-hidraulicos", "Latiguillos Hidráulicos", None),
        ("manometros-hidraulicos", "Manómetros Hidráulicos", None),
        ("racores-adaptadores-hidraulicos", "Racores y Adaptadores", None),
        ("reguladores-de-caudal", "Reguladores de Caudal", None),
        ("tuberias-rigidas", "Tuberías Rígidas", None),
        ("valvula-de-descarga", "Válvula de Descarga", None),
        ("valvula-de-retencion", "Válvula de Retención", None),
        ("valvula-de-secuencia", "Válvula de Secuencia", None),
        ("valvulas-limitadoras", "Válvulas Limitadoras", None),
    ],
    "neumatica": [
        ("cilindros-neumaticos", "Cilindros Neumáticos", "https://sumifluid.com/wp-content/uploads/2021/01/CILINDROS_NEUMATICOS_IMAGEN_2-150x150.jpg"),
        ("valvulas-neumaticas", "Válvulas y Electroválvulas", None),
        ("bombas-neumaticas", "Bombas Neumáticas", None),
        ("tuberia-neumatica", "Tubería Neumática", None),
        ("grupos-de-filtraje", "Grupos de Filtraje", None),
        ("racordaje-neumatico", "Racordaje Neumático", None),
        ("reguladores-de-presion", "Reguladores de Presión", None),
        ("enchufes-rapidos", "Enchufes Rápidos", None),
        ("transductores", "Transductores", None),
        ("manometros-vacuometros-presostatos-neumaticos", "Manómetros, Vacuómetros y Presostatos", None),
        ("unidades-de-guiado", "Unidades de Guiado", None),
        ("pistolas-de-aire", "Pistolas de Aire", None),
    ],
    "estanqueidad": [
        ("juntas-toricas", "Juntas Tóricas", "https://sumifluid.com/wp-content/uploads/2021/05/JUNTAS_FRENO_ESTANQUEIDAD_SUMINIFLUID_1-150x150.jpg"),
        ("juntas-de-freno", "Juntas de Freno", "https://sumifluid.com/wp-content/uploads/2021/05/JUNTAS_FRENO_ESTANQUEIDAD_SUMINIFLUID_2.jpg"),
        ("retenes", "Retenes", None),
        ("collarines", "Collarines", None),
        ("aros-de-apoyo", "Aros de Apoyo", None),
        ("empaquetaduras", "Empaquetaduras", None),
        ("guias-de-bronce", "Guías de Bronce", None),
        ("juntas-shamban", "Juntas Shamban", None),
        ("rascadores-metalicos", "Rascadores Metálicos", None),
        ("t-duo", "T-DUO", None),
        ("variseal", "Variseal", None),
    ],
    "vacio": [
        ("bomba-de-vacio", "Bombas de Vacío", "https://sumifluid.com/wp-content/uploads/2021/01/BOMBAS_HIDRAULICAS_IMAGEN_3-150x150.jpg"),
        ("eyectores-vacio", "Eyectores de Vacío", "https://sumifluid.com/wp-content/uploads/2021/02/EYECTORES_VACIO_IMAGEN_2-150x150.jpg"),
        ("ventosas-vacio", "Ventosas de Vacío", "https://sumifluid.com/wp-content/uploads/2021/02/VENTOSAS_VACIO_IMAGEN_3-150x150.jpg"),
        ("turbinas-de-vacio", "Turbinas de Vacío", None),
    ],
}

FEATURES = [
    ("Stock permanente", "Referencia disponible en nuestro almacén de Elche para envío inmediato."),
    ("Asesoramiento técnico", "Equipo especializado que le ayuda a elegir la referencia exacta."),
    ("Envíos 24/48h", "Cobertura a toda la península desde nuestro almacén en Elche."),
    ("Fabricación a medida", "Si no está en catálogo, lo diseñamos en nuestro taller propio."),
]

HEADER = """<header class="nav">
  <div class="wrap">
    <a href="../index.html" class="nav-brand"><picture><source srcset="../assets/img/logo-sumifluid.webp" type="image/webp"><img src="../assets/img/logo-sumifluid.png" alt="Sumifluid" class="nav-logo"></picture></a>
    <nav data-nav-links class="nav-links">
      <a href="../hidraulica/" data-key="hidraulica">Hidráulica</a>
      <a href="../neumatica/" data-key="neumatica">Neumática</a>
      <a href="../estanqueidad/" data-key="estanqueidad">Estanqueidad</a>
      <a href="../vacio/" data-key="vacio">Vacío</a>
      <a href="../marcas/" data-key="marcas">Marcas</a>
      <a href="../contacto/" data-key="contacto">Contacto</a>
    </nav>
    <a href="../contacto/#presupuesto" class="nav-cta"><span>Pedir presupuesto</span></a>
    <button class="nav-toggle" data-nav-toggle aria-expanded="false" aria-label="Abrir menú">☰</button>
  </div>
</header>"""

FOOTER = """<footer>
  <div class="wrap">
    <div class="foot-grid">
      <div>
        <div class="foot-brand"><picture><source srcset="../assets/img/logo-sumifluid-white.webp" type="image/webp"><img src="../assets/img/logo-sumifluid-white.png" alt="Sumifluid" class="foot-logo"></picture></div>
        <p>Proveedor de componentes hidráulicos y soluciones neumáticas a nivel nacional. Desde Elche, más de 10 años sirviendo a la industria de Alicante, Murcia, Valencia y Albacete.</p>
      </div>
      <div class="foot-col">
        <h4>Catálogo</h4>
        <a href="../hidraulica/">Hidráulica</a>
        <a href="../neumatica/">Neumática</a>
        <a href="../estanqueidad/">Estanqueidad</a>
        <a href="../vacio/">Vacío</a>
        <a href="../marcas/">Marcas</a>
      </div>
      <div class="foot-col">
        <h4>Empresa</h4>
        <a href="../contacto/">Contacto</a>
        <a href="../contacto/#presupuesto">Pedir presupuesto</a>
      </div>
      <div class="foot-col">
        <h4>Contacto</h4>
        <p>C/ Almansa nº12<br>03206 P.I. Carrús<br>Elche (Alicante)</p>
        <a href="tel:+34662264778">662 26 47 78</a>
        <a href="mailto:info@sumifluid.com">info@sumifluid.com</a>
      </div>
    </div>
    <div class="foot-bottom">
      <p>© <span data-year>2026</span> SUMIFLUID S.L. Todos los derechos reservados.</p>
      <div class="foot-social">
        <a href="https://sumifluid.com" aria-label="Facebook">FB</a>
        <a href="https://sumifluid.com" aria-label="LinkedIn">IN</a>
        <a href="https://sumifluid.com" aria-label="Instagram">IG</a>
      </div>
    </div>
  </div>
</footer>

<div class="fab-stack">
  <a href="https://wa.me/34662264778?text=Hola%20Sumifluid%2C%20quer%C3%ADa%20hacer%20una%20consulta" class="fab fab-whatsapp" target="_blank" rel="noopener" aria-label="Escribir por WhatsApp">
    <svg viewBox="0 0 24 24" fill="currentColor"><path d="M12.04 2C6.58 2 2.13 6.45 2.13 11.91c0 1.75.46 3.45 1.32 4.95L2.05 22l5.25-1.38a9.9 9.9 0 0 0 4.74 1.2h.01c5.46 0 9.9-4.45 9.9-9.91 0-2.65-1.03-5.14-2.9-7.01A9.82 9.82 0 0 0 12.04 2zm0 18.15h-.01a8.2 8.2 0 0 1-4.19-1.15l-.3-.18-3.12 1.02 1.05-3.03-.2-.31a8.22 8.22 0 0 1-1.26-4.4c0-4.54 3.7-8.24 8.24-8.24 2.2 0 4.27.86 5.83 2.42a8.18 8.18 0 0 1 2.41 5.83c0 4.54-3.7 8.24-8.24 8.24zm4.52-6.17c-.25-.12-1.47-.72-1.7-.81-.23-.08-.39-.12-.56.13-.16.25-.64.81-.79 .97-.14.17-.29.19-.54.06-.25-.12-1.04-.38-1.98-1.22-.73-.65-1.22-1.46-1.37-1.7-.14-.25-.02-.38.11-.51.11-.11.25-.29.37-.43.12-.14.16-.25.25-.41.08-.17.04-.31-.02-.43-.06-.13-.56-1.35-.77-1.85-.2-.48-.41-.42-.56-.43h-.48c-.16 0-.43.06-.65.31-.23.25-.86.85-.86 2.06 0 1.22.89 2.4 1.01 2.56.12.17 1.75 2.67 4.24 3.74.59.26 1.05.41 1.41.52.59.19 1.13.16 1.56.1.48-.07 1.47-.6 1.68-1.18.21-.58.21-1.08.14-1.18-.06-.11-.22-.17-.47-.29z"/></svg>
  </a>
  <a href="tel:+34662264778" class="fab fab-call" aria-label="Llamar por teléfono">
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72c.127.96.361 1.903.7 2.81a2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0 1 22 16.92z"/></svg>
  </a>
</div>

<script defer src="../assets/js/vendor/gsap.min.js"></script>
<script defer src="../assets/js/vendor/ScrollTrigger.min.js"></script>
<script defer src="../assets/js/vendor/manifest.js"></script>
<script defer src="../assets/js/main.js?v=20260707"></script>
</body>
</html>"""


def brand_marquee(cat):
    imgs = "\n".join(
        f'        <img src="{url}" alt="{name}" loading="lazy">' for name, url in CATS[cat]["brands"]
    )
    return f"""  <section class="brand-marquee">
    <div class="brand-track" data-marquee>
{imgs}
    </div>
  </section>
"""


def visual_block(img, name):
    if img:
        return f'<div class="tile-thumb" style="aspect-ratio:1/1; max-width:320px;"><img src="{img}" alt="{name}" loading="lazy"></div>'
    return (f'<div class="tile-thumb" style="aspect-ratio:1/1; max-width:320px; display:flex; '
            f'align-items:center; justify-content:center; background:var(--ink);">'
            f'<span class="mono" style="color:var(--accent); font-size:.75rem; text-align:center; padding:1rem;">{name.upper()}</span></div>')


def sib_thumb(img, name, cat):
    if img:
        return f'<span class="fam-row-thumb"><img src="{img}" alt="{name}" loading="lazy"></span>'
    mono = CATS[cat]["label"][:2].upper()
    return f'<span class="fam-row-thumb is-mono"><span>{mono}</span></span>'


def page(cat, slug, name, img):
    info = CATS[cat]
    siblings = [f for f in FAMILIES[cat] if f[0] != slug]
    sib_rows = "\n".join(
        f'''        <a class="fam-row" href="{s}.html">
          <span class="fam-row-arrow">→</span>
          {sib_thumb(simg, n, cat)}
          <span class="fam-row-name">{n}</span>
        </a>''' for s, n, simg in siblings
    )
    features_html = "\n".join(
        f'''        <div class="tile" style="cursor:default;">
          <div class="tile-thumb" style="aspect-ratio:auto; height:auto; background:transparent; align-items:flex-start;">
            <span class="kicker" style="margin-bottom:.3rem;">{title}</span>
          </div>
          <span class="tile-name" style="font-weight:600;">{desc}</span>
        </div>''' for title, desc in FEATURES
    )

    html = f"""<!DOCTYPE html>
<html lang="es">
<head>
<meta charset="UTF-8">
<meta name="viewport" content="width=device-width, initial-scale=1.0">
<title>{name} | {info['label']} — Sumifluid®</title>
<meta name="description" content="{name} en stock permanente. {info['lead']}">
<link rel="icon" href="data:,">
<link rel="stylesheet" href="../assets/css/styles.css?v=20260707">
</head>
<body>
<a href="#main" class="skip-link">Ir al contenido</a>
{HEADER}

<main id="main">
  <p class="wrap breadcrumb"><a href="../index.html">Inicio</a> / <a href="../{cat}/">{info['label']}</a> / {name}</p>

  <section class="page-hero">
    <div class="wrap">
      <p class="kicker">{info['num']} · {info['label']}</p>
      <h1>{name}</h1>
      <p>{info['lead']}</p>
      <div class="hero-ctas" style="margin-top:2rem;">
        <a href="../contacto/#presupuesto" class="btn btn-primary">Pedir presupuesto →</a>
        <a href="../{cat}/" class="btn btn-ghost">← Volver a {info['label']}</a>
      </div>
    </div>
  </section>

  <section class="section">
    <div class="wrap">
      <div class="grid-12" style="background:transparent; border:none; align-items:start;">
        <div class="col-span-5 reveal" style="background:transparent; padding-left:0;">
          {visual_block(img, name)}
        </div>
        <div class="col-span-7 reveal" style="background:transparent; padding-right:0;">
          <p class="kicker">Por qué comprarlo en Sumifluid</p>
          <h2 style="font-size:clamp(1.4rem,2.6vw,1.9rem); margin-bottom:1.4rem;">{name} con garantía de suministro</h2>
          <div class="tile-grid" style="grid-template-columns:1fr 1fr; border:none; background:transparent; gap:1px;">
{features_html}
          </div>
        </div>
      </div>
    </div>
  </section>

  <section class="section section-tight">
    <div class="wrap">
      <div class="section-head reveal">
        <p class="kicker">Otras familias</p>
        <h2>Más categorías de {info['label']}</h2>
      </div>
      <div class="fam-list reveal">
{sib_rows}
      </div>
    </div>
  </section>

{brand_marquee(cat)}
  <section class="cta-final">
    <div class="wrap">
      <p class="kicker" style="justify-content:center; color:var(--accent);">Contacto directo</p>
      <h2>¿Necesita {name.lower()}?</h2>
      <p>Consúltenos disponibilidad, plazos y precio sin compromiso. Le respondemos en horario laboral.</p>
      <div class="hero-ctas" style="justify-content:center;">
        <a href="../contacto/#presupuesto" class="btn btn-primary">Pedir presupuesto →</a>
        <a href="../marcas/" class="btn btn-ghost">Ver todas las marcas</a>
      </div>
    </div>
  </section>
</main>

{FOOTER}
"""
    return html


def main():
    total = 0
    for cat, families in FAMILIES.items():
        out_dir = ROOT / cat
        out_dir.mkdir(exist_ok=True)
        for slug, name, img in families:
            html = page(cat, slug, name, img)
            (out_dir / f"{slug}.html").write_text(html, encoding="utf-8")
            total += 1
    print(f"Generadas {total} páginas de familia.")


if __name__ == "__main__":
    main()
