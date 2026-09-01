'use strict';

// Obliga a Strapi a trabajar desde la carpeta raíz del proyecto
process.chdir(__dirname);

async function main() {
  const { createStrapi, compileStrapi } = require('@strapi/strapi');

  const appContext = await compileStrapi();
  const app = await createStrapi(appContext).start();

  console.log('Strapi iniciado correctamente');
  console.log('Directorio de trabajo:', process.cwd());
}

main().catch((error) => {
  console.error('ERROR AL INICIAR STRAPI:');
  console.error(error);
  process.exit(1);
});