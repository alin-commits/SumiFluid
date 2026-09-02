export interface CampoCalculadora {
  key: string;
  label: string;
  unidad: string;
}

export interface ResultadoCalculadora {
  key: string;
  label: string;
  unidad: string;
}

export interface FaqCalculadora {
  pregunta: string;
  respuesta: string;
}

export interface Calculadora {
  slug: string;
  titulo: string;
  metaTitulo: string;
  metaDescripcion: string;
  descripcion: string;
  formulaTexto: string;
  campos: CampoCalculadora[];
  resultados: ResultadoCalculadora[];
  calcular: (valores: Record<string, number>) => Record<string, number>;
  /** Bloque SEO/GEO ampliado, específico de esta calculadora */
  seoTitulo: string;
  seoParrafos: string[];
  seoFaqs?: FaqCalculadora[];
}

export const calculadoras: Calculadora[] = [
  {
    slug: "area-cilindro",
    titulo: "Área de un cilindro",
    metaTitulo: "Calcular Área de un Cilindro Online | Sumifluid",
    metaDescripcion:
      "Calculadora online para hallar el área de la sección de un cilindro hidráulico o neumático a partir de su diámetro. Resultado inmediato en cm².",
    descripcion:
      "El área de la sección de un cilindro es la base para calcular su capacidad, la fuerza que puede ejercer o su velocidad de avance. Introduzca el diámetro del émbolo para obtener el área en centímetros cuadrados.",
    formulaTexto: "Área = π × (Diámetro / 2)²",
    campos: [{ key: "diametro", label: "Diámetro", unidad: "cm" }],
    resultados: [{ key: "area", label: "Área", unidad: "cm²" }],
    calcular: (v) => {
      const radio = v.diametro / 2;
      return { area: Math.PI * radio * radio };
    },
    seoTitulo: "¿Por qué es importante el área de un cilindro?",
    seoParrafos: [
      "El área efectiva de la sección de un cilindro hidráulico o neumático es el dato de partida para casi cualquier otro cálculo del circuito: a partir de ella se determina la capacidad, la fuerza que puede desarrollar y la velocidad de avance para un caudal dado. Un pequeño error al medir el diámetro tiene un impacto cuadrático en el resultado, por lo que conviene verificarlo con precisión antes de dimensionar el resto de la instalación.",
      "En cilindros de doble efecto conviene recordar que el área de la cámara del lado del vástago es menor que la del lado ciego, ya que hay que descontar la sección del propio vástago. Esta calculadora ofrece el área de la sección completa (lado ciego); para el lado del vástago, reste el área del vástago al resultado obtenido.",
    ],
    seoFaqs: [
      {
        pregunta: "¿Qué diferencia hay entre área y capacidad de un cilindro?",
        respuesta:
          "El área es la sección transversal del cilindro, en cm². La capacidad es el volumen total que hay que llenar de aceite para completar el recorrido, y se calcula multiplicando esa área por la carrera.",
      },
      {
        pregunta: "¿Cómo afecta el diámetro del vástago al área efectiva?",
        respuesta:
          "En la cámara del lado del vástago, el área efectiva es el área total del cilindro menos el área de la sección del vástago, por lo que a igual presión esa cámara desarrolla algo menos de fuerza y algo más de velocidad.",
      },
    ],
  },
  {
    slug: "capacidad-cilindro",
    titulo: "Capacidad de un cilindro",
    metaTitulo: "Calcular Capacidad de un Cilindro Online | Sumifluid",
    metaDescripcion:
      "Calculadora online para hallar la capacidad o volumen de un cilindro hidráulico a partir de su diámetro y carrera. Resultado en cm³ y litros.",
    descripcion:
      "La capacidad o volumen de un cilindro determina la cantidad de aceite necesaria para completar su carrera. Introduzca el diámetro y el recorrido del vástago para obtener el volumen en cm³ y en litros.",
    formulaTexto: "Capacidad = Área × Carrera",
    campos: [
      { key: "diametro", label: "Diámetro", unidad: "cm" },
      { key: "carrera", label: "Carrera / recorrido", unidad: "cm" },
    ],
    resultados: [
      { key: "capacidad", label: "Capacidad", unidad: "cm³" },
      { key: "litros", label: "Capacidad", unidad: "L" },
    ],
    calcular: (v) => {
      const radio = v.diametro / 2;
      const area = Math.PI * radio * radio;
      const capacidad = area * v.carrera;
      return { capacidad, litros: capacidad / 1000 };
    },
    seoTitulo: "Para qué sirve conocer la capacidad del cilindro",
    seoParrafos: [
      "La capacidad de un cilindro determina cuánto aceite debe suministrar la bomba para completar una carrera completa, un dato clave para elegir el caudal de la central hidráulica y para calcular el tiempo de ciclo de una máquina.",
      "Conocer este volumen también ayuda a dimensionar el depósito hidráulico, que debe tener capacidad suficiente para absorber el aceite desplazado por todos los cilindros del circuito sin quedarse corto ni sobredimensionar el sistema innecesariamente.",
    ],
    seoFaqs: [
      {
        pregunta: "¿Debo usar la carrera total o solo el recorrido de trabajo?",
        respuesta:
          "Use el recorrido real que el cilindro va a realizar en el ciclo que quiere dimensionar. Si necesita el volumen máximo teórico, use la carrera completa del cilindro.",
      },
    ],
  },
  {
    slug: "fuerza-cilindro",
    titulo: "Fuerza de un cilindro",
    metaTitulo: "Calcular Fuerza de un Cilindro Online | Sumifluid",
    metaDescripcion:
      "Calculadora online para hallar la fuerza que desarrolla un cilindro hidráulico según la presión de trabajo y su diámetro. Resultado en kg y en newtons.",
    descripcion:
      "La fuerza que desarrolla un cilindro hidráulico depende de la presión del sistema y del área sobre la que actúa. Introduzca la presión de trabajo y el diámetro del cilindro para obtener la fuerza resultante.",
    formulaTexto: "Fuerza (kg) = Presión (bar) × Área (cm²) × 1,02",
    campos: [
      { key: "presion", label: "Presión", unidad: "bar" },
      { key: "diametro", label: "Diámetro del cilindro", unidad: "cm" },
    ],
    resultados: [
      { key: "fuerzaKg", label: "Fuerza", unidad: "kg" },
      { key: "fuerzaN", label: "Fuerza", unidad: "N" },
    ],
    calcular: (v) => {
      const radio = v.diametro / 2;
      const area = Math.PI * radio * radio;
      return {
        fuerzaKg: v.presion * area * 1.02,
        fuerzaN: v.presion * area * 10,
      };
    },
    seoTitulo: "Cómo influye la presión en la fuerza del cilindro",
    seoParrafos: [
      "La fuerza que un cilindro hidráulico puede ejercer depende directamente de dos factores: la presión de trabajo del circuito y el área sobre la que actúa esa presión. Duplicar el diámetro del cilindro multiplica por cuatro la fuerza disponible a la misma presión, mientras que duplicar la presión solo la duplica.",
      "Este cálculo es teórico y no descuenta pérdidas por fricción en juntas ni el rendimiento mecánico real del cilindro, que suele rondar el 90-95%. Para aplicaciones críticas de seguridad, aplique siempre un margen adicional sobre el resultado obtenido.",
    ],
    seoFaqs: [
      {
        pregunta: "¿Por qué la fuerza de retroceso es menor que la de avance?",
        respuesta:
          "Porque en el retroceso la presión actúa sobre el área de la cámara del lado del vástago, que es menor que el área total al tener que descontar la sección del propio vástago.",
      },
    ],
  },
  {
    slug: "velocidad-cilindro",
    titulo: "Velocidad de un cilindro",
    metaTitulo: "Calcular Velocidad de un Cilindro Online | Sumifluid",
    metaDescripcion:
      "Calculadora online para hallar la velocidad de avance de un cilindro hidráulico según el caudal recibido y su área. Resultado en m/s.",
    descripcion:
      "La velocidad de avance o retroceso de un cilindro depende del caudal que recibe y del área sobre la que actúa dicho caudal. Introduzca el caudal de la bomba y el área del cilindro para obtener la velocidad.",
    formulaTexto: "Velocidad (m/s) = Caudal (l/min) / (Área (cm²) × 6)",
    campos: [
      { key: "caudal", label: "Caudal", unidad: "l/min" },
      { key: "area", label: "Área del cilindro", unidad: "cm²" },
    ],
    resultados: [{ key: "velocidad", label: "Velocidad", unidad: "m/s" }],
    calcular: (v) => ({ velocidad: v.caudal / (v.area * 6) }),
    seoTitulo: "Qué determina la velocidad de avance de un cilindro",
    seoParrafos: [
      "La velocidad de un cilindro no depende de la presión del sistema, sino únicamente del caudal que recibe y del área sobre la que actúa. Dos cilindros distintos alimentados con el mismo caudal se moverán a velocidades diferentes si tienen diámetros distintos.",
      "Esta relación es clave al seleccionar la bomba: si necesita un tiempo de ciclo concreto, calcule primero la velocidad requerida y, con el área del cilindro, obtenga el caudal necesario despejando esta misma fórmula.",
    ],
  },
  {
    slug: "potencia-bomba-hidraulica",
    titulo: "Potencia de una bomba hidráulica",
    metaTitulo: "Calcular Potencia de una Bomba Hidráulica Online | Sumifluid",
    metaDescripcion:
      "Calculadora online para hallar la potencia necesaria para mover una bomba hidráulica según su caudal y la presión de trabajo. Resultado en CV.",
    descripcion:
      "La potencia hidráulica necesaria para mover una bomba depende del caudal que suministra y de la presión de trabajo del circuito. Introduzca ambos valores para obtener la potencia en CV.",
    formulaTexto: "Potencia (CV) = Caudal (l/min) × Presión (bar) / 450",
    campos: [
      { key: "caudal", label: "Caudal", unidad: "l/min" },
      { key: "presion", label: "Presión", unidad: "bar" },
    ],
    resultados: [{ key: "potencia", label: "Potencia", unidad: "CV" }],
    calcular: (v) => ({ potencia: (v.caudal * v.presion) / 450 }),
    seoTitulo: "Qué mide la potencia hidráulica de una bomba",
    seoParrafos: [
      "La potencia hidráulica indica la energía que debe entregar el motor eléctrico o de combustión que acciona la bomba para mover un caudal determinado a una presión de trabajo dada. Es el dato de partida para seleccionar la potencia del motor de accionamiento.",
      "El resultado de esta calculadora es la potencia teórica; en la práctica hay que añadir un margen para cubrir el rendimiento volumétrico y mecánico de la bomba, que reduce la eficiencia real del sistema, normalmente entre un 5% y un 15% según el tipo de bomba.",
    ],
    seoFaqs: [
      {
        pregunta: "¿Qué motor eléctrico necesito para mi bomba?",
        respuesta:
          "Como referencia orientativa, elija un motor cuya potencia nominal sea igual o superior a la potencia hidráulica calculada más un margen de seguridad. Consulte siempre la curva de rendimiento del fabricante de la bomba para un dimensionado exacto.",
      },
    ],
  },
  {
    slug: "potencia-motor-hidraulico",
    titulo: "Potencia de un motor hidráulico",
    metaTitulo: "Calcular Potencia de un Motor Hidráulico Online | Sumifluid",
    metaDescripcion:
      "Calculadora online para hallar la potencia de un motor hidráulico según su par de giro y velocidad de rotación. Resultado en CV.",
    descripcion:
      "La potencia que entrega un motor hidráulico depende del par de giro que genera y de su velocidad de rotación. Introduzca ambos valores para obtener la potencia en CV.",
    formulaTexto: "Potencia (CV) = Par (N·m) × Velocidad (rpm) / 7024",
    campos: [
      { key: "par", label: "Par de giro", unidad: "N·m" },
      { key: "velocidad", label: "Velocidad", unidad: "rpm" },
    ],
    resultados: [{ key: "potencia", label: "Potencia", unidad: "CV" }],
    calcular: (v) => ({ potencia: (v.par * v.velocidad) / 7024 }),
    seoTitulo: "De qué depende la potencia de un motor hidráulico",
    seoParrafos: [
      "La potencia mecánica que entrega un motor hidráulico depende del par de giro que es capaz de generar y de la velocidad de rotación a la que trabaja. A igual potencia, un motor puede diseñarse para dar mucho par a poca velocidad o poco par a mucha velocidad, según lo que necesite la aplicación.",
      "Este dato es útil para verificar si un motor hidráulico es capaz de mover una carga concreta, comparando la potencia disponible con la que exige el mecanismo accionado, como una cinta transportadora, un tambor de izado o un reductor.",
    ],
  },
  {
    slug: "velocidad-motor-hidraulico",
    titulo: "Velocidad de un motor hidráulico",
    metaTitulo: "Calcular Velocidad de un Motor Hidráulico Online | Sumifluid",
    metaDescripcion:
      "Calculadora online para hallar la velocidad de giro de un motor hidráulico según el caudal recibido y su cilindrada. Resultado en rpm.",
    descripcion:
      "La velocidad de giro de un motor hidráulico depende del caudal que recibe y de su cilindrada. Introduzca el caudal y la cilindrada del motor para obtener la velocidad de rotación.",
    formulaTexto: "Velocidad (rpm) = Caudal (l/min) × 1000 / Cilindrada (cm³)",
    campos: [
      { key: "caudal", label: "Caudal", unidad: "l/min" },
      { key: "cilindrada", label: "Cilindrada del motor", unidad: "cm³" },
    ],
    resultados: [{ key: "velocidad", label: "Velocidad", unidad: "rpm" }],
    calcular: (v) => ({ velocidad: (v.caudal * 1000) / v.cilindrada }),
    seoTitulo: "Cómo se relaciona el caudal con la velocidad de giro",
    seoParrafos: [
      "La velocidad de giro de un motor hidráulico depende del caudal de aceite que recibe y de su cilindrada: a mayor cilindrada, se necesita más caudal para alcanzar la misma velocidad de rotación.",
      "Este cálculo asume un rendimiento volumétrico del 100%. En la práctica, las fugas internas del motor reducen ligeramente la velocidad real respecto al valor teórico, sobre todo a baja velocidad y alta presión.",
    ],
  },
  {
    slug: "par-motor-hidraulico",
    titulo: "Par de giro de un motor hidráulico",
    metaTitulo: "Calcular Par de Giro de un Motor Hidráulico Online | Sumifluid",
    metaDescripcion:
      "Calculadora online para hallar el par de giro de un motor hidráulico según su cilindrada y la presión de trabajo. Resultado en N·m.",
    descripcion:
      "El par de giro que entrega un motor hidráulico depende de su cilindrada y de la presión de trabajo del circuito. Introduzca ambos valores para obtener el par resultante.",
    formulaTexto: "Par (N·m) = Cilindrada (cm³) × Presión (bar) / 62,8",
    campos: [
      { key: "cilindrada", label: "Cilindrada", unidad: "cm³" },
      { key: "presion", label: "Presión", unidad: "bar" },
    ],
    resultados: [{ key: "par", label: "Par de giro", unidad: "N·m" }],
    calcular: (v) => ({ par: (v.cilindrada * v.presion) / 62.8 }),
    seoTitulo: "Qué significa el par de un motor hidráulico",
    seoParrafos: [
      "El par de giro es la fuerza de rotación que el motor hidráulico puede aplicar sobre su eje, y depende de su cilindrada y de la presión disponible en el circuito. Es el dato que determina si un motor es capaz de vencer la resistencia de la carga que debe mover.",
      "Al igual que en el cálculo de potencia, este resultado es teórico: el rendimiento mecánico real del motor (típicamente entre el 85% y el 95%) reduce ligeramente el par disponible en el eje respecto al valor calculado.",
    ],
  },
];

export interface SeccionSeoIndice {
  titulo: string;
  parrafos: string[];
}

export const seoIndice: SeccionSeoIndice = {
  titulo: "Calculadoras hidráulicas y neumáticas para dimensionar su instalación",
  parrafos: [
    "Estas ocho calculadoras reúnen las fórmulas más utilizadas en el dimensionado de circuitos hidráulicos y neumáticos: área, capacidad, fuerza y velocidad de cilindros, y potencia, velocidad y par de motores y bombas hidráulicas. Están pensadas para técnicos de mantenimiento, ingenieros de diseño y cualquier profesional que necesite verificar un dato antes de comprar o sustituir un componente.",
    "Todas usan fórmulas estándar de la industria hidráulica y neumática, con los factores de conversión habituales entre unidades métricas (bar, cm², l/min, rpm) y CV. Los resultados son valores teóricos: para aplicaciones críticas, aplique siempre un margen sobre el rendimiento real del componente.",
  ],
};
