import App from '../src/app';

describe('App', () => {
  it('creates with the correct default values', () => {
    const app = new App();
    expect(app.express).toBe(null);
    expect(app.loaders).toEqual([]);
    expect(app.port).toEqual(8000);
  });

  it('loads parameters correctly', () => {
    const app = new App({
      express: 'express',
      loaders: 'loaders',
      port: 443,
    });
    expect(app.express).toBe('express');
    expect(app.loaders).toEqual(['loaders']);
    expect(app.port).toEqual(443);
  });
});

describe('App.listenHandler()', () => {
  let handler;
  let content;

  beforeEach(() => {
    content = null;
    handler = App.listenHandler((data) => { content = data; });
  });

  it('returns 1 on success', () => {
    expect(handler()).toBe(1);
    expect(handler(undefined)).toBe(1);
    expect(handler(null)).toBe(1);
    expect(handler(false)).toBe(1);
    expect(handler(0)).toBe(1);
  });

  it('logs "Started listening" on success', () => {
    handler();
    expect(content).toBe('Started listening');
  });

  it('returns 0 on error', () => {
    expect(handler('error')).toBe(0);
    expect(handler(123)).toBe(0);
    expect(handler(App)).toBe(0);
  });
});

describe('App.loadLoaders()', () => {
  const express = () => ({
    uid: 'UID',
    listen: (p, fn) => true,
  });

  it('receive the express app', async () => {
    const app = new App({ express, log: () => {} });
    let rcv = null;
    app.loaders = [
      (expressApp) => {
        rcv = expressApp;
      },
    ];
    expect(rcv).toBe(null);
    await app.loadLoaders({ expressApp: express() });
    expect(rcv.app.uid).toBe('UID');
  });

  it('processes multiple loaders in an array', async () => {
    const app = new App({ express, log: () => {} });
    let cnt = 0;
    app.loaders = [
      (expressApp) => { cnt += 1; },
      (expressApp) => { cnt += 1; },
    ];
    await app.loadLoaders({ expressApp: express() });
    expect(cnt).toBe(2);
  });
});

describe('App.prepareApp()', () => {
  let stack;

  const express = () => ({
    uid: 'UID',
    disable: (param) => {
      stack.push({
        fn: 'disable',
        param,
      });
    },
    use: (param) => {
      stack.push({
        fn: 'use',
        param,
      });
    },
  });

  express.json = () => {};
  express.urlencoded = ({ extended }) => {};

  beforeEach(() => {
    stack = [];
  });

  it('loads correctly', async () => {
    const app = new App({ express, log: () => {} });
    expect(stack.length).toBe(0);
    await app.prepareApp({ app: express() });
    expect(stack.length).toBe(4);
    expect(stack[0].fn).toBe('disable');
    expect(stack[0].param).toBe('x-powered-by');
    expect(stack[3].fn).toBe('use');
    expect(stack[3].param).toBeInstanceOf(Function);
  });
});

describe('App.errorWrappers()', () => {
  let stack;

  const express = () => ({
    uid: 'UID',
    use: (param) => {
      stack.push({
        fn: 'use',
        param,
      });
    },
  });

  beforeEach(() => {
    stack = [];
  });

  it('loads correctly', async () => {
    const app = new App({ express, log: () => {} });
    expect(stack.length).toBe(0);
    await app.errorWrappers({ app: express() });
    expect(stack.length).toBe(1);
    expect(stack[0].fn).toBe('use');
  });
});

describe('App.loadWrappers()', () => {
  let stack;

  const express = () => ({
    uid: 'UID',
    use: (param) => {
      stack.push({
        fn: 'use',
        param,
      });
    },
  });

  beforeEach(() => {
    stack = [];
  });

  it('loads correctly', async () => {
    const app = new App({ express, log: () => {} });
    expect(stack.length).toBe(0);
    await app.loadWrappers({ app: express() });
    expect(stack.length).toBe(1);
    expect(stack[0].fn).toBe('use');
  });
});

describe('App.start()', () => {
  let port;
  let expressLaunched;
  let listenLaunched;

  const express = () => {
    expressLaunched = true;
    return {
      uid: 'UID',
      disable: () => {},
      use: () => {},
      listen: (p, fn) => {
        port = p;
        listenLaunched = true;
      },
    };
  };

  express.json = () => {};
  express.urlencoded = ({ extended }) => {};

  beforeEach(() => {
    port = null;
    expressLaunched = null;
    listenLaunched = null;
  });

  it('creates an express app', async () => {
    expect(expressLaunched).toBe(null);
    expect(listenLaunched).toBe(null);
    const app = new App({
      express,
    });
    await app.start();
    expect(expressLaunched).toBe(true);
    expect(listenLaunched).toBe(true);
  });

  it('defaults to port 8000', async () => {
    expect(port).toBe(null);
    const app = new App({
      express,
    });
    await app.start();
    expect(port).toBe(8000);
  });

  it('loads a custom port correctly', async () => {
    expect(port).toBe(null);
    const app = new App({
      express, port: 443,
    });
    await app.start();
    expect(port).toBe(443);
  });
});
