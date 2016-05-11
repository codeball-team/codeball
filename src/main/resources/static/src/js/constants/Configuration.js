export const DATE_FORMAT = 'YYYY/MM/DD';
export const TIME_FORMAT = 'HH:mm';
export const DATE_TIME_FORMAT = `${DATE_FORMAT} ${TIME_FORMAT}`;

export const DATA_INVALIDATION_TIME = 5 * 60 * 1000;

export const ENROLLMENT_STATUS_YES = 'YES';
export const ENROLLMENT_STATUS_MAYBE = 'MAYBE';
export const ENROLLMENT_STATUS_NO = 'NO';

export const PITCH_TYPE_FIRM_GROUND = 1;
export const PITCH_TYPE_HARD_GROUND = 2;
export const PITCH_TYPE_ARTIFICIAL_HARD = 3;
export const PITCH_TYPE_ARTIFICIAL_SOFT = 4;
export const PITCH_TYPE_INDOOR = 5;
export const PITCH_TYPE_STRING = {
  [PITCH_TYPE_FIRM_GROUND]: 'Firm Ground',
  [PITCH_TYPE_HARD_GROUND]: 'Hard Ground',
  [PITCH_TYPE_ARTIFICIAL_HARD]: 'Artificial Hard',
  [PITCH_TYPE_ARTIFICIAL_SOFT]: 'Artificial Soft (Turf)',
  [PITCH_TYPE_INDOOR]: 'Indoor'
};

export const ROLE_ADMIN = 'ROLE_ADMIN';
export const ROLE_USER = 'ROLE_USER';