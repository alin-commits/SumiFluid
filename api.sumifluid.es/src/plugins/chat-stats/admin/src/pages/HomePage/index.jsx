import * as React from 'react';
import { useFetchClient } from '@strapi/admin/strapi-admin';
import { Main, Box, Flex, Grid, Typography, Loader } from '@strapi/design-system';

const StatCard = ({ label, value }) => (
  <Box background="neutral0" padding={4} shadow="filterShadow" hasRadius>
    <Typography variant="sigma" textColor="neutral600">
      {label}
    </Typography>
    <Box paddingTop={1}>
      <Typography variant="alpha">{value}</Typography>
    </Box>
  </Box>
);

const HomePage = () => {
  const { get } = useFetchClient();
  const [logs, setLogs] = React.useState(null);
  const [error, setError] = React.useState(null);

  React.useEffect(() => {
    let cancelled = false;

    get('/content-manager/collection-types/api::chat-log.chat-log', {
      params: { page: 1, pageSize: 1000, sort: 'createdAt:DESC' },
    })
      .then(({ data }) => {
        if (!cancelled) setLogs(data?.results ?? []);
      })
      .catch((err) => {
        if (!cancelled) setError(err?.message || 'No se pudieron cargar los datos.');
      });

    return () => {
      cancelled = true;
    };
  }, [get]);

  const stats = React.useMemo(() => {
    if (!logs) return null;

    const total = logs.length;
    const exitos = logs.filter((l) => l.exito).length;
    const conProducto = logs.filter((l) => l.productoSugerido).length;
    const duraciones = logs
      .map((l) => l.duracionMs)
      .filter((d) => typeof d === 'number' && d > 0);
    const duracionMedia = duraciones.length
      ? Math.round(duraciones.reduce((a, b) => a + b, 0) / duraciones.length)
      : null;

    const porDia = {};
    for (const l of logs) {
      const dia = (l.createdAt || '').slice(0, 10);
      if (!dia) continue;
      porDia[dia] = (porDia[dia] || 0) + 1;
    }
    const ultimosDias = Object.entries(porDia)
      .sort((a, b) => (a[0] < b[0] ? 1 : -1))
      .slice(0, 14)
      .reverse();
    const maxDia = Math.max(1, ...ultimosDias.map(([, count]) => count));

    const tokensDe = (l) => (l.tokensEntrada || 0) + (l.tokensSalida || 0);
    const ahora = new Date();
    const hoyStr = ahora.toISOString().slice(0, 10);
    const mesStr = ahora.toISOString().slice(0, 7);

    const logsHoy = logs.filter((l) => (l.createdAt || '').slice(0, 10) === hoyStr);
    const logsMes = logs.filter((l) => (l.createdAt || '').slice(0, 7) === mesStr);

    const peticionesHoy = logsHoy.length;
    const peticionesMes = logsMes.length;
    const tokensHoy = logsHoy.reduce((sum, l) => sum + tokensDe(l), 0);
    const tokensMes = logsMes.reduce((sum, l) => sum + tokensDe(l), 0);

    return {
      total,
      exitos,
      conProducto,
      duracionMedia,
      ultimosDias,
      maxDia,
      peticionesHoy,
      peticionesMes,
      tokensHoy,
      tokensMes,
    };
  }, [logs]);

  return (
    <Main>
      <Box padding={8}>
        <Typography variant="alpha" tag="h1">
          Estadísticas del asistente de IA
        </Typography>
        <Box paddingTop={2} paddingBottom={6}>
          <Typography variant="epsilon" textColor="neutral600">
            Uso y rendimiento del chatbot del sitio web.
          </Typography>
        </Box>

        {error && <Typography textColor="danger600">{error}</Typography>}

        {!logs && !error && <Loader>Cargando estadísticas...</Loader>}

        {stats && (
          <>
            <Grid.Root gap={4}>
              <Grid.Item col={3} s={6} xs={12}>
                <StatCard label="Conversaciones registradas" value={stats.total} />
              </Grid.Item>
              <Grid.Item col={3} s={6} xs={12}>
                <StatCard
                  label="Tasa de éxito"
                  value={stats.total ? `${Math.round((stats.exitos / stats.total) * 100)}%` : '—'}
                />
              </Grid.Item>
              <Grid.Item col={3} s={6} xs={12}>
                <StatCard
                  label="Con producto sugerido"
                  value={
                    stats.total ? `${Math.round((stats.conProducto / stats.total) * 100)}%` : '—'
                  }
                />
              </Grid.Item>
              <Grid.Item col={3} s={6} xs={12}>
                <StatCard
                  label="Duración media de respuesta"
                  value={stats.duracionMedia ? `${(stats.duracionMedia / 1000).toFixed(1)}s` : '—'}
                />
              </Grid.Item>
            </Grid.Root>

            <Box paddingTop={8}>
              <Typography variant="beta" tag="h2">
                Uso frente al nivel gratuito
              </Typography>
              <Box paddingTop={4}>
                <Grid.Root gap={4}>
                  <Grid.Item col={3} s={6} xs={12}>
                    <StatCard label="Peticiones hoy" value={stats.peticionesHoy} />
                  </Grid.Item>
                  <Grid.Item col={3} s={6} xs={12}>
                    <StatCard label="Peticiones este mes" value={stats.peticionesMes} />
                  </Grid.Item>
                  <Grid.Item col={3} s={6} xs={12}>
                    <StatCard
                      label="Tokens hoy"
                      value={stats.tokensHoy ? stats.tokensHoy.toLocaleString('es-ES') : '—'}
                    />
                  </Grid.Item>
                  <Grid.Item col={3} s={6} xs={12}>
                    <StatCard
                      label="Tokens este mes"
                      value={stats.tokensMes ? stats.tokensMes.toLocaleString('es-ES') : '—'}
                    />
                  </Grid.Item>
                </Grid.Root>
                <Box paddingTop={3}>
                  <Typography variant="pi" textColor="neutral600">
                    Google no publica límites fijos del nivel gratuito (varían por cuenta y
                    cambian con el tiempo): compara estas cifras con tu límite real y actual en{' '}
                    <a
                      href="https://aistudio.google.com/rate-limit"
                      target="_blank"
                      rel="noreferrer"
                    >
                      Google AI Studio → Rate limits
                    </a>
                    .
                  </Typography>
                </Box>
              </Box>
            </Box>

            <Box paddingTop={8}>
              <Typography variant="beta" tag="h2">
                Últimos 14 días
              </Typography>
              <Box paddingTop={4}>
                {stats.ultimosDias.length === 0 && (
                  <Typography textColor="neutral600">
                    Todavía no hay datos suficientes.
                  </Typography>
                )}
                {stats.ultimosDias.map(([dia, count]) => (
                  <Flex key={dia} gap={4} paddingBottom={2} alignItems="center">
                    <Box width="110px">
                      <Typography variant="pi">{dia}</Typography>
                    </Box>
                    <Box
                      background="primary500"
                      hasRadius
                      height="14px"
                      width={`${Math.max(4, (count / stats.maxDia) * 320)}px`}
                    />
                    <Typography variant="pi">{count}</Typography>
                  </Flex>
                ))}
              </Box>
            </Box>
          </>
        )}
      </Box>
    </Main>
  );
};

export default HomePage;
