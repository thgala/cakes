export const MODULE_NAME = 'form';

export const FORMS_DAYS = Array
  .apply(null, Array(31))
  .map(function (_, i) {return i + 1;});

export const FORMS_MONTHS = [
  'January',
  'February',
  'March',
  'April',
  'May',
  'June',
  'July',
  'August',
  'September',
  'October',
  'November',
  'December'
];
export const FORMS_YEARS = Array
  .apply(null, Array(117))
  .map(function (_, i) {return 1900 + i;})
  .reverse();

export const FORM_DATE_FORMAT = 'DD-MM-YYYY';