import {format} from 'date-fns';

export default function dateStamp(datestamp) {
  return format(new Date(datestamp), 'D MMM YYYY')
}
