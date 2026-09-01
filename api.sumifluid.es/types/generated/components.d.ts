import type { Schema, Struct } from '@strapi/strapi';

export interface ContactoDireccion extends Struct.ComponentSchema {
  collectionName: 'components_contacto_direccions';
  info: {
    displayName: 'direccion';
    icon: 'pinMap';
  };
  attributes: {
    cp: Schema.Attribute.String;
    direccion: Schema.Attribute.String & Schema.Attribute.Required;
    infoExtra: Schema.Attribute.String;
    municipio: Schema.Attribute.String & Schema.Attribute.Required;
    provincia: Schema.Attribute.String;
  };
}

export interface SharedGaleriaImagenes extends Struct.ComponentSchema {
  collectionName: 'components_shared_galeria_imagenes';
  info: {
    displayName: 'galeriaImagenes';
  };
  attributes: {
    galeriaImagenes: Schema.Attribute.Media<
      'images' | 'files' | 'videos' | 'audios',
      true
    >;
  };
}

export interface SharedImagen extends Struct.ComponentSchema {
  collectionName: 'components_shared_imagens';
  info: {
    displayName: 'imagen';
  };
  attributes: {
    imagen: Schema.Attribute.Media<'images' | 'files' | 'videos' | 'audios'>;
  };
}

export interface SharedList extends Struct.ComponentSchema {
  collectionName: 'components_shared_lists';
  info: {
    displayName: 'list';
    icon: 'bulletList';
  };
  attributes: {
    item: Schema.Attribute.Text;
  };
}

export interface SharedObject extends Struct.ComponentSchema {
  collectionName: 'components_shared_objects';
  info: {
    displayName: 'object';
    icon: 'grid';
  };
  attributes: {
    contenido: Schema.Attribute.Text;
    titulo: Schema.Attribute.Text;
  };
}

export interface SharedSeo extends Struct.ComponentSchema {
  collectionName: 'components_shared_seos';
  info: {
    displayName: 'seo';
    icon: 'rocket';
  };
  attributes: {
    keywords: Schema.Attribute.Text;
    metaDescription: Schema.Attribute.Text;
    metaTitle: Schema.Attribute.String;
    shareImage: Schema.Attribute.Media<'images' | 'files'>;
  };
}

export interface SharedTabla extends Struct.ComponentSchema {
  collectionName: 'components_shared_tablas';
  info: {
    displayName: 'tabla';
  };
  attributes: {
    tabla: Schema.Attribute.JSON &
      Schema.Attribute.CustomField<'plugin::table-field.table'>;
  };
}

export interface SharedText extends Struct.ComponentSchema {
  collectionName: 'components_shared_texts';
  info: {
    displayName: 'text';
  };
  attributes: {
    texto: Schema.Attribute.Blocks;
  };
}

declare module '@strapi/strapi' {
  export namespace Public {
    export interface ComponentSchemas {
      'contacto.direccion': ContactoDireccion;
      'shared.galeria-imagenes': SharedGaleriaImagenes;
      'shared.imagen': SharedImagen;
      'shared.list': SharedList;
      'shared.object': SharedObject;
      'shared.seo': SharedSeo;
      'shared.tabla': SharedTabla;
      'shared.text': SharedText;
    }
  }
}
