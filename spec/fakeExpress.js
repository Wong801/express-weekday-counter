import ApiResponse from '../src/api/ApiResponse';

/**
 * Fake representation of the res object passed to express.js middlewares
 */
function fakeRes() {
  return {
    locals: {},
  };
}

/**
 * Fake representation of the res object after init middleware has run
 */
function fakeResComplete() {
  return {
    locals: {
      trail: [],
      response: new ApiResponse(),
      modules: {},
    },
  };
}

export default { fakeRes, fakeResComplete };
export { fakeRes, fakeResComplete };
