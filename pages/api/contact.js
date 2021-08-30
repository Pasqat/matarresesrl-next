import nodemailer from "nodemailer";

const transporter = nodemailer.createTransport({
  service: "SendGrid",
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
});

// verify connection configuration
// transporter.verify(function (error, success) {
//   if (error) {
//     console.log(error)
//   } else {
//     console.log('Server is ready to take our messages')
//   }
// })

export default async (req, res) => {
  const {
    senderMail,
    name,
    surname,
    tel,
    participants,
    formContent,
    recipientMail,
    title,
  } = req.body;

  // Check if fields are all filled
  if (name === "" || recipientMail === "") {
    res.status(403).send("");
    return;
  }

  if (name === "" && tel === "") {
    res.status(403).send("");
    return;
  }

  console.log("type", typeof(formContent));
  console.log("content", formContent);

  // let content =
  //   typeof formContent === undefined
  //     ? `partecipanti: ${participants}`
  //     : `messaggio: ${formContent}`;

  let content = formContent ? `messaggio: ${formContent}` : `partecipanti: ${participants}`;

  const mailerRes = await mailer({
    senderMail,
    name: `${name} ${surname}`,
    title,
    text: `email: ${senderMail}\ntel: ${tel}\n${content}`,
    recipientMail,
  });
  res.send(mailerRes);
};

const mailer = ({ senderMail, name, title, text, recipientMail }) => {
  const fromReal =
    name && senderMail ? `${name} <${senderMail}>` : `${name || senderMail}`;
  const subject = title
    ? `Partecipazione per l'evento ${title} da ${fromReal}`
    : `Nuovo messaggio da ${fromReal}`;
  const from = process.env.SENDGRID_ADDRESS;
  const message = {
    from,
    to: `${recipientMail}`,
    subject,
    text,
    replyTo: fromReal,
  };

  return new Promise((resolve, reject) => {
    transporter.sendMail(message, (error, info) =>
      error ? reject(error) : resolve(info)
    );
  });
};
