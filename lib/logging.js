// Structured logging helper
export function logStructuredError(context, err, extra = {}) {
  const ts = new Date().toISOString()
  console.error(
    JSON.stringify({
      ts,
      level: 'error',
      system: 'matarresesrl',
      context,
      message: err && err.message ? err.message : String(err),
      stack: err && err.stack,
      ...extra,
    }),
  )
}
