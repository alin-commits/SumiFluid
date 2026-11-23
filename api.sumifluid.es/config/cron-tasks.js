module.exports = {
  /**
   * Publica automáticamente los posts del blog que están en borrador
   * con una fecha (campo "fecha") igual o anterior a hoy.
   * Permite programar artículos con antelación: se crean como borrador
   * con la fecha de publicación deseada y esta tarea los publica sola.
   */
  publishScheduledPosts: {
    task: async ({ strapi }) => {
      const hoy = new Date().toISOString().slice(0, 10);

      const pendientes = await strapi.documents('api::post.post').findMany({
        status: 'draft',
        filters: {
          fecha: { $lte: hoy },
        },
        fields: ['id', 'titulo', 'slug', 'fecha'],
      });

      for (const post of pendientes) {
        await strapi.documents('api::post.post').publish({
          documentId: post.documentId,
        });
        strapi.log.info(
          `[cron publishScheduledPosts] Publicado "${post.titulo}" (${post.slug}), fecha ${post.fecha}`,
        );
      }
    },
    options: {
      rule: '0 * * * *', // cada hora, en punto
    },
  },
};
