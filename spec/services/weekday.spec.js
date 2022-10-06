import Holidays from 'date-holidays';
import dayjs from 'dayjs';
import WeekdayService from '../../src/services/weekday';

mockFunction = jest.fn();

jest.mock('date-holidays', () => jest.fn().mockImplementation((country) => ({
  isHoliday: mockFunction,
})));
describe('WeekdayService', () => {
  it('populate default value', () => {
    const s = new WeekdayService();

    expect(s.dateParser).toEqual(dayjs);
    expect(s.Holidays).toBe(Holidays);
    expect(s.country).toBe('ID');
  });

  it('populate custom value', () => {
    const s = new WeekdayService({
      dateParser: {
        extend: () => {},
      },
      holidays: 'holidays',
      country: 'country',
    });

    expect(s.dateParser).toBeInstanceOf(Object);
    expect(s.Holidays).toBe('holidays');
    expect(s.country).toBe('country');
  });
});

describe('WeekdayService.initHolidays()', () => {
  it('return correct value value', () => {
    const s = new WeekdayService();
    expect(s.initHolidays()).toBeInstanceOf(Object);
  });
});

describe('WeekdayService.validateDateValue()', () => {
  it('return correct value value', () => {
    const s = new WeekdayService();
    expect(s.validateDateValue('04/12/2019')).toBe(true);
    expect(s.validateDateValue('invalid date')).toBe(false);
  });
});

describe('WeekdayService.validateDateFormat()', () => {
  it('return correct value value', () => {
    const s = new WeekdayService();
    expect(s.validateDateFormat('04/12/2019')).toBe(true);
    expect(s.validateDateFormat('04-12-2019')).toBe(false);
  });
});
