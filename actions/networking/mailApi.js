import axios from 'axios'

const recipientMail = () => {
  return process.env.NEXT_PUBLIC_SEND_MAIL_TO
}

export const sendContactMail = async ({
  name,
  surname,
  senderMail,
  tel,
  formContent,
  participants,
  title,
}) => {
  const data = {
    recipientMail: recipientMail(),
    name,
    surname,
    senderMail,
    tel,
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
