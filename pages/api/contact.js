import nodemailer from 'nodemailer'

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

const sendMail = async (req, res) => {
  const {
    senderMail,
    ragione_sociale,
    referente,
    surname,
    tel,
    participants,
    formContent,
    company,
    indirizzo,
    recipientMail,
    title,
  } = req.body

  // Check if fields are all filled
  if (referente === '' || recipientMail === '') {
    res.status(403).send('')
    return
  }

  if (referente === '' && tel === '') {
    res.status(403).send('')
    return
  }

  // let content =
  //   typeof formContent === undefined
  //     ? `partecipanti: ${participants}`
  //     : `messaggio: ${formContent}`;

  let content = formContent
    ? `messaggio: ${formContent}`
    : `partecipanti: ${participants}`

  const mailerRes = await mailer({
    senderMail,
    referente: `${referente} ${surname}`,
    title,
    ragione_sociale,
    text: `Nome (referente): ${referente} ${surname || ''}\nRagione Sociale: ${
      company || ragione_sociale
    }\nIndirizzo: ${indirizzo}\nEmail: ${senderMail}\ntel: ${tel}\npartecipanti: ${participants}\nmessaggio: ${formContent}\n`,
    recipientMail,
  })
  res.send(mailerRes)
}

const mailer = ({
  senderMail,
  referente,
  title,
  ragione_sociale,
  text,
  recipientMail,
}) => {
  const fromReal =
    referente && senderMail
      ? `${referente} <${senderMail}>`
      : `${referente || senderMail}`
  const subject = title
    ? `Partecipazione per l'evento ${title} da ${fromReal}`
    : ragione_sociale
    ? `Richiesta assistenza da ${ragione_sociale}`
    : `Nuovo messaggio da ${fromReal}`
  const from = process.env.SENDGRID_ADDRESS
  const message = {
    from,
    to: ragione_sociale
      ? `${recipientMail}`
      : `gianni.matarrese@matarrese.it; pasquale.matarrese@matarrese.it`,
    subject,
    text,
    replyTo: fromReal,
  }

  return new Promise((resolve, reject) => {
    transporter.sendMail(message, (error, info) =>
      error ? reject(error) : resolve(info),
    )
  })
}

export default sendMail
