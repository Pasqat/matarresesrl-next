import { formatDate } from "../actions/utils/formatDate";

export default function Date(params) {
  const { dateString } = params;
  return <time {...params}>{formatDate(dateString)}</time>;
}
