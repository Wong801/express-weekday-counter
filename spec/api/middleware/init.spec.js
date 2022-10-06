import init from '../../../src/api/middlewares/init';
import ApiResponse from '../../../src/api/ApiResponse';
import { fakeRes } from '../../fakeExpress';

describe('init', () => {
  let m;

  beforeEach(() => {
    m = init();
  });

  it('is created with correct parameters', () => {
    expect(m).toBeInstanceOf(Function);
  });

  it('sets a response', () => {
    const res = fakeRes();
    expect(res.locals.response).toBeUndefined();
    m(null, res, () => {});
    expect(res.locals.response).toBeInstanceOf(ApiResponse);
  });

  it('calls next()', () => {
    const res = fakeRes();
    let called = false;
    m(null, res, () => { called = true; });
    expect(called).toBe(true);
  });
});
