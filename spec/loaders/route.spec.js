import route from '../../src/loaders/route';
import weekday from '../../src/api/routes/weekday';

jest.mock('../../src/api/routes/weekday', () => jest.fn());
describe('route', () => {
  let app;
  let stack;

  beforeEach(() => {
    stack = [];
    app = {
      use: (...args) => {
        stack.push(['use', ...args]);
      },
    };
  });

  it('returns the app', async () => {
    const result = await route({ app });
    expect(result).toEqual(app);
  });

  it('engages the stack correctly', async () => {
    await route({ app });
    expect(stack.length).toBe(1);
    expect(stack[0].length).toBe(3);
    expect(stack[0][0]).toBe('use');
    expect(stack[0][1]).toBe('/api/v1/weekday');
  });
});
