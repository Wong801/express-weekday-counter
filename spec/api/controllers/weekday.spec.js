import ApiError from '../../../src/api/ApiError';
import { weekdayController } from '../../../src/api/controllers/weekday';
import WeekdayService from '../../../src/services/weekday';
import { fakeResComplete } from '../../fakeExpress';

let mockFunction = jest.fn();

jest.mock('../../../src/services/weekday', () => jest.fn().mockImplementation(() => ({
  countWeekdays: mockFunction,
})));
describe('weekdayController()', () => {
  let req;
  let res;
  let next;
  let dataInterface;
  let controller;

  beforeEach(() => {
    req = {
      body: {
        start_date: '03/27/2020',
        end_date: '03/27/2021',
      },
    };
    res = fakeResComplete();
    next = () => {};
    controller = weekdayController({ dataInterface });
  });

  it('throw correct error when start_date is undefined', async () => {
    req.body = {
      end_date: '03/27/2021',
    };
    try {
      await controller(req, res, next);
    } catch (error) {
      expect(error).toBeDefined();
      expect(error.message).toBe('start_date is required');
      expect(error.status).toBe(400);
    }
  });

  it('throw correct error when end_date is undefined', async () => {
    req.body = {
      start_date: '03/27/2020',
    };
    try {
      await controller(req, res, next);
    } catch (error) {
      expect(error).toBeDefined();
      expect(error.message).toBe('end_date is required');
      expect(error.status).toBe(400);
    }
  });

  it('populates the response on success', async () => {
    mockFunction = jest.fn().mockImplementation(() => ({
      number_of_working_days: 2,
    }));
    await controller(req, res, next);
    expect(res.locals.response.status).toBe(200);
    expect(res.locals.response.results).toBeDefined();
    expect(res.locals.response.results).toBeInstanceOf(Object);
  });

  it('populates next(err) on error', async () => {
    let error;
    mockFunction = jest.fn().mockImplementation(() => {
      throw new ApiError('error');
    });
    await controller(req, res, (err) => { error = err; });
    expect(error).toBeInstanceOf(ApiError);
  });
});
