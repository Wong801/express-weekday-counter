import routeLoader from './route';

export default async ({ app }) => {
  await routeLoader({ app });
  return app;
};
