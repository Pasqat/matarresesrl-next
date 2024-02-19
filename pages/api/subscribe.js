const API_KEY = process.env.MAILERLITE_API_KEY;

export default async (req, res) => {
  const { email, name, groupId, company } = req.body;

  // see mailerlite docs for more info
  const options = {
    method: "POST",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
      "Authorization": `Bearer ${API_KEY}`,
    },
    body: JSON.stringify({
      email: email,
      fields: { name: name, company: company },
      groups: [groupId],
      resubscribe: true,
      autoresponders: true,
      type: null,
    }),
  };

  if (!email) {
    return res.status(400).json({ error: "Email is required" });
  }

  try {
    const response = await fetch(
      "https://connect.mailerlite.com/api/subscribers",
      options,
    );
    const parsed = await response.json(); //json method returns a Promise!

    const {
      status,
    } = response;

    if (status >= 200 && status < 300) {
      return res.status(201).json({
        message: `${parsed.data.email} Iscrizione avvenuta con successo`,
      });
    }

    if (status > 421) {
      return res.status(500).json({
        error: "L'indirizzo e-mail inserito non è valido.",
      });
    }

    throw new Error(parsed);
  } catch (error) {
    console.log(error);
    return res.status(500).json({ error: error.message || error.toString() });
  }
};
