import { Fragment, useEffect, useState } from "react";
import Link from "next/link";

import { Dialog, Transition } from "@headlessui/react";
import { ChatIcon } from "@heroicons/react/outline";
import clsx from "clsx";

import { sendContactMail } from "../../actions/networking/mailApi";

/**
 * @param buttonText default "Contattaci"
 *
 * @param {string} buttonClassName default: "px-4 py-2 text-sm text-white bg-yellow-600 hover:bg-yellow-500"
 * if it is falsy the button will have a `ChatIcon` and will be centered in a div
 *
 * @param {string} type "contacts" | "reservation"
 *
 * @param {stirng} title usefull to pass event title to the email subject
 */
export default function FormModal({
  buttonText = "Contattaci",
  buttonClassName,
  type = "contacts",
  title = null,
}) {
  let [isOpen, setIsOpen] = useState(false);
  const [form, setForm] = useState({
    name: "",
    surname: "",
    mail: "",
    tel: "",
    formContent: "",
    participants: null,
  });
  const { name, surname, mail, tel, formContent, participants } = form;
  const [isChecked, setIsChecked] = useState(false);

  const [formButtonDisabled, setFormButtonDisabled] = useState(false);
  const [notification, setNotification] = useState({
    text: "",
    isError: false,
  });

  function closeModal() {
    setIsOpen(false);
  }

  function openModal() {
    setIsOpen(true);
  }

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm({
      ...form,
      [name]: value,
    });
  };

  useEffect(() => {
    setFormButtonDisabled(false);
    setForm((form) => ({ ...form, name: "", surname: "", mail: "", tel: "" }));
    setIsChecked(false);
    setNotification({ text: "", isError: false });
  }, [isOpen]);

  useEffect(() => {
    if (isChecked && notification.text.includes("termini")) {
      setNotification({ text: "", isError: false });
    }
  }, [isChecked, notification.text]);

  async function submitContactForm(event) {
    event.preventDefault();

    if (name === "" || surname === "") {
      return setNotification({
        ...notification,
        text: "Per favore compila tutti i campi",
        isError: true,
      });
    }

    if (type === "reservation") {
      if (typeof participants === null || participants === "") {
        return setNotification({
          ...notification,
          text: "Per favore compila tutti i campi",
          isError: true,
        });
      }
    }

    if (type !== "reservation") {
      if (formContent === "") {
        return setNotification({
          ...notification,
          text: "Per favore compila tutti i campi",
          isError: true,
        });
      }
    }

    if (mail === "" && tel === "") {
      return setNotification({
        ...notification,
        text: "Per favore inserisci un numero valido o una email valida",
        isError: true,
      });
    }

    if (!isChecked) {
      return setNotification({
        ...notification,
        text: "Non dimenticare di accettare i termini e le condizioni",
        isError: true,
      });
    }

    const res = await sendContactMail(
      name,
      surname,
      mail,
      tel,
      formContent,
      participants,
      title
    );
    if (res.status < 300) {
      setFormButtonDisabled(true);
      setNotification({
        ...notification,
        text: "Grazie, ti ricontatteremo al più presto",
        isError: false,
      });
      setForm({
        ...form,
        name: "",
        surname: "",
        tel: "",
        mail: "",
        formContent: "",
        participants: "",
      });
      setIsChecked(false);
      setTimeout(() => {
        closeModal();
      }, 2000);
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
      <div
        className={clsx(
          buttonClassName ? null : "inset-0 flex items-center justify-center"
        )}
      >
        <button
          type="button"
          onClick={openModal}
          className={clsx(
            "font-medium rounded-sm focus:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-opacity-75",
            buttonClassName ??
              "px-4 py-2 text-sm text-white bg-yellow-600 hover:bg-yellow-500 "
          )}
        >
          {buttonClassName ? null : (
            <ChatIcon className="inline-block w-5 h-5 mr-1" />
          )}
          {buttonText}
        </button>
      </div>

      <Transition appear show={isOpen} as={Fragment}>
        <Dialog
          as="div"
          className="fixed inset-0 z-[51] overflow-y-auto bg-black bg-opacity-60"
          onClose={closeModal}
        >
          <div className="min-h-screen px-4 text-center">
            <Transition.Child
              as={Fragment}
              enter="ease-out duration-300"
              enterFrom="opacity-0"
              enterTo="opacity-100"
              leave="ease-in duration-200"
              leaveFrom="opacity-100"
              leaveTo="opacity-0"
            >
              <Dialog.Overlay className="fixed inset-0" />
            </Transition.Child>

            {/* This element is to trick the browser into centering the modal contents. */}
            <span
              className="inline-block h-screen align-middle"
              aria-hidden="true"
            >
              &#8203;
            </span>
            <Transition.Child
              as={Fragment}
              enter="ease-out duration-300"
              enterFrom="opacity-0 scale-95"
              enterTo="opacity-100 scale-100"
              leave="ease-in duration-200"
              leaveFrom="opacity-100 scale-100"
              leaveTo="opacity-0 scale-95"
            >
              <div className="inline-block w-full max-w-md p-10 my-8 overflow-hidden text-left align-middle transition-all transform bg-white shadow-xl rounded-2xl">
                {type === "contacts" ? (
                  <>
                    <Dialog.Title
                      as="h3"
                      className="text-lg font-medium leading-6 text-gray-900"
                    >
                      Hai un&apos;idea che vorresti realizzare, o hai bisogno di
                      informazioni?
                    </Dialog.Title>
                    <div className="mt-2">
                      <p className="text-sm text-gray-500">
                        Completa questo form, ti risponderemo entro 24 ore
                        (escluso festivi)
                      </p>
                    </div>
                  </>
                ) : (
                  <Dialog.Title
                    as="h3"
                    className="text-lg font-medium leading-6 text-gray-900"
                  >
                    {title}
                  </Dialog.Title>
                )}

                <form
                  className="flex-auto space-y-8 mt-8"
                  onSubmit={submitContactForm}
                >
                  <div className="grid grid-cols-2 gap-2 relative w-full">
                    <div className="w-full">
                      <label
                        className="block mb-2 text-xs font-bold text-gray-600 uppercase"
                        htmlFor="name"
                      >
                        Nome
                      </label>
                      <input
                        type="text"
                        className="w-full px-3 py-3 text-sm text-gray-600 placeholder-gray-300 transition-all duration-150 ease-linear bg-white border-0 rounded shadow focus:outline-none focus:ring"
                        placeholder="Nome"
                        name="name"
                        value={name}
                        onChange={handleChange}
                      />
                    </div>
                    <div className="w-full">
                      <label
                        className="block mb-2 text-xs font-bold text-gray-600 uppercase"
                        htmlFor="surname"
                      >
                        Cognome
                      </label>
                      <input
                        type="text"
                        className="w-full px-3 py-3 text-sm text-gray-600 placeholder-gray-300 transition-all duration-150 ease-linear bg-white border-0 rounded shadow focus:outline-none focus:ring"
                        placeholder="Cognome"
                        name="surname"
                        value={surname}
                        onChange={handleChange}
                      />
                    </div>
                  </div>
                  <div className="relative w-full">
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
                  <div className="relative w-full">
                    <label
                      className="block mb-2 text-xs font-bold text-gray-600 uppercase"
                      htmlFor="tel"
                    >
                      Telefono
                    </label>
                    <input
                      type="tel"
                      className="w-full px-3 py-3 text-sm text-gray-600 placeholder-gray-300 transition-all duration-150 ease-linear bg-white border-0 rounded shadow focus:outline-none focus:ring"
                      placeholder="Telefono"
                      name="tel"
                      value={tel}
                      onChange={handleChange}
                    />
                  </div>
                  {type === "reservation" ? (
                    <div className="relative w-full">
                      <label
                        className="block mb-2 text-xs font-bold text-gray-600 uppercase"
                        htmlFor="messaggio"
                      >
                        Numero Partecipanti
                      </label>
                      <input
                        type="number"
                        min="1"
                        className="w-full px-3 py-3 text-sm text-gray-600 placeholder-gray-300 transition-all duration-150 ease-linear bg-white border-0 rounded shadow focus:outline-none focus:ring"
                        placeholder="Numero partecipanti"
                        name="participants"
                        value={participants}
                        onChange={handleChange}
                      />
                    </div>
                  ) : (
                    <div className="relative w-full">
                      <label
                        className="block mb-2 text-xs font-bold text-gray-600 uppercase"
                        htmlFor="messaggio"
                      >
                        Message
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
                  )}
                  <div className="mt-5 text-right text-gray-600">
                    <label className="inline-flex items-center">
                      <input
                        type="checkbox"
                        className="text-yellow-600 border-2 border-gray-400 border-solid cursor-pointer form-checkbox"
                        name="conditions"
                        checked={isChecked}
                        onChange={() => setIsChecked(!isChecked)}
                      />
                      <span className="ml-2 text-sm">
                        accetto il{" "}
                        <Link href="/privacy-policy">
                          <a className="text-yellow-600" target="_blank">
                            trattamento dei dati e condizioni
                          </a>
                        </Link>
                      </span>
                    </label>
                  </div>
                  <div className="flex flex-wrap justify-between mt-6 text-center">
                    <div className="mt-4">
                      <button
                        type="button"
                        className="inline-flex justify-center px-4 py-2 text-sm text-red-600 bg-transparent border border-red-600 rounded-sm shadow-md focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-blue-500 hover:ring-2 hover:ring-offset-2 hover:ring-red-400"
                        onClick={closeModal}
                      >
                        Chiudi
                      </button>
                    </div>
                    <div className="mt-4">
                      <button
                        className="hover:ring-2 hover:ring-offset-2 hover:ring-green-400 inline-flex px-4 py-2 text-sm font-bold text-white bg-green-500 border border-transparent rounded-sm hover:bg-opacity-90 shadow-md focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-blue-500 disabled:bg-green-600 disabled:opacity-50 disabled:pointer-events-none active:bg-gray-600 "
                        type="submit"
                        disabled={formButtonDisabled}
                      >
                        Invia
                      </button>
                    </div>
                  </div>
                </form>
                <div
                  className={clsx(
                    "px-4 text-center",
                    notification.isError ? "text-red-700" : "text-green-700"
                  )}
                >
                  {notification.text}
                </div>
              </div>
            </Transition.Child>
          </div>
        </Dialog>
      </Transition>
    </>
  );
}
