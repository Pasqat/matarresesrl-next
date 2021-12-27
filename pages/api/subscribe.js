const API_KEY = process.env.MAILERLITE_API_KEY

export default async (req, res) => {
  const {email, name, groupId} = req.body

  // see mailerlite docs for more info
  const options = {
    method: 'POST',
    headers: {
      Accept: 'application/json',
      'X-MailerLite-ApiDocs': 'true',
      'Content-Type': 'application/json',
      'X-MailerLite-ApiKey': API_KEY,
    },
    body: JSON.stringify({
      email: email,
      name: name,
      // fields: {company: 'string', city: 'string'},
      resubscribe: true,
      autoresponders: true,
      type: null,
    }),
  }

  if (!email) {
    return res.status(400).json({error: 'Email is required'})
  }

  fetch(
    `https://api.mailerlite.com/api/v2/groups/${groupId}/subscribers`,
    options,
  )
    .then(response => response.json())
    .then(response => {
      return res.status(201).json({
        message: `${response.email} Iscrizione avvenuta con successo`,
      })
    })
    .catch(error => {
      return res.status(500).json({error: error.message || error.toString()})
    })
}
