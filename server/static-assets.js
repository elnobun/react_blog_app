import path from 'path'
import ecstatic from 'ecstatic'

export default ecstatic({
  root: path.join(__dirname, '../client/build'),
  handleError: false,
  showDir: false,
  gzip: true,
  cache: 604800000 // 1000 * 3600 * 24 * 7 == one week in milliseconds
})
