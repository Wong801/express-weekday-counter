import ApiError from '../../../src/api/ApiError';
import error from '../../../src/api/middlewares/error';
import { fakeResComplete } from '../../fakeExpress';

describe('error', () => {
  let m;
  let res;
  let err;
  let resCalled = false;

  beforeEach(() => {
    m = error();
    res = fakeResComplete();
    // Mocking native Express.js functions
    res.send = () => {};
    err = new Error('error');
    res.status = () => ({
      json: () => { resCalled = true; },
    });
  });

  it('is created with correct parameters', () => {
    expect(m).toBeInstanceOf(Function);
  });

  it('calls setResults if the error is intanceof ApiError', () => {
    err = new ApiError('error message', 400);
    jest.spyOn(res.locals.response, 'setResults');
    m(err, null, res, () => {});
    expect(res.locals.response.setResults).toHaveBeenCalledWith({
      error: err,
      status: 400,
    });
  });

  it('calls setResults if the error is intanceof Error', () => {
    err = new Error('error');
    jest.spyOn(res.locals.response, 'setResults');
    m(err, null, res, () => {});
    expect(res.locals.response.setResults).toHaveBeenCalledWith({
      error: err,
      status: 500,
    });
  });
});
