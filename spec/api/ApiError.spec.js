import ApiError from '../../src/api/ApiError';

describe('ApiError', () => {
  beforeEach(() => {});

  it('stores the parameter in the constructor', () => {
    const item = new ApiError('error message', 400, 'error message too');
    expect(item.message).toBe('error message');
    expect(item.status).toBe(400);
    expect(item.developerMessage).toBe('error message too');
  });

  it('load default parameter correctly', () => {
    const item = new ApiError();
    expect(item.status).toBe(500);
    expect(item.developerMessage).toBeNull();
  });

  it('json() returns correctly', () => {
    const item = new ApiError('error message', 400, 'error message too');
    expect(item.json()).toEqual({
      userMessage: 'error message',
      developerMessage: 'error message too',
    });
  });
});
