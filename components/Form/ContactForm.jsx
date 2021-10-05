import { useEffect, useRef, useState } from "react";
import clsx from "clsx";
import Link from "next/link";

import { sendContactMail } from "../../actions/networking/mailApi";

export default function ContactForm({ hasAutoFocus }) {
  const [form, setForm] = useState({
    name: "",
    mail: "",
    formContent: "",
  });
  const { name, mail, formContent } = form;

  const [isCheckedTerms, setIsCheckedTerms] = useState(false);
  const [isCheckedNewsletter, setIsCheckedNewsletter] = useState(false);
  const [formButtonDisabled, setFormButtonDisabled] = useState(false);
  const [notification, setNotification] = useState({
    text: "",
    isError: false,
  });

  const inputName = useRef(null);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm({
      ...form,
      [name]: value,
    });
  };

  useEffect(() => {
    hasAutoFocus && inputName.current.focus();
  });

  useEffect(() => {
    if (isCheckedTerms && notification.text.includes("termini")) {
      setNotification({ text: "", isError: false });
    }
  }, [isCheckedTerms]);

  async function submitContactForm(event) {
    event.preventDefault();

    if (name === "" || mail === "" || formContent === "") {
      return setNotification({
        ...notification,
        text: "Per favore compila tutti i campi",
        isError: true,
      });
    }

    if (isCheckedTerms === false) {
      return setNotification({
        ...notification,
        text: "Non dimenticare di accettare i termini e le condizioni",
        isError: true,
      });
    }

    const res = await sendContactMail(name, mail, formContent);
    if (res.status < 300) {
      setFormButtonDisabled(true);
      setNotification({
        ...notification,
        text: "Grazie, ti ricontatteremo al più presto",
        isError: false,
      });
      setForm({ ...form, name: "", mail: "", formContent: "" });
      setIsCheckedTerms(false);
    } else {
      setNotification({
        ...notification,
        text: "Per favore compila tutti i campi",
        isError: true,
      });
    }
  }
  return (
    <>
      <form
        className="flex-auto space-y-8 p-2 lg:p-8"
        onSubmit={submitContactForm}
      >
        <h4 className="text-2xl font-semibold">
          Hai un&apos;idea che vorresti realizzare, o hai bisogno di
          informazioni?
        </h4>
        <p className="mt-1 mb-4 leading-relaxed text-gray-500">
          Completa questo form, ti risponderemo entro 24 ore (escluso festivi)
        </p>
        <div className="relative w-full ">
          <label
            className="block mb-2 text-xs font-bold text-gray-600 uppercase"
            htmlFor="full-name"
          >
            Nome Completo
          </label>
          <input
            type="text"
            className="w-full px-3 py-3 text-sm text-gray-600 placeholder-gray-300 transition-all duration-150 ease-linear bg-white border-0 rounded shadow focus:outline-none focus:ring"
            placeholder="Nome Completo"
            name="name"
            value={name}
            onChange={handleChange}
            ref={inputName}
          />
        </div>

        <div className="relative w-full ">
          <label
            className="block mb-2 text-xs font-bold text-gray-600 uppercase"
            htmlFor="email"
          >
            Email
          </label>
          <input
            type="email"
            className="w-full px-3 py-3 text-sm text-gray-600 placeholder-gray-300 transition-all duration-150 ease-linear bg-white border-0 rounded shadow focus:outline-none focus:ring"
            placeholder="Email"
            name="mail"
            value={mail}
            onChange={handleChange}
          />
        </div>

        <div className="relative w-full ">
          <label
            className="block mb-2 text-xs font-bold text-gray-600 uppercase"
            htmlFor="messaggio"
          >
            Messaggio
          </label>
          <textarea
            rows="4"
            cols="80"
            className="w-full px-3 py-3 text-sm text-gray-600 placeholder-gray-300 bg-white border-0 rounded shadow focus:outline-none focus:ring"
            placeholder="Scrivi la tua richiesta..."
            name="formContent"
            value={formContent}
            onChange={handleChange}
          />
        </div>
        <div className="mt-6 text-center">
          <button
            className="inline-flex px-4 py-2 text-sm font-medium text-white rounded transition-all duration-150 ease-linear bg-gradient-to-tl from-green-400 to-blue-500 active:from-blue-500 active:to-green-400 disabled:from-green-300 disabled:to-blue-300 disabled:pointer-events-none"
            type="submit"
            disabled={formButtonDisabled}
          >
            Invia
          </button>
        </div>
        <div className="mt-5 text-right text-gray-600">
          <label className="inline-flex items-center flex-end w-full">
            <input
              type="checkbox"
              className="text-yellow-600 border-2 border-gray-400 border-solid cursor-pointer form-checkbox"
              name="conditions"
              checked={isCheckedTerms}
              onChange={() => setIsCheckedTerms(!isCheckedTerms)}
            />
            <span className="ml-2 text-xs">
              accetto il{" "}
              <Link href="/privacy-policy">
                <a className="text-yellow-600" target="_blank">
                  trattamento dei dati e condizioni
                </a>
              </Link>
            </span>
            *
          </label>
          {/* <label className="inline-flex items-center flex-end w-full"> */}
          {/*   <input */}
          {/*     type="checkbox" */}
          {/*     className="text-yellow-600 border-2 border-gray-400 border-solid cursor-pointer form-checkbox" */}
          {/*     name="newsletter" */}
          {/*     checked={isCheckedNewsletter} */}
          {/*     onChange={() => setIsCheckedNewsletter(!isCheckedNewsletter)} */}
          {/*   /> */}
          {/*   <span className="ml-2 text-xs"> */}
          {/*     voglio rimanere aggiornato su novità e promozioni */}
          {/*   </span> */}
          {/* </label> */}
        </div>
        <div className="mt-5 text-right text-gray-600"></div>
      </form>
      <div
        className={clsx(
          "px-4 mb-8 text-center",
          notification.isError ? "text-red-700" : "text-green-700"
        )}
      >
        {notification.text}
      </div>
    </>
  );
}
