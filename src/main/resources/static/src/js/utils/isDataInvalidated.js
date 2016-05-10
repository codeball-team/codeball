import moment from 'moment';
import { DATA_INVALIDATION_TIME, DATE_TIME_FORMAT } from 'constants/Configuration';

export default function isDataInvalidated(lastUpdate) {
  return lastUpdate === undefined
    || moment().isAfter(moment(lastUpdate, DATE_TIME_FORMAT).valueOf() + DATA_INVALIDATION_TIME);
}
