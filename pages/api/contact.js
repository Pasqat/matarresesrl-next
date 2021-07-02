import nodemailer from 'nodemailer'

const emailPass = process.env.EMAIL_PASSWORD

const transporter = nodemailer.createTransport({
  host: 'smtp...',
  port: 25,
  auth: {
    user: process.env.EMAL_ADDRESS,
    pass: emailPass,
  },
})

export default async (req, res) => {
  const { senderMail, name, content, recipientMail } = req.body

  // Check if fields are all filled
  if (
    senderMail === '' ||
    name === '' ||
    contente === '' ||
    recipientMail === ''
  ) {
    res.status(403).send('')
    return
  }

  const mailerRes = await mailer({
    senderMail,
    name,
    text: content,
    recipientMail,
  })
  res.send(mailerRes)
}

const mailer = ({ senderMail, name, text, recipientMail }) => {
  const from =
    name && senderMail ? `${name} <${senderMail}>` : `${name || senderMail}`
  const message = {
    from,
    to: `${recipientMail}`,
    subject: `Nuovo messaggio da ${from}`,
    text,
    replyTo: from,
  }

  return new Promise((resolve, reject) => {
    transporter.sendMail(message, (error, info) =>
      error ? reject(error) : resolve(info)
    )
  })
}
