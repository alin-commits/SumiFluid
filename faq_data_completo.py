# -*- coding: utf-8 -*-
# Fuente única de datos para las FAQ + schema FAQPage de cada página de familia.
# Clave = "<categoria>/<slug>" tal y como aparece en la URL real del sitio.
# Cada entrada: "titulo" (para el <h2>) y "preguntas": lista de tuplas (pregunta, respuesta).

FAQ_POR_FAMILIA = {

    # ------------------------------------------------------------------ HIDRÁULICA
    "hidraulica/motores-hidraulicos": {
        "titulo": "motores hidráulicos",
        "preguntas": [
            ("¿Qué diferencia hay entre un motor hidráulico orbital y uno de pistones axiales?",
             "El motor orbital ofrece mayor par a bajas revoluciones y es ideal para aplicaciones de baja velocidad y alta carga, como maquinaria agrícola. El de pistones axiales trabaja mejor a altas revoluciones y presiones, típico en aplicaciones industriales de mayor exigencia."),
            ("¿Cómo elijo el motor hidráulico adecuado para mi aplicación?",
             "Depende de tres factores: el par necesario, la velocidad de giro requerida y la presión de trabajo del circuito. Nuestro equipo técnico puede ayudarte a dimensionarlo a partir de estos datos."),
            ("¿Tenéis stock permanente de motores hidráulicos?",
             "Sí, mantenemos stock permanente de las referencias más habituales, con envíos en 24/48h a toda España."),
            ("¿Reparáis motores hidráulicos o solo vendéis nuevos?",
             "Contamos con taller propio para reparación y reacondicionamiento de motores hidráulicos, además de la venta de unidades nuevas."),
            ("¿Qué mantenimiento necesita un motor hidráulico?",
             "Lo principal es controlar la limpieza y viscosidad del aceite, revisar posibles fugas en retenes y vigilar la temperatura de trabajo para evitar desgaste prematuro."),
        ],
    },

    "hidraulica/bombas-hidraulicas": {
        "titulo": "bombas hidráulicas",
        "preguntas": [
            ("¿Qué diferencia hay entre una bomba de engranajes, de paletas y de pistones?",
             "La de engranajes es la más económica y robusta para presiones medias; la de paletas ofrece un funcionamiento más silencioso y eficiente; la de pistones alcanza las presiones más altas y permite caudal variable, a cambio de un coste superior."),
            ("¿Cómo sé qué caudal y presión necesito en mi bomba?",
             "Se calculan a partir de la velocidad de giro del motor que la acciona y de la carga que debe mover el circuito. Nuestro equipo técnico puede ayudarte a dimensionarla con esos datos."),
            ("¿Podéis suministrar bombas hidráulicas a medida o poco habituales?",
             "Sí, además del stock permanente de referencias estándar, diseñamos y montamos soluciones a medida en nuestro taller de Elche."),
            ("¿Qué mantenimiento requiere una bomba hidráulica?",
             "Controlar la limpieza del aceite, revisar el estado de los acoplamientos y vigilar ruidos o vibraciones anómalas, que suelen indicar cavitación o desgaste interno."),
        ],
    },

    "hidraulica/bombas-trasvase": {
        "titulo": "bombas de trasvase",
        "preguntas": [
            ("¿Para qué se usa una bomba de trasvase frente a una bomba hidráulica convencional?",
             "Se utiliza para mover líquidos entre depósitos (aceites, combustibles, refrigerantes) sin necesidad de generar presión de trabajo en un circuito hidráulico, normalmente en operaciones de carga, descarga o llenado."),
            ("¿Qué tipo de líquidos pueden mover estas bombas?",
             "Dependiendo del modelo, aceites hidráulicos, aceites de motor, gasóleo o líquidos de baja/media viscosidad. Consúltanos la compatibilidad exacta según el fluido."),
            ("¿Tenéis stock permanente de bombas de trasvase?",
             "Sí, mantenemos stock de los modelos más solicitados, con envíos en 24/48h a toda España."),
        ],
    },

    "hidraulica/campanas": {
        "titulo": "campanas hidráulicas",
        "preguntas": [
            ("¿Qué función tiene una campana hidráulica en un grupo motor-bomba?",
             "Actúa como elemento de acoplamiento entre el motor eléctrico y la bomba hidráulica, alineando ambos ejes y soportando el conjunto de forma rígida sobre el depósito."),
            ("¿Cómo sé qué tamaño de campana necesito?",
             "Depende de la potencia del motor eléctrico (tamaño de brida IEC) y del tipo de bomba a acoplar (brida SAE o similar). Indícanos ambos datos y te confirmamos la referencia."),
            ("¿Fabricáis campanas a medida si no encuentro mi combinación motor-bomba?",
             "Sí, diseñamos y fabricamos campanas y acoplamientos a medida en nuestro taller cuando la combinación no está en catálogo estándar."),
        ],
    },

    "hidraulica/caudalimetros-electromagneticos": {
        "titulo": "caudalímetros electromagnéticos",
        "preguntas": [
            ("¿Cuándo conviene un caudalímetro electromagnético frente a uno mecánico?",
             "Cuando se necesita medir sin partes móviles en contacto con el fluido, lo que reduce el mantenimiento y funciona bien con líquidos conductivos, incluso con partículas en suspensión."),
            ("¿Qué requisito debe cumplir el fluido para poder medirlo con este tipo de caudalímetro?",
             "El fluido debe ser eléctricamente conductivo; no es apto para aceites hidráulicos puros, por lo que se usa principalmente en agua, aguas residuales y líquidos conductivos similares."),
            ("¿Necesitan calibración periódica?",
             "Sí, se recomienda una verificación periódica según el uso y la normativa del sector, sobre todo en aplicaciones donde la medición tiene efectos contractuales o de facturación."),
        ],
    },

    "hidraulica/caudalimetros-ultrasonicos": {
        "titulo": "caudalímetros ultrasónicos",
        "preguntas": [
            ("¿Qué ventaja tiene un caudalímetro ultrasónico frente a uno con partes móviles?",
             "Al no tener elementos mecánicos en contacto con el fluido, no genera pérdida de carga ni desgaste, lo que lo hace adecuado para medición continua de larga duración."),
            ("¿Se pueden instalar sin cortar la tubería?",
             "Los modelos de abrazadera (clamp-on) se instalan por el exterior de la tubería, sin necesidad de corte ni parada del proceso."),
            ("¿Con qué tipo de fluidos funcionan mejor?",
             "Funcionan bien con líquidos relativamente homogéneos y sin exceso de aire o partículas; consúltanos si tu aplicación tiene alta presencia de sólidos en suspensión."),
        ],
    },

    "hidraulica/caudalimetros": {
        "titulo": "caudalímetros hidráulicos",
        "preguntas": [
            ("¿Qué tipo de caudalímetro necesito para mi circuito hidráulico?",
             "Depende de si necesitas medición mecánica de turbina, electromagnética o ultrasónica; el tipo de fluido, la precisión requerida y si necesitas o no cortar la tubería determinan la elección."),
            ("¿Estos caudalímetros sirven para aceite hidráulico?",
             "Sí, dentro de esta familia disponemos de modelos específicos para aceite hidráulico, además de los electromagnéticos y ultrasónicos orientados a otros fluidos."),
            ("¿Ofrecéis asesoramiento para elegir el modelo correcto?",
             "Sí, nuestro equipo técnico valora presión, caudal y tipo de fluido para recomendarte la solución más adecuada."),
        ],
    },

    "hidraulica/centrales-hidraulicas": {
        "titulo": "centrales hidráulicas",
        "preguntas": [
            ("¿Qué incluye una central hidráulica completa?",
             "Normalmente motor eléctrico, bomba, depósito, válvulas de control, filtro y elementos de refrigeración, todo integrado como una unidad de potencia lista para conectar al circuito."),
            ("¿Podéis fabricar centrales hidráulicas a medida?",
             "Sí, diseñamos y montamos centrales hidráulicas a medida en nuestro taller de Elche según presión, caudal y espacio disponible."),
            ("¿Qué mantenimiento requiere una central hidráulica?",
             "Cambio periódico de aceite y filtros, revisión de fugas en racores y mangueras, y control de la temperatura de trabajo para evitar sobrecalentamiento del sistema."),
            ("¿Cuánto tarda la fabricación de una central a medida?",
             "El plazo depende de la complejidad y los componentes específicos requeridos; contáctanos con tus especificaciones y te damos un plazo concreto."),
        ],
    },

    "hidraulica/cilindros-hidraulicos": {
        "titulo": "cilindros hidráulicos",
        "preguntas": [
            ("¿Qué diferencia hay entre un cilindro de simple y de doble efecto?",
             "El de simple efecto solo aplica fuerza hidráulica en un sentido y retorna por gravedad o muelle; el de doble efecto empuja y retrae con presión hidráulica en ambos sentidos, permitiendo mayor control."),
            ("¿Fabricáis cilindros hidráulicos a medida?",
             "Sí, diseñamos y fabricamos cilindros a medida en nuestro taller cuando la carrera, el diámetro o la fijación no coinciden con el catálogo estándar."),
            ("¿Qué información necesitáis para dimensionar un cilindro?",
             "Carga a mover, carrera necesaria, presión de trabajo disponible y tipo de fijación (bridas, muñones, orejetas). Con esos datos podemos recomendarte el diámetro adecuado."),
            ("¿Reparáis cilindros hidráulicos dañados o con fugas?",
             "Sí, contamos con taller propio para reparación, cambio de retenes y reacondicionamiento de cilindros hidráulicos."),
        ],
    },

    "hidraulica/depositos": {
        "titulo": "depósitos hidráulicos",
        "preguntas": [
            ("¿Cómo elijo la capacidad de un depósito hidráulico?",
             "Como regla general se dimensiona entre 2 y 4 veces el caudal de la bomba por minuto, dejando margen para dilatación térmica, desaireación y nivel mínimo de aspiración."),
            ("¿Podéis fabricar depósitos a medida?",
             "Sí, fabricamos depósitos a medida en nuestro taller de Elche, en distintas capacidades y con las conexiones que necesite tu instalación."),
            ("¿Qué accesorios suelen llevar los depósitos hidráulicos?",
             "Tapón de llenado con filtro de aire, visor de nivel, tapa de registro, filtro de retorno y, en algunos casos, resistencia calefactora o serpentín de refrigeración."),
        ],
    },

    "hidraulica/distribuidores-hidraulicos": {
        "titulo": "distribuidores hidráulicos",
        "preguntas": [
            ("¿Qué función cumple un distribuidor hidráulico?",
             "Dirige el flujo de aceite hacia distintos actuadores (cilindros o motores), controlando el sentido y, en algunos casos, la velocidad de movimiento."),
            ("¿Qué diferencia hay entre un distribuidor manual, mecánico y electrohidráulico?",
             "El manual se acciona directamente por palanca, el mecánico por leva o mando físico, y el electrohidráulico mediante una señal eléctrica que activa el pilotaje, lo que permite automatizar el circuito."),
            ("¿Cómo elijo el número de vías y posiciones de un distribuidor?",
             "Depende de cuántos actuadores y movimientos independientes necesitas controlar; nuestro equipo técnico puede ayudarte a definir la configuración adecuada."),
        ],
    },

    "hidraulica/divisores-de-caudal": {
        "titulo": "divisores de caudal",
        "preguntas": [
            ("¿Para qué se usa un divisor de caudal?",
             "Para repartir el caudal de una única bomba entre dos o más actuadores de forma proporcional, sincronizando su movimiento sin necesidad de una bomba independiente para cada uno."),
            ("¿Un divisor de caudal garantiza una sincronización perfecta?",
             "Ofrece una sincronización aproximada; para aplicaciones que requieran precisión absoluta se recomienda combinarlo con válvulas de compensación o sistemas electrónicos adicionales."),
            ("¿Qué datos necesitáis para recomendar un divisor de caudal?",
             "El caudal total disponible, el número de salidas necesarias y si el reparto debe ser igual o en proporciones distintas entre actuadores."),
        ],
    },

    "hidraulica/electrovalvulas-hidraulicas": {
        "titulo": "electroválvulas hidráulicas",
        "preguntas": [
            ("¿Qué diferencia hay entre una electroválvula monoestable y biestable?",
             "La monoestable vuelve a su posición de reposo al desactivar la bobina; la biestable mantiene la última posición conmutada incluso sin alimentación, lo que ahorra energía en ciclos largos."),
            ("¿Qué tensión de bobina necesito?",
             "Las más habituales son 12V, 24V y 230V; debe coincidir con la alimentación disponible en tu cuadro de control. Indícanos tu tensión y te confirmamos la referencia compatible."),
            ("¿Tenéis stock permanente de electroválvulas hidráulicas?",
             "Sí, mantenemos stock de las referencias y tensiones más habituales, con envíos en 24/48h a toda España."),
        ],
    },

    "hidraulica/enfriadores-hidraulicos": {
        "titulo": "enfriadores hidráulicos",
        "preguntas": [
            ("¿Cuándo es necesario instalar un enfriador en un circuito hidráulico?",
             "Cuando la temperatura del aceite supera de forma habitual los 60-65°C, lo que acelera la degradación del aceite y el desgaste de retenes y componentes."),
            ("¿Qué diferencia hay entre un enfriador aire-aceite y agua-aceite?",
             "El aire-aceite usa un ventilador para disipar el calor al ambiente y no requiere circuito de agua; el agua-aceite es más compacto y eficiente pero necesita una fuente de agua de refrigeración."),
            ("¿Cómo se dimensiona un enfriador hidráulico?",
             "En función de la potencia térmica a disipar (relacionada con presión y caudal del circuito) y la temperatura ambiente máxima de trabajo. Nuestro equipo técnico puede ayudarte con el cálculo."),
        ],
    },

    "hidraulica/filtro-de-retorno": {
        "titulo": "filtros de retorno hidráulicos",
        "preguntas": [
            ("¿Qué función tiene un filtro de retorno en un circuito hidráulico?",
             "Retiene las partículas contaminantes del aceite antes de que vuelva al depósito, protegiendo bomba, válvulas y cilindros del desgaste prematuro por suciedad."),
            ("¿Cada cuánto hay que cambiar el elemento filtrante?",
             "Depende del grado de contaminación del circuito, pero como referencia general se recomienda revisarlo cada 500-1.000 horas de trabajo o antes si el indicador de saturación lo marca."),
            ("¿Qué micraje de filtrado necesito?",
             "Depende de la precisión de los componentes del circuito (servoválvulas y bombas de pistones exigen micrajes más finos); indícanos tus componentes y te recomendamos el grado adecuado."),
        ],
    },

    "hidraulica/intercambiadores-de-calor": {
        "titulo": "intercambiadores de calor",
        "preguntas": [
            ("¿Qué diferencia hay entre un intercambiador y un enfriador hidráulico?",
             "El término intercambiador es más general y puede aplicarse a transferencia de calor aceite-aceite, aceite-agua o aceite-aire; el enfriador hidráulico es un tipo concreto orientado a bajar la temperatura del circuito."),
            ("¿Qué datos necesitáis para dimensionar un intercambiador?",
             "Potencia térmica a disipar, caudal y temperatura de entrada/salida deseada del fluido, además del tipo de fluido de refrigeración disponible (aire o agua)."),
            ("¿Podéis fabricar intercambiadores a medida?",
             "Sí, diseñamos soluciones a medida en nuestro taller cuando el espacio disponible o la potencia térmica no encajan en los modelos estándar."),
        ],
    },

    "hidraulica/latiguillos-hidraulicos": {
        "titulo": "latiguillos hidráulicos",
        "preguntas": [
            ("¿Qué diferencia hay entre un latiguillo y una manguera hidráulica?",
             "El latiguillo es el conjunto ya terminado (manguera + racores engatillados a medida), listo para instalar; la manguera es el tubo flexible a granel antes de cortarlo y montarle los racores."),
            ("¿Fabricáis latiguillos a medida en el momento?",
             "Sí, contamos con taller propio de engatillado para fabricar latiguillos a medida con la longitud, racor y presión que necesites, incluso para sustituciones urgentes."),
            ("¿Cómo sé qué presión de trabajo necesita mi latiguillo?",
             "Debe ser igual o superior a la presión máxima del circuito donde se instala; indícanos la presión de tu sistema y te recomendamos la serie adecuada."),
            ("¿Cada cuánto hay que revisar o cambiar un latiguillo hidráulico?",
             "Se recomienda revisión visual periódica (grietas, abombamientos, fugas) y sustitución preventiva cada 3-5 años según horas de uso y exigencia del circuito."),
        ],
    },

    "hidraulica/mangueras-hidraulicas": {
        "titulo": "mangueras hidráulicas",
        "preguntas": [
            ("¿Qué significa la presión de trabajo indicada en una manguera hidráulica?",
             "Es la presión máxima continua que la manguera puede soportar con seguridad durante su vida útil normal, distinta de la presión de rotura, que es muy superior y no debe alcanzarse en servicio."),
            ("¿Vendéis la manguera a metros o solo latiguillos ya montados?",
             "Disponemos de manguera a granel para venta por metros y también podemos montarte el latiguillo completo con racores en nuestro taller."),
            ("¿Qué norma debo tener en cuenta al elegir manguera hidráulica?",
             "La norma SAE 100R o su equivalente EN 853/856/857 según el tipo de refuerzo (trenzado o espiral); indícanos presión y diámetro y te confirmamos la referencia adecuada."),
        ],
    },

    "hidraulica/manometros-hidraulicos": {
        "titulo": "manómetros hidráulicos",
        "preguntas": [
            ("¿Qué diferencia hay entre un manómetro seco y uno con baño de glicerina?",
             "El de glicerina amortigua las vibraciones y pulsaciones de presión, alargando la vida de la aguja y el mecanismo interno; se recomienda en circuitos con bombas de pistones o presión inestable."),
            ("¿Cómo elijo el rango de presión del manómetro?",
             "Como norma general, la presión habitual de trabajo debe situarse entre el 50% y el 75% del fondo de escala del manómetro, para leer con precisión y proteger el mecanismo."),
            ("¿Ofrecéis calibración de manómetros?",
             "Consúltanos tu necesidad de calibración certificada; para aplicaciones normales, la sustitución periódica del manómetro suele ser la solución más práctica."),
        ],
    },

    "hidraulica/racores-adaptadores-hidraulicos": {
        "titulo": "racores y adaptadores hidráulicos",
        "preguntas": [
            ("¿Cómo sé qué rosca lleva mi racor hidráulico?",
             "Las más habituales en Europa son BSP (cónica o paralela) y métrica; en equipos americanos suele ser NPT o JIC. Si tienes dudas, podemos identificarlo a partir de una foto o medida del racor actual."),
            ("¿Podéis fabricar adaptadores para combinaciones de rosca poco habituales?",
             "Sí, además del stock permanente de referencias estándar, fabricamos adaptadores a medida en nuestro taller para combinaciones específicas."),
            ("¿Qué diferencia hay entre rosca BSP cónica y paralela?",
             "La cónica sella por apriete de las roscas (con cinta o pasta selladora); la paralela sella mediante una junta tórica o arandela en la base, lo que ofrece un sellado más fiable en alta presión."),
        ],
    },

    "hidraulica/reguladores-de-caudal": {
        "titulo": "reguladores de caudal",
        "preguntas": [
            ("¿Para qué sirve un regulador de caudal en un circuito hidráulico?",
             "Controla la velocidad de un actuador (cilindro o motor) limitando el caudal de aceite que le llega, independientemente de las variaciones de carga o presión del sistema."),
            ("¿Qué diferencia hay entre un regulador de caudal compensado y uno simple?",
             "El compensado mantiene la velocidad estable aunque cambie la carga o la presión; el simple es más económico pero la velocidad puede variar si las condiciones del circuito cambian."),
            ("¿Se pueden regular en ambos sentidos de flujo?",
             "Depende del modelo: algunos regulan en ambos sentidos y otros incorporan una válvula antirretorno que permite el retorno libre en un sentido. Indícanos tu aplicación y te recomendamos el tipo adecuado."),
        ],
    },

    "hidraulica/tuberias-rigidas": {
        "titulo": "tuberías rígidas hidráulicas",
        "preguntas": [
            ("¿Cuándo conviene usar tubería rígida en vez de manguera hidráulica?",
             "En tramos fijos y de recorrido largo, donde no hay movimiento relativo entre componentes; ofrece menor coste, mayor vida útil y menor riesgo de rotura por rozamiento que la manguera."),
            ("¿Qué material de tubería rígida manejáis?",
             "Principalmente acero al carbono e inoxidable, en distintos diámetros y espesores según la presión de trabajo del circuito."),
            ("¿Hacéis el curvado y montaje de la tubería a medida?",
             "Sí, realizamos corte, curvado y montaje de tubería rígida a medida en nuestro taller de Elche."),
        ],
    },

    "hidraulica/valvula-de-descarga": {
        "titulo": "válvulas de descarga",
        "preguntas": [
            ("¿Qué función tiene una válvula de descarga en un circuito hidráulico?",
             "Desvía el caudal de la bomba directamente al depósito cuando el circuito no requiere presión, reduciendo el consumo energético y el calentamiento del aceite en los periodos sin demanda."),
            ("¿En qué se diferencia de una válvula limitadora de presión?",
             "La limitadora protege el circuito abriendo solo si se supera una presión máxima puntual; la de descarga se activa de forma programada para poner la bomba en vacío durante fases de espera."),
            ("¿Tenéis stock permanente de válvulas de descarga?",
             "Sí, mantenemos stock de las referencias más habituales, con envíos en 24/48h a toda España."),
        ],
    },

    "hidraulica/valvula-de-retencion": {
        "titulo": "válvulas de retención",
        "preguntas": [
            ("¿Para qué sirve una válvula de retención hidráulica?",
             "Permite el paso del aceite en un único sentido y lo bloquea en el sentido contrario, evitando retornos no deseados que podrían provocar caída de carga o daños en la bomba."),
            ("¿Qué diferencia hay entre una válvula de retención simple y una pilotada?",
             "La simple se abre únicamente por la presión del propio circuito; la pilotada puede abrirse también mediante una señal de presión externa, lo que permite liberar el retorno cuando se necesite, por ejemplo para bajar una carga sostenida por un cilindro."),
            ("¿Qué presión de apertura necesito?",
             "Depende de si quieres que la válvula abra con una presión mínima (para evitar fugas por gravedad) o prácticamente sin resistencia; indícanos tu aplicación y te recomendamos el muelle adecuado."),
        ],
    },

    "hidraulica/valvula-de-secuencia": {
        "titulo": "válvulas de secuencia",
        "preguntas": [
            ("¿Qué función cumple una válvula de secuencia?",
             "Permite que un segundo actuador no entre en movimiento hasta que el primero haya alcanzado una presión determinada, ordenando así el funcionamiento de varios cilindros o motores en un circuito."),
            ("¿En qué se diferencia de una válvula limitadora de presión?",
             "Ambas se activan por presión, pero la de secuencia dirige el caudal hacia otra parte del circuito para activar un segundo movimiento, mientras que la limitadora normalmente descarga al depósito para proteger el sistema."),
            ("¿Cómo se ajusta la presión de secuencia?",
             "Mediante un tornillo regulador que fija la presión mínima a la que se abre la válvula; nuestro equipo técnico puede orientarte sobre el ajuste según tu aplicación."),
        ],
    },

    "hidraulica/valvulas-limitadoras": {
        "titulo": "válvulas limitadoras de presión",
        "preguntas": [
            ("¿Qué función tiene una válvula limitadora de presión?",
             "Protege el circuito hidráulico limitando la presión máxima, desviando el exceso de caudal al depósito cuando se alcanza el valor de tarado."),
            ("¿Cómo se ajusta la presión de tarado?",
             "Mediante un tornillo o mando regulador integrado en la válvula; el ajuste debe hacerse con un manómetro instalado para verificar el valor real de disparo."),
            ("¿Toda instalación hidráulica necesita una válvula limitadora?",
             "Sí, es un elemento de seguridad imprescindible en prácticamente cualquier circuito hidráulico para evitar sobrepresiones que puedan dañar bomba, mangueras o actuadores."),
        ],
    },

    # ------------------------------------------------------------------ NEUMÁTICA
    "neumatica/cilindros-neumaticos": {
        "titulo": "cilindros neumáticos",
        "preguntas": [
            ("¿Qué diferencia hay entre un cilindro neumático de simple y de doble efecto?",
             "El de simple efecto avanza o retrocede por aire y vuelve por muelle; el de doble efecto se acciona con aire comprimido en ambos sentidos, permitiendo mayor control y fuerza en el retorno."),
            ("¿Qué es la normativa ISO 6431 y por qué importa al elegir un cilindro?",
             "Es el estándar que define las medidas de fijación e intercambiabilidad de cilindros neumáticos entre distintos fabricantes; elegir un cilindro bajo esta norma facilita encontrar recambios o alternativas compatibles."),
            ("¿Fabricáis cilindros neumáticos a medida?",
             "Sí, además del stock permanente bajo normativa ISO 6431 y Unitop, fabricamos cilindros a medida en nuestro taller de Elche."),
            ("¿Qué datos necesitáis para dimensionar un cilindro neumático?",
             "Diámetro necesario según la fuerza a ejercer, carrera del vástago y presión de aire disponible en tu instalación; con esos datos podemos recomendarte el modelo adecuado."),
        ],
    },

    "neumatica/valvulas-neumaticas": {
        "titulo": "válvulas y electroválvulas neumáticas",
        "preguntas": [
            ("¿Qué diferencia hay entre una válvula neumática manual y una electroválvula?",
             "La manual se acciona directamente por palanca o pulsador; la electroválvula se activa mediante una señal eléctrica, lo que permite integrarla en un automatismo o PLC."),
            ("¿Qué significa 5/2 o 3/2 en una electroválvula neumática?",
             "El primer número indica las vías (conexiones) de la válvula y el segundo las posiciones de conmutación; por ejemplo, una 5/2 tiene 5 vías y 2 posiciones, típica para gobernar un cilindro de doble efecto."),
            ("¿Qué tensión de bobina necesito para mi electroválvula?",
             "Las más habituales son 24V DC y 230V AC; debe coincidir con la alimentación de tu cuadro de control. Indícanos tu tensión y te confirmamos la referencia compatible."),
        ],
    },

    "neumatica/bombas-neumaticas": {
        "titulo": "bombas neumáticas",
        "preguntas": [
            ("¿Qué ventaja tiene una bomba neumática frente a una eléctrica?",
             "Puede trabajar en atmósferas húmedas o con riesgo de explosión sin necesidad de motor eléctrico, y se detiene automáticamente al alcanzar la presión máxima sin dañarse por marcha en vacío."),
            ("¿Con qué tipo de fluidos se usan estas bombas?",
             "Se emplean principalmente para trasiego de aceites, grasas fluidas y otros líquidos industriales, dependiendo del modelo y de los materiales de las juntas internas."),
            ("¿Necesitan un compresor específico para funcionar?",
             "Necesitan aire comprimido a la presión indicada por el fabricante; consúltanos el consumo de aire del modelo que te interese para verificar que tu compresor es suficiente."),
        ],
    },

    "neumatica/enchufes-rapidos": {
        "titulo": "enchufes rápidos neumáticos",
        "preguntas": [
            ("¿Qué diferencia hay entre los distintos perfiles de enchufe rápido?",
             "Los perfiles (tipo Euro, ARO, Rectus...) determinan la compatibilidad mecánica entre el enchufe y su racor; no son intercambiables entre sí, por lo que hay que mantener el mismo perfil en toda la instalación."),
            ("¿Qué presión y caudal soportan los enchufes rápidos?",
             "Depende del tamaño y perfil elegido; indícanos tu presión de trabajo y el diámetro de tubería y te recomendamos el modelo adecuado."),
            ("¿Tenéis stock permanente de enchufes rápidos?",
             "Sí, mantenemos stock de los perfiles y tamaños más habituales, con envíos en 24/48h a toda España."),
        ],
    },

    "neumatica/grupos-de-filtraje": {
        "titulo": "grupos de filtraje neumático",
        "preguntas": [
            ("¿Qué elementos suele incluir un grupo de filtraje neumático?",
             "Normalmente un filtro que retiene partículas y condensados, un regulador de presión y, en algunos casos, un lubricador; en conjunto se conocen como unidad FRL (filtro-regulador-lubricador)."),
            ("¿Por qué es importante filtrar el aire comprimido antes de los elementos neumáticos?",
             "Porque el aire de la red suele arrastrar humedad, partículas y restos de aceite del compresor que, sin filtrar, aceleran el desgaste de cilindros, válvulas y racores."),
            ("¿Cómo elijo el tamaño de grupo de filtraje adecuado?",
             "En función del caudal de aire que consume tu instalación y el diámetro de tubería de la línea principal; indícanos estos datos y te recomendamos el modelo correcto."),
        ],
    },

    "neumatica/manometros-vacuometros-presostatos-neumaticos": {
        "titulo": "manómetros, vacuómetros y presostatos neumáticos",
        "preguntas": [
            ("¿Qué diferencia hay entre un manómetro, un vacuómetro y un presostato?",
             "El manómetro mide y muestra la presión de forma continua; el vacuómetro hace lo mismo pero para depresión (vacío); el presostato no muestra un valor, sino que activa o desactiva una señal eléctrica al alcanzar una presión determinada."),
            ("¿Cómo elijo el rango de un manómetro neumático?",
             "La presión habitual de trabajo debe situarse entre el 50% y el 75% del fondo de escala, para leer con precisión y no forzar el mecanismo interno."),
            ("¿Los presostatos sirven para controlar automatismos?",
             "Sí, se usan habitualmente para activar alarmas, arrancar compresores o interrumpir un proceso cuando la presión sale de un rango seguro."),
        ],
    },

    "neumatica/pistolas-de-aire": {
        "titulo": "pistolas de aire",
        "preguntas": [
            ("¿Qué presión de trabajo necesitan las pistolas de aire?",
             "La mayoría trabaja bien entre 6 y 8 bar, la presión habitual de una instalación neumática estándar; consulta la ficha del modelo concreto para el valor exacto."),
            ("¿Hay pistolas de aire homologadas para reducir el ruido o el riesgo de proyección?",
             "Sí, existen modelos con boquillas de seguridad que reducen la presión de impacto directo y el nivel sonoro, recomendados quest cuando se aplica normativa de seguridad en planta."),
            ("¿Tenéis stock permanente de pistolas de aire?",
             "Sí, mantenemos stock de los modelos más habituales, con envíos en 24/48h a toda España."),
        ],
    },

    "neumatica/racordaje-neumatico": {
        "titulo": "racordaje neumático",
        "preguntas": [
            ("¿Qué diferencia hay entre racor instantáneo y racor roscado?",
             "El racor instantáneo permite conectar y desconectar el tubo simplemente empujándolo o presionando un collarín, sin herramientas; el roscado requiere apriete mecánico y suele usarse en puntos fijos de mayor exigencia."),
            ("¿Cómo sé qué diámetro de tubo necesito para mi racor?",
             "Debe coincidir con el diámetro exterior del tubo neumático que uses (por ejemplo 6, 8, 10 o 12 mm); si tienes dudas, indícanos el diámetro de tu tubería actual."),
            ("¿Tenéis stock permanente de racordaje neumático?",
             "Sí, mantenemos stock de las referencias y diámetros más habituales, con envíos en 24/48h a toda España."),
        ],
    },

    "neumatica/reguladores-de-presion": {
        "titulo": "reguladores de presión neumáticos",
        "preguntas": [
            ("¿Para qué sirve un regulador de presión neumático?",
             "Reduce y estabiliza la presión de la red general a un valor constante y ajustado, adecuado para el cilindro, herramienta o automatismo que alimenta, protegiéndolo de picos de presión."),
            ("¿Cómo elijo el rango de regulación adecuado?",
             "Debe cubrir con margen la presión de trabajo que necesita tu equipo; indícanos ese valor y el caudal de aire requerido y te recomendamos el modelo correcto."),
            ("¿Llevan manómetro incorporado?",
             "Muchos modelos incluyen manómetro integrado para lectura directa de la presión regulada, aunque también existen versiones sin él para montar uno aparte."),
        ],
    },

    "neumatica/transductores": {
        "titulo": "transductores neumáticos",
        "preguntas": [
            ("¿Qué función tiene un transductor en un circuito neumático?",
             "Convierte una señal (habitualmente eléctrica) en una presión de salida proporcional, o viceversa, permitiendo controlar de forma precisa y automatizada procesos neumáticos desde un PLC."),
            ("¿Qué diferencia hay entre un transductor y un regulador de presión estándar?",
             "El regulador estándar se ajusta manualmente a un valor fijo; el transductor permite variar la presión de salida de forma continua mediante una señal externa, ideal para procesos que necesitan ajuste dinámico."),
            ("¿Con qué tipo de señal eléctrica trabajan estos transductores?",
             "Los más habituales trabajan con señales estándar de 4-20 mA o 0-10V; indícanos la señal disponible en tu automatismo y te confirmamos la compatibilidad."),
        ],
    },

    "neumatica/tuberia-neumatica": {
        "titulo": "tubería neumática",
        "preguntas": [
            ("¿Qué diferencia hay entre tubería de poliuretano y de nylon para aire comprimido?",
             "El poliuretano es más flexible, resistente a la abrasión y habitual en instalaciones móviles o con curvas cerradas; el nylon es más rígido y resistente a la presión, adecuado en líneas fijas de mayor exigencia."),
            ("¿Cómo sé qué diámetro de tubería necesito?",
             "Depende del caudal de aire que debe circular y la longitud del tramo; un diámetro insuficiente provoca pérdidas de presión notables en tramos largos."),
            ("¿Tenéis stock permanente de tubería neumática?",
             "Sí, mantenemos stock de los diámetros y materiales más habituales, con envíos en 24/48h a toda España."),
        ],
    },

    "neumatica/unidades-de-guiado": {
        "titulo": "unidades de guiado",
        "preguntas": [
            ("¿Para qué se usa una unidad de guiado junto a un cilindro neumático?",
             "Absorbe los esfuerzos laterales y de torsión que el cilindro no está diseñado para soportar, guiando la carga de forma precisa y protegiendo el vástago de desgaste prematuro."),
            ("¿Cuándo es necesario añadir una unidad de guiado a mi instalación?",
             "Cuando la carga a mover no está perfectamente alineada con el eje del cilindro, o cuando se requiere alta precisión de posicionamiento en aplicaciones de manipulación o montaje."),
            ("¿Las unidades de guiado son compatibles con cualquier cilindro?",
             "Deben coincidir en diámetro y fijación con el cilindro a acoplar; indícanos el modelo de tu cilindro y te confirmamos la unidad de guiado compatible."),
        ],
    },

    # ------------------------------------------------------------------ ESTANQUEIDAD
    "estanqueidad/juntas-toricas": {
        "titulo": "juntas tóricas",
        "preguntas": [
            ("¿Qué material de junta tórica debo usar según el fluido?",
             "El NBR es el más habitual para aceites hidráulicos y minerales; el FKM (Viton) resiste mejor altas temperaturas y fluidos agresivos; el EPDM es el más adecuado para agua, vapor y algunos productos químicos, pero no para aceites minerales."),
            ("¿Cómo sé qué medida de junta tórica necesito?",
             "Se define por el diámetro interior y el grosor de sección (por ejemplo 2, 3 o 5 mm); si tienes la junta antigua, podemos identificarla a partir de esas medidas."),
            ("¿Tenéis más de 5.000 referencias en stock realmente?",
             "Sí, mantenemos un catálogo de más de 5.000 referencias de juntas tóricas en los materiales técnicos más habituales, con disponibilidad inmediata para las medidas más solicitadas."),
            ("¿Fabricáis juntas tóricas a medida si no encuentro mi diámetro?",
             "Sí, para diámetros o materiales poco habituales podemos gestionar fabricación a medida; consúltanos las especificaciones exactas que necesitas."),
        ],
    },

    "estanqueidad/retenes": {
        "titulo": "retenes",
        "preguntas": [
            ("¿Qué función tiene un retén en un eje giratorio?",
             "Evita la fuga de aceite o grasa hacia el exterior y, al mismo tiempo, impide la entrada de polvo o humedad al interior del componente, sellando el espacio entre el eje y la carcasa."),
            ("¿Cómo identifico la medida de un retén?",
             "Se define por tres medidas: diámetro interior (eje), diámetro exterior (alojamiento) y anchura; con esos tres datos podemos identificar la referencia equivalente."),
            ("¿Qué diferencia hay entre un retén simple labio y uno doble labio?",
             "El simple labio solo retiene el fluido interior; el doble labio añade un segundo labio exterior que además evita la entrada de suciedad, recomendado en ambientes agresivos o con polvo."),
        ],
    },

    "estanqueidad/aros-de-apoyo": {
        "titulo": "aros de apoyo",
        "preguntas": [
            ("¿Para qué se usa un aro de apoyo junto a una junta tórica?",
             "Evita la extrusión de la junta tórica hacia la holgura del alojamiento cuando el sistema trabaja a alta presión, prolongando su vida útil y evitando fallos prematuros de sellado."),
            ("¿Cuándo es necesario montar un aro de apoyo?",
             "Se recomienda en aplicaciones de alta presión o cuando la holgura entre las piezas es mayor de lo habitual, especialmente en cilindros hidráulicos de gran exigencia."),
            ("¿En qué materiales fabricáis los aros de apoyo?",
             "Principalmente en PTFE y poliuretano, materiales con buena resistencia mecánica y baja fricción, adecuados para trabajar junto a la junta tórica sin degradarse."),
        ],
    },

    "estanqueidad/collarines": {
        "titulo": "collarines",
        "preguntas": [
            ("¿Qué diferencia hay entre un collarín y una junta tórica convencional?",
             "El collarín tiene un perfil asimétrico (en U o V) diseñado específicamente para sellar en un único sentido de presión, con mejor comportamiento en alta presión que una junta tórica estándar."),
            ("¿Dónde se usan habitualmente los collarines?",
             "En cilindros hidráulicos y neumáticos, tanto en pistón como en vástago, especialmente en aplicaciones de presión elevada o ciclos de trabajo exigentes."),
            ("¿Cómo identifico la medida de mi collarín actual?",
             "Necesitamos diámetro interior, diámetro exterior y altura del perfil; si nos envías el collarín usado o esas medidas, podemos identificar la referencia equivalente."),
        ],
    },

    "estanqueidad/empaquetaduras": {
        "titulo": "empaquetaduras",
        "preguntas": [
            ("¿Qué es una empaquetadura y quest en qué se diferencia de un retén?",
             "La empaquetadura es un conjunto de anillos de sellado (normalmente trenzados o moldeados) que se comprimen dentro de una caja de empaquetadura, habitual en bombas y válvulas de vástago; el retén es una pieza única moldeada para ejes giratorios."),
            ("¿Qué materiales de empaquetadura manejáis según el fluido a sellar?",
             "Disponemos de distintos materiales técnicos según temperatura, presión y compatibilidad química del fluido; consúltanos la aplicación concreta y te recomendamos el material adecuado."),
            ("¿Con qué frecuencia hay que reapretar o cambiar una empaquetadura?",
             "Depende del uso y el desgaste, pero es habitual revisar el apriete periódicamente, ya que las empaquetaduras tienden a asentarse con el tiempo y pueden necesitar reajuste antes de su sustitución completa."),
        ],
    },

    "estanqueidad/guias-de-bronce": {
        "titulo": "guías de bronce",
        "preguntas": [
            ("¿Para qué se usa una guía de bronce en un cilindro hidráulico?",
             "Centra y guía el vástago o el pistón dentro de la camisa del cilindro, reduciendo la fricción metal-metal y protegiendo tanto el vástago como las juntas de sellado del desgaste."),
            ("¿Por qué se usa bronce y no otro material?",
             "El bronce ofrece buena resistencia mecánica junto con propiedades autolubricantes, lo que reduce el desgaste tanto de la propia guía como del vástago en contacto."),
            ("¿Fabricáis guías de bronce a medida?",
             "Sí, mecanizamos guías de bronce a medida en nuestro taller cuando la medida no corresponde a un estándar de catálogo."),
        ],
    },

    "estanqueidad/juntas-de-freno": {
        "titulo": "juntas de freno",
        "preguntas": [
            ("¿Qué diferencia hay entre una junta de freno y una junta tórica estándar?",
             "La junta de freno está diseñada específicamente para trabajar con líquido de frenos y soportar las temperaturas y la retracción controlada que requiere un sistema de frenado hidráulico."),
            ("¿Qué material se usa habitualmente en juntas de freno?",
             "El EPDM es el más habitual por su buena compatibilidad con líquidos de frenos DOT, frente a otros elastómeros que se degradan con este tipo de fluido."),
            ("¿Podéis suministrar juntas de freno para equipos industriales, no solo automoción?",
             "Sí, trabajamos con juntas de freno para sistemas hidráulicos de frenado en maquinaria industrial y vehículos especiales, además de automoción convencional."),
        ],
    },

    "estanqueidad/juntas-shamban": {
        "titulo": "juntas Shamban",
        "preguntas": [
            ("¿Qué es una junta tipo Shamban?",
             "Es una junta compuesta de sellado (habitualmente un aro elastómero combinado con un anillo de deslizamiento de PTFE) que ofrece baja fricción y buen comportamiento dinámico en pistones y vástagos hidráulicos."),
            ("¿En qué se diferencia de una junta tórica con aro de apoyo?",
             "El diseño compuesto de la junta Shamban reduce la fricción y mejora el comportamiento a bajas velocidades y arranques, frente a la combinación tradicional de junta tórica más aro de apoyo."),
            ("¿Para qué aplicaciones se recomienda este tipo de junta?",
             "Se recomienda en cilindros hidráulicos de alta exigencia dinámica, donde se busca minimizar el efecto stick-slip (agarrotamiento y deslizamiento irregular) del vástago."),
        ],
    },

    "estanqueidad/rascadores-metalicos": {
        "titulo": "rascadores metálicos",
        "preguntas": [
            ("¿Qué función tiene un rascador metálico en un cilindro hidráulico?",
             "Elimina la suciedad, polvo y partículas adheridas al vástago antes de que este vuelva a entrar en el cilindro, protegiendo así las juntas internas de contaminación."),
            ("¿Cuándo conviene un rascador metálico frente a uno de poliuretano?",
             "El metálico ofrece mayor resistencia en ambientes muy abrasivos o con partículas duras (fundición, minería, obra pública), donde un rascador elastomérico se desgastaría con rapidez."),
            ("¿Cómo identifico la medida de mi rascador?",
             "Se define por el diámetro del vástago y el diámetro exterior del alojamiento; si nos indicas esas medidas, podemos identificar la referencia adecuada."),
        ],
    },

    "estanqueidad/t-duo": {
        "titulo": "juntas T-DUO",
        "preguntas": [
            ("¿Qué es una junta T-DUO y en qué se diferencia de una junta tórica?",
             "Es una junta de sellado estático con perfil en T, formada por un núcleo elastómero y dos anillos de deslizamiento de PTFE en los laterales, diseñada para reducir la fricción y mejorar la vida útil frente a una junta tórica convencional."),
            ("¿En qué tipo de aplicaciones se recomienda?",
             "En sellado estático de pistones y tapas de cilindros hidráulicos de alta presión, donde se busca un comportamiento más estable que el de una junta tórica simple."),
            ("¿Qué materiales están disponibles para la junta T-DUO?",
             "Suele combinarse un núcleo elastómero (NBR o FKM según el fluido) con anillos de deslizamiento en PTFE; consúltanos tu aplicación concreta para confirmar la combinación adecuada."),
        ],
    },

    "estanqueidad/variseal": {
        "titulo": "juntas Variseal",
        "preguntas": [
            ("¿Qué es una junta tipo Variseal?",
             "Es una junta de sellado dinámico formada por un muelle metálico interno recubierto de PTFE u otro material de baja fricción, diseñada para mantener presión de contacto constante incluso con desgaste."),
            ("¿Qué ventaja ofrece frente a una junta elastomérica convencional?",
             "Mantiene el sellado en un rango más amplio de temperaturas y presiones, y su comportamiento es más estable frente a la relajación del material que sufren los elastómeros convencionales con el tiempo."),
            ("¿En qué aplicaciones se usa habitualmente?",
             "En sellado dinámico y estático de alta exigencia: cilindros hidráulicos de precisión, válvulas industriales y equipos donde la fiabilidad del sellado es crítica."),
        ],
    },

    # ------------------------------------------------------------------ VACÍO
    "vacio/bomba-de-vacio": {
        "titulo": "bombas de vacío",
        "preguntas": [
            ("¿Qué diferencia hay entre una bomba de vacío y un eyector de vacío?",
             "La bomba de vacío es un equipo mecánico que genera vacío de forma continua mediante un motor propio; el eyector genera vacío consumiendo aire comprimido, sin partes móviles, por efecto Venturi."),
            ("¿Cómo elijo la capacidad de aspiración de una bomba de vacío?",
             "Depende del volumen a evacuar y el nivel de vacío requerido por tu proceso (envasado, sujeción de piezas, manipulación); indícanos estos datos y te recomendamos el modelo adecuado."),
            ("¿Qué mantenimiento necesita una bomba de vacío?",
             "Revisión periódica de filtros de aspiración, comprobación de fugas en las conducciones y, en modelos lubricados, control del nivel y estado del aceite."),
        ],
    },

    "vacio/eyectores-vacio": {
        "titulo": "eyectores de vacío",
        "preguntas": [
            ("¿Cuándo conviene usar un eyector de vacío en vez de una bomba?",
             "Cuando se necesita generar vacío de forma puntual o intermitente y ya se dispone de aire comprimido en la instalación, evitando así instalar un equipo mecánico adicional."),
            ("¿Los eyectores de vacío requieren mantenimiento?",
             "Al no tener partes móviles, el mantenimiento es mínimo: básicamente mantener limpio el filtro de aire de alimentación y comprobar que no haya obstrucciones en la tobera Venturi."),
            ("¿Qué presión de aire necesita un eyector para funcionar correctamente?",
             "La mayoría trabaja de forma óptima entre 4 y 6 bar; consulta la ficha técnica del modelo concreto para confirmar el consumo y presión recomendados."),
        ],
    },

    "vacio/turbinas-de-vacio": {
        "titulo": "turbinas de vacío",
        "preguntas": [
            ("¿En qué se diferencia una turbina de vacío de una bomba de vacío convencional?",
             "La turbina genera caudales de aire muy altos con niveles de vacío moderados, ideal para procesos de manipulación de materiales ligeros y porosos (cartón, textil); la bomba convencional suele ofrecer mayor nivel de vacío con menor caudal."),
            ("¿Para qué aplicaciones se usan habitualmente las turbinas de vacío?",
             "En manipulación de bolsas, cartón, textiles y otros materiales porosos, donde se necesita mover mucho aire para conseguir sujeción, más que alcanzar un vacío profundo."),
            ("¿Qué mantenimiento requieren las turbinas de vacío?",
             "Principalmente limpieza de filtros de entrada y revisión de rodamientos y aspas, ya que trabajan a alta velocidad de giro de forma continua."),
        ],
    },

    "vacio/ventosas-vacio": {
        "titulo": "ventosas de vacío",
        "preguntas": [
            ("¿Cómo elijo el material de la ventosa según la pieza a manipular?",
             "El NBR y el silicona son habituales para superficies estándar; el poliuretano ofrece mayor resistencia a la abrasión en piezas con bordes o superficies rugosas; para altas temperaturas se recomienda silicona o FKM."),
            ("¿Qué diámetro de ventosa necesito para mi aplicación?",
             "Depende del peso de la pieza a levantar y del nivel de vacío disponible en tu sistema; nuestro equipo técnico puede ayudarte a calcular el diámetro mínimo necesario."),
            ("¿Qué diferencia hay entre una ventosa plana, de fuelle y ovalada?",
             "La plana es la más habitual para superficies rígidas y lisas; la de fuelle se adapta a superficies curvas o con desnivel gracias a su capacidad de compresión; la ovalada se usa en piezas alargadas o perfiles estrechos."),
        ],
    },

}
