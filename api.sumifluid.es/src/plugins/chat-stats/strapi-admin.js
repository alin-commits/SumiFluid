import { ChartPie } from '@strapi/icons';

export default {
  register(app) {
    app.addMenuLink({
      to: '/plugins/chat-stats',
      icon: ChartPie,
      intlLabel: {
        id: 'chat-stats.menu.label',
        defaultMessage: 'Estadísticas IA',
      },
      Component: () => import('./admin/src/pages/HomePage/index.jsx'),
      permissions: [],
    });
  },
};
