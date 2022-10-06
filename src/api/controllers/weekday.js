import WeekdayService from '../../services/weekday';
import ApiError from '../ApiError';
/* eslint-disable camelcase */

/**
 * weekDay controller
 *
 * controller to handle weekday route request
 *
 * @returns {Function} express.js middleware function
 */
const weekdayController = () => async (req, res, next) => {
  try {
    const { start_date, end_date } = req.body;
    if (!start_date) throw new ApiError('start_date is required', 400);
    if (!end_date) throw new ApiError('end_date is required', 400);
    const service = new WeekdayService();
    const data = await service.countWeekdays({
      startDate: start_date,
      endDate: end_date,
    });
    res.locals.response.setResults({
      data,
      status: 200,
    });
    next();
  } catch (err) {
    next(err);
  }
};

export { weekdayController };
export default { weekdayController };
