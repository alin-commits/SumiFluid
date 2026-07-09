"""
Inserta el bloque de FAQ visible + schema FAQPage en el HTML de una página
de familia, justo antes de <section class="cta-final">.

Uso dentro de tu script generador actual:

    from inject_faq import inject_faq
    from faq_data_ejemplo import FAQ_POR_FAMILIA

    html = generar_pagina_familia(...)  # tu función existente
    datos_faq = FAQ_POR_FAMILIA.get(slug_familia)
    if datos_faq:
        html = inject_faq(html, datos_faq)
    guardar(html, ruta_salida)
"""

import json

MARCADOR = '<section class="cta-final">'


def inject_faq(html: str, datos_faq: dict) -> str:
    titulo = datos_faq["titulo"]
    preguntas = datos_faq["preguntas"]

    items_html = "\n".join(
        f'      <div class="faq-item">\n'
        f'        <h3>{pregunta}</h3>\n'
        f'        <p>{respuesta}</p>\n'
        f'      </div>'
        for pregunta, respuesta in preguntas
    )

    seccion_faq = (
        f'  <section class="faq-categoria">\n'
        f'    <div class="wrap">\n'
        f'      <h2>Preguntas frecuentes sobre {titulo}</h2>\n\n'
        f'{items_html}\n'
        f'    </div>\n'
        f'  </section>\n\n'
    )

    schema = {
        "@context": "https://schema.org",
        "@type": "FAQPage",
        "mainEntity": [
            {
                "@type": "Question",
                "name": pregunta,
                "acceptedAnswer": {"@type": "Answer", "text": respuesta},
            }
            for pregunta, respuesta in preguntas
        ],
    }
    script_schema = (
        '  <script type="application/ld+json">\n'
        + json.dumps(schema, ensure_ascii=False, indent=2)
        + "\n  </script>\n\n"
    )

    bloque = seccion_faq + script_schema

    if MARCADOR not in html:
        raise ValueError(
            "No se encontró <section class=\"cta-final\"> en el HTML; "
            "revisa que la plantilla de familia no haya cambiado."
        )

    return html.replace(MARCADOR, bloque + MARCADOR, 1)
