export default function truncate(text, length) {
  if (!text || text.length <= length) {
    return text
  }

  return `${text.substr(0, length).trim()}...`
}
