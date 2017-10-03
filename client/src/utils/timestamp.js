import {format} from 'date-fns'

export default function timeStamp (timestamp) {
  return format(new Date(timestamp), 'h:mma')
}
