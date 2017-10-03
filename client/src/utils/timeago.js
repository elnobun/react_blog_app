import { distanceInWordsToNow } from 'date-fns'

export default function timeAgo (timeago) {
  return distanceInWordsToNow(new Date(timeago), {addSuffix: true})
}
