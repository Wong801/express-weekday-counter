/**
 * Standard API Error Response to be sent to the client
 *
 * @param {String} message error message to user
 * @param {Number} status status error. Default is 500
 * @param {String} developerMessage specific error message to developer
 */
export default class ApiError extends Error {
  /**
   * Create an API Error
   *
   * @param {String} message error message to user
   * @param {Number} status status error. Default is 500
   * @param {String} developerMessage specific error message to developer
   */
  constructor(message, status, developerMessage) {
    super(message);
    this.status = status || 500;
    this.developerMessage = developerMessage || null;
  }

  /**
   * Craft this error response as Plain Object to be sent to the user
   *
   * @returns {Object} Response as JSON Object
   */
  json() {
    return {
      userMessage: this.message,
      developerMessage: this.developerMessage,
    };
  }
}
