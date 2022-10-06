import ApiResponse from '../ApiResponse';

/**
 * Create the middleware that enables the process of the request
 *
 * @returns {Function} express.js middleware
 */
export default function init() {
  return (req, res, next) => {
    res.locals.response = new ApiResponse();
    next();
  };
}
