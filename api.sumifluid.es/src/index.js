'use strict';

const { errors } = require('@strapi/utils');
const { ValidationError } = errors;

module.exports = {
  /**
   * An asynchronous register function that runs before
   * your application is initialized.
   *
   * This gives you an opportunity to extend code.
   */
  register(/*{ strapi }*/) {},

  /**
   * An asynchronous bootstrap function that runs before
   * your application gets started.
   *
   * This gives you an opportunity to set up your data model,
   * run jobs, or perform some special logic.
   */
  bootstrap({ strapi }) {
    // La Galería de medios del panel de administración de Strapi tiene un bug
    // conocido (confirmado por el equipo de Strapi, issues #18175 y #16005):
    // se cuelga con "Whoops! Something went wrong" al intentar mostrar
    // cualquier imagen cuyo campo "formats" sea null. Esto ocurre con SVG
    // (no se pueden rasterizar) o con imágenes demasiado pequeñas para
    // generar ninguna miniatura. En vez de dejar que se suba y luego se
    // rompa el panel, se rechaza la subida en el momento con un mensaje claro.
    strapi.db.lifecycles.subscribe({
      models: ['plugin::upload.file'],

      async afterCreate(event) {
        const { result } = event;
        const esImagen = typeof result.mime === 'string' && result.mime.startsWith('image/');

        if (esImagen && !result.formats) {
          await strapi.plugin('upload').service('upload').remove(result);

          throw new ValidationError(
            `No se pudo subir "${result.name}": es un SVG o una imagen demasiado pequeña para generar miniaturas, lo que rompe la Galería de medios (bug conocido de Strapi). Sube una imagen PNG o JPG de al menos 300px de ancho.`,
          );
        }
      },
    });
  },
};
