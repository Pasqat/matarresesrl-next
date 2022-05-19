import {formatDate} from '../actions/utils/formatDate'

export default function Date({dateString, className}) {
  return <time className={className}>{formatDate(dateString)}</time>
}
