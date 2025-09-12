import axios from 'axios'

function logStructuredError(context, err, extra = {}) {
  const ts = new Date().toISOString()
  // eslint-disable-next-line no-console
  console.error(
    JSON.stringify({
      ts,
      level: 'error',
      system: 'mailApi',
      context,
      message: err && err.message ? err.message : String(err),
      stack: err && err.stack,
      ...extra,
    }),
  )
}

const recipientMail = () => {
  return process.env.NEXT_PUBLIC_SEND_MAIL_TO
}

export const sendContactMail = async ({
  surname,
  senderMail,
  tel,
  formContent,
  company,
  participants,
  title,
  referente,
  indirizzo,
  ragione_sociale,
}) => {
  const data = {
    recipientMail: recipientMail(),
    ragione_sociale,
    surname,
    senderMail,
    tel,
    company,
    referente,
    formContent,
    participants,
    indirizzo,
    title,
  }

  try {
    const res = await axios({
      method: 'post',
      url: '/api/contact',
      headers: {
        'Content-Type': 'application/json',
      },
      data,
    })
    return res
  } catch (error) {
    logStructuredError('sendContactMail', error, {data})
    return error
  }
}
