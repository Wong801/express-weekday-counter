import wrap from '../../../src/api/middlewares/wrap';
import { fakeResComplete } from '../../fakeExpress';

describe('wrap', () => {
  let m;
  let res;
  const error = new Error('error');

  beforeEach(() => {
    m = wrap();
    res = fakeResComplete();
    // Mocking native Express.js functions
    res.status = () => {};
    res.send = () => {};
    res.download = () => {};
  });

  it('is created with correct parameters', () => {
    expect(m).toBeInstanceOf(Function);
  });

  it('sends the response', () => {
    let called = false;
    res.locals.response.send = () => { called = true; };
    m(null, res, () => {});
    expect(called).toBe(true);
  });

  it('calls next()', () => {
    let called = false;
    m(null, res, () => { called = true; });
    expect(called).toBe(true);
  });
});
