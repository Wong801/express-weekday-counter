import loaders from '../../src/loaders';
import routeLoader from '../../src/loaders/route';

jest.mock('../../src/loaders/route', () => jest.fn());
describe('loaders', () => {
  let app;

  beforeEach(() => {
    app = {
      use: () => {},
    };
  });

  it('returns the app', async () => {
    const result = await loaders({ app });
    expect(routeLoader).toHaveBeenCalledWith({ app });
    expect(result).toEqual(app);
  });
});
