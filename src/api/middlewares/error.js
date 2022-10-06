/**
 * Create the middleware that enables the process of the request
 *
 * @param {Object} modules Modules to make available in middleware execution
 * @returns {Function} express.js middleware
 */
export default function error() {
  // eslint-disable-next-line no-unused-vars
  return (err, req, res, next) => {
    res.locals.response.setResults({
      error: err,
      status: err.status || 500,
    });
    return res.status(err.status).json(res.locals.response.json());
  };
}
