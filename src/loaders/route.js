import weekday from '../api/routes/weekday';

export default ({ app }) => {
  app.use('/api/v1/weekday', weekday);
  return app;
};
