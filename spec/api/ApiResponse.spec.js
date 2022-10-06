import ApiError from '../../src/api/ApiError';
import ApiResponse from '../../src/api/ApiResponse';

describe('ApiResponse', () => {
  let item;

  beforeEach(() => {
    item = new ApiResponse();
  });

  it('has the correct default values', () => {
    expect(item.status).toBe(200);
    expect(item.results).toBe(null);
    expect(item.metadata).toEqual({
      error: null,
    });
  });

  it('setResults() populate correctly with one', () => {
    item.setResults({ data: { fruit: 'banana' } });
    expect(item.results).toEqual({ fruit: 'banana' });
  });

  it('setErrorResults() populate correctly', () => {
    item.setErrorResults({ data: { error: 'error msg', developerMessage: null }, status: 500 });
    expect(item.metadata.error).toEqual({
      error: 'error msg',
      developerMessage: null,
    });
    expect(item.status).toBe(500);
  });

  it('json() returns correctly', () => {
    item.setResults({
      data: { foo: 'bar' },
    });
    expect(item.json()).toEqual({
      metadata: {
        error: null,
      },
      results: {
        foo: 'bar',
      },
    });
  });

  it('json() returns correctly', () => {
    const error = new ApiError('error msg', 400, 'error desc');
    item.setResults({
      error,
      status: error.status,
    });
    expect(item.json()).toEqual({
      metadata: {
        error: {
          userMessage: 'error msg',
          developerMessage: 'error desc',
        },
      },
      results: null,
    });
  });

  it('json() returns correctly', () => {
    const error = new Error('error msg');
    item.setResults({
      error,
      status: error.status,
    });
    expect(item.json()).toEqual({
      metadata: {
        error: {
          userMessage: 'error msg',
          developerMessage: null,
        },
      },
      results: null,
    });
  });

  it('send() works correctly', () => {
    let status = null;
    let send = null;
    const res = {
      status: (data) => { status = data; },
      send: (data) => { send = data; },
    };
    item.setResults({
      data: { foo: 'bar' },
    });
    item.send(res);
    expect(status).toBe(200);
    expect(send).toEqual({
      metadata: {
        error: null,
      },
      results: {
        foo: 'bar',
      },
    });
  });
});
