import ApiError from './ApiError';

/**
 * Standard API Response to be sent to the client
 */
export default class ApiResponse {
  /**
   * Create an API Response
   */
  constructor() {
    this.status = 200;
    this.metadata = {
      error: null,
    };
    this.results = null;
  }

  /**
   * Set the results for this response
   *
   * @param {Object|Array} data Result to be sent to the client
   * @param {Object} error Error message to be sent to client
   * @param {Number} status HTTP Status for the response
   */
  setResults({
    // eslint-disable-next-line
    data = null, error = null, status = null,
  }) {
    this.results = data;
    this.metadata.error = error;
    if (status) this.status = status;
  }

  /**
   * Set the error results for this response
   *
   * @param {Object} data Error to be sent to the client
   * @param {Number} status HTTP Status for the error response
   */
  setErrorResults({ data, status }) {
    this.metadata.error = data;
    this.status = status;
  }

  /**
   * Craft this response as Plain Object to be sent to the user
   *
   * @returns {Object} Response as JSON Object
   */
  json() {
    if (this.metadata.error) {
      this.metadata.error = this.metadata.error.json
        ? this.metadata.error.json()
        : new ApiError(this.metadata.error.message).json();
    }
    return {
      metadata: this.metadata,
      results: this.results,
    };
  }

  /**
   * Send the response to the user
   * Send the downloaded file response to the user if request is downloadable file
   *
   * @param {Object} res Express.js response object
   */
  send(res) {
    res.status(this.status);
    return res.send(this.json());
  }
}
