/**
 * Create the middleware that packages the response for the client
 *
 * @returns {Function} Express.js Middleware
 */
export default function wrap() {
  return (req, res, next) => {
    res.locals.response.send(res);
    next();
  };
}
