async function getGroups() {
  const API_KEY = process.env.MAILERLITE_API_KEY;

  const options = {
    method: "GET",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
      "Authorization": `Bearer ${API_KEY}`,
    },
  };

  const request = await fetch(
    "https://connect.mailerlite.com/api/groups",
    options,
  );

  const response = await request.json();

  return response.data.map((group) => {
    return { id: group.id, name: group.name };
  });
}

export { getGroups };
