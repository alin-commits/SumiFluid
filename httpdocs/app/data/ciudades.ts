export interface Ciudad {
  slug: string;
  nombre: string;
  /** Forma adjetiva usada en "la industria [gentilicio]", ej. "madrileña" */
  gentilicio: string;
  /** Municipios cercanos mencionados en el párrafo de cobertura */
  localidadesCercanas?: string[];
}

export const ciudades: Ciudad[] = [
  {
    slug: "madrid",
    nombre: "Madrid",
    gentilicio: "madrileña",
    localidadesCercanas: [
      "Móstoles",
      "Alcalá de Henares",
      "Fuenlabrada",
      "Leganés",
      "Getafe",
      "Alcorcón",
      "Alcobendas",
      "Las Rozas",
      "Pozuelo de Alarcón",
      "Torrejón de Ardoz",
    ],
  },
  {
    slug: "barcelona",
    nombre: "Barcelona",
    gentilicio: "barcelonesa",
  },
  {
    slug: "valencia",
    nombre: "Valencia",
    gentilicio: "valenciana",
  },
  {
    slug: "sevilla",
    nombre: "Sevilla",
    gentilicio: "sevillana",
  },
  {
    slug: "zaragoza",
    nombre: "Zaragoza",
    gentilicio: "zaragozana",
  },
  {
    slug: "malaga",
    nombre: "Málaga",
    gentilicio: "malagueña",
  },
  {
    slug: "murcia",
    nombre: "Murcia",
    gentilicio: "murciana",
  },
  {
    slug: "alicante",
    nombre: "Alicante",
    gentilicio: "alicantina",
  },
  {
    slug: "cordoba",
    nombre: "Córdoba",
    gentilicio: "cordobesa",
  },
  {
    slug: "valladolid",
    nombre: "Valladolid",
    gentilicio: "vallisoletana",
  },
  {
    slug: "vigo",
    nombre: "Vigo",
    gentilicio: "viguesa",
  },
  {
    slug: "gijon",
    nombre: "Gijón",
    gentilicio: "gijonesa",
  },
  {
    slug: "a-coruna",
    nombre: "A Coruña",
    gentilicio: "coruñesa",
  },
  {
    slug: "granada",
    nombre: "Granada",
    gentilicio: "granadina",
  },
  {
    slug: "castellon-de-la-plana",
    nombre: "Castellón de la Plana",
    gentilicio: "castellonense",
  },
  {
    slug: "cartagena",
    nombre: "Cartagena",
    gentilicio: "cartagenera",
  },
  {
    slug: "albacete",
    nombre: "Albacete",
    gentilicio: "albaceteña",
  },
  {
    slug: "bilbao",
    nombre: "Bilbao",
    gentilicio: "bilbaína",
  },
  {
    slug: "pamplona",
    nombre: "Pamplona",
    gentilicio: "pamplonesa",
  },
  {
    slug: "toledo",
    nombre: "Toledo",
    gentilicio: "toledana",
  },
];
