import dayjs from 'dayjs';
import customParseFormat from 'dayjs/plugin/customParseFormat';
import relativeTime from 'dayjs/plugin/relativeTime';
import Holidays from 'date-holidays';
import ApiError from '../api/ApiError';

export default class WeekdayService {
  /**
   * Service for handle weekday feature logic
   *
   * @param {Function} dateParser function to parse date. Default is dayjs
   * @param {Function} holidays function to get holidays. Default is date-holidays
   * @param {String} country country to get holidays list. Default is ID (Indonesia)
   */
  constructor({ dateParser, holidays, country } = {}) {
    this.dateParser = dateParser || dayjs;
    this.Holidays = holidays || Holidays;
    this.country = country || 'ID';

    this.dateParser.extend(customParseFormat);
    this.dateParser.extend(relativeTime);
  }

  /**
   * Initialize Holidays class
   *
   * @return {Holidays} Holidays instance
   */
  initHolidays() {
    return new (this.Holidays)(this.country);
  }

  /**
   * Validate date value
   *
   * check if value is date or not
   *
   * @param {*} date date
   * @returns {Boolean} true if valid
   */
  validateDateValue(date) {
    return this.dateParser(date).isValid();
  }

  /**
   * Validate date format
   *
   * check if date format is correct ('MM/DD/YYYY')
   *
   * @param {*} date date
   * @returns {Boolean} true if valid
   */
  validateDateFormat(date) {
    return this.dateParser(date, 'MM/DD/YYYY', true).isValid();
  }

  /**
   * Count Weekdays
   *
   * count how many weekdays beetween the given date
   *
   * @param {Object} json request body
   * @param {Date} json.startDate start date
   * @param {Date} json.endDate end date
   * @returns {Object} object response contains sum of weekdays
   *
   * @throws {ApiError} if date is invalid
   * @throws {ApiError} if date format is invalid
   * @throws {ApiError} if date difference is invalid
   */
  async countWeekdays({ startDate, endDate }) {
    if (!this.validateDateValue(startDate)) {
      throw new ApiError('invalid start date value', 400);
    }
    if (!this.validateDateValue(endDate)) {
      throw new ApiError('invalid end date value', 400);
    }
    if (!this.validateDateFormat(startDate)) {
      throw new ApiError('start date format must be MM/DD/YYYY', 400);
    }
    if (!this.validateDateFormat(endDate)) {
      throw new ApiError('end date format must be MM/DD/YYYY', 400);
    }
    const dayDifference = (this.dateParser(startDate).diff(endDate, 'day') * -1) - 1;
    if (dayDifference <= 0) {
      throw new ApiError('end date must be ahead of start date and has minimum 2 day difference', 400);
    }
    let workingDays = 0;
    const holidays = this.initHolidays();
    for (let i = 0; i < dayDifference; i += 1) {
      const current = this.dateParser(startDate).add(i, 'day');
      if (!holidays.isHoliday(new Date(current))) {
        workingDays += 1;
      }
      const day = new Date(current).getDay();
      if (day === 6 || day === 0) {
        workingDays -= 1;
      }
    }
    return {
      number_of_working_days: workingDays,
    };
  }
}
