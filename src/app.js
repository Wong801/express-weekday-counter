import init from './api/middlewares/init';
import wrap from './api/middlewares/wrap';
import error from './api/middlewares/error';

export default class App {
  /**
   * Returns the default listen handler
   *
   * @param {Function} log Console log function
   * @returns {Function} Listener
   */
  static listenHandler(log) {
    return (err) => {
      if (err) {
        log(err);
        return 0;
      }
      log('Started listening');
      return 1;
    };
  }

  /**
   * Create an App
   *
   * @param {Express} express Express.js function
   * @param {Function|Array} loaders Loaders function, will receive expressApp
   * @param {Number} port Port for listening, if unset look for env.PORT or defaults to 8000
   */
  constructor({ express, loaders, port } = {}) {
    this.express = express || null;
    this.loaders = loaders || [];
    this.port = port || 8000;

    if (!Array.isArray(this.loaders)) this.loaders = [this.loaders];
  }

  /**
   * Load the loaders provided in the app by the user
   *
   * @param {Object} expressApp Express.js app to use for loading
   */
  async loadLoaders({ expressApp }) {
    const app = expressApp;
    for (let i = 0; i < this.loaders.length; i += 1) {
      const fn = this.loaders[i];
      // eslint-disable-next-line
      await fn({ app });
    }
  }

  /**
   * Prepare the app with init middleware and basic security
   *
   * @param {express} app Express.js app
   */
  async prepareApp({ app }) {
    app.disable('x-powered-by');
    app.use(this.express.json());
    app.use(this.express.urlencoded({ extended: true }));
    app.use(init());
  }

  /**
   * Load wrapper after user-provided loaders (trailing loaders)
   *
   * @param {express} app Express.js app
   */
  // eslint-disable-next-line
  async loadWrappers({ app }) {
    app.use(wrap());
  }

  /**
   * Load default error wrapper for error response
   *
   * @param {express} app Express.js app
   */
  // eslint-disable-next-line
  async errorWrappers({ app }) {
    app.use(error());
  }

  /**
   * Start the app
   */
  async start() {
    const app = this.express();

    await this.prepareApp({ app });
    await this.loadLoaders({ expressApp: app });
    await this.loadWrappers({ app });
    await this.errorWrappers({ app });

    // eslint-disable-next-line no-console
    const log = ((msg) => { console.log(msg); });
    app.listen(this.port, App.listenHandler(log));
  }
}
