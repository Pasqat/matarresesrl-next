async function getGroups() {
  const API_KEY = process.env.MAILERLITE_API_KEY

  const options = {
    method: 'GET',
    headers: {
      Accept: 'application/json',
      'X-MailerLite-ApiDocs': 'true',
      'X-MailerLite-ApiKey': API_KEY,
    }
  };

  const response = await fetch('https://api.mailerlite.com/api/v2/groups?limit=100&offset=0&filters=null', options);

  const data = await response.json();
  return data.map(group => { return { id: group.id, name: group.name } })
}

export { getGroups }
