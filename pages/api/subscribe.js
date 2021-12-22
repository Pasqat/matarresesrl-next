import MailerLite from 'mailerlite-api-v2-node'

const mailerLite = MailerLite(process.env.MAILERLITE_API)

export default async (req,res) => {
  const { email } = req.body
}
