import nodemailer from 'nodemailer'

console.log('host', process.env.SENDGRID_HOST)
console.log('adderess', process.env.SENDGRID_ADDRESS)
console.log('password', process.env.SENDGRID_PASSWORD)

const transporter = nodemailer.createTransport({
  service: 'SendGrid',
  host: process.env.SENDGRID_HOST,
  port: 587,
  secure: false, // use TLS
  auth: {
    user: process.env.SENDGRID_USERNAME,
    pass: process.env.SENDGRID_PASSWORD,
  },
  tls: {
    // do not fail on invalid certs
    rejectUnauthorized: false,
  },
})

// verify connection configuration
// transporter.verify(function (error, success) {
//   if (error) {
//     console.log(error)
//   } else {
//     console.log('Server is ready to take our messages')
//   }
// })

export default async (req, res) => {
  const { senderMail, name, content, recipientMail } = req.body

  // Check if fields are all filled
  if (
    senderMail === '' ||
    name === '' ||
    content === '' ||
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
  //   const from =
  //     name && senderMail ? `${name} <${senderMail}>` : `${name || senderMail}`
  const from = process.env.SENDGRID_ADDRESS
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
