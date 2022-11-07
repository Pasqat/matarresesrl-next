import axios from 'axios'

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
    console.log(error)
    return error
  }
}
