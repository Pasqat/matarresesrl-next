import axios from "axios";

const recipientMail = () => {
  return process.env.NEXT_PUBLIC_SEND_MAIL_TO;
};


export const sendContactMail = async (name, senderMail, content) => {
  const data = {
    recipientMail: recipientMail(),
    name,
    senderMail,
    content,
  };

  try {
    const res = await axios({
      method: "post",
      url: "/api/contact",
      headers: {
        "Content-Type": "application/json",
      },
      data,
    });
    return res;
  } catch (error) {
    console.log(error);
    return error;
  }
};
