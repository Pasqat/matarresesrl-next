import Head from "next/head";

import { Fragment, useState } from "react";
import { Transition } from "@headlessui/react";
import clsx from "clsx";

import { XIcon } from "@heroicons/react/outline";

import ContactForm from "../../components/Form/ContactForm";
import Layout from "../../components/Layout";
import Map from "../../components/Maps/Map";
import Header from "../../components/Header/Header";
import Container from "../../components/Container";

export default function Contatti() {
  const [isOpen, setIsOpen] = useState(true);

  return (
    <>
      <Head>
        <title>Cantatti | Matarrese srl</title>
      </Head>
      <Layout>
        <Container>
          <Header>Contatti</Header>
          <section className="relative pb-10 text-gray-600 md:pb-52 body-font">
            <div className="flex flex-wrap mx-auto sm:flex-nowrap">
              <div className="relative flex items-end justify-start w-full min-h-[20rem] p-10 overflow-hidden bg-gray-300 rounded-lg lg:w-2/3 md:w-1/2 sm:mr-10">
                <Map />
                {/*
              <iframe
                width="100%"
                height="100%"
                className="absolute inset-0"
                scrolling="no"
                loading="lazy"
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d12082.632673991144!2d17.236210260625526!3d40.79152858268904!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x1347b28ac399465b%3A0xe5e7513c50d3197f!2sMatarrese%20Srl!5e0!3m2!1sit!2sit!4v1625668065795!5m2!1sit!2sit"
              ></iframe>
              */}

                <Transition
                  appear
                  show={isOpen}
                  as={Fragment}
                  enter="ease-out duration-300"
                  enterFrom="opacity-0 scale-95"
                  enterTo="opacity-100 scale-100"
                  leave="ease-in duration-200"
                  leaveFrom="opacity-100 scale-100"
                  leaveTo="opacity-0 scale-95"
                  className="relative flex flex-wrap w-full py-6 bg-white rounded shadow-md"
                >
                  <div
                    className={clsx(
                      !isOpen && "hidden",
                      "relative flex flex-wrap py-6 bg-white rounded shadow-md w-full"
                    )}
                  >
                    <XIcon
                      className="absolute w-5 h-5 ml-auto cursor-pointer right-2 top-2"
                      onClick={() => setIsOpen(!isOpen)}
                    />
                    <div className="px-6 lg:w-1/2">
                      <h2 className="text-xs font-semibold tracking-widest text-gray-900 title-font">
                        INDIRIZZO
                      </h2>
                      <p className="mt-1">
                        contrada popoleto,n.c. {"\n"} Alberobello (BA) 70011
                      </p>
                    </div>
                    <div className="px-6 mt-4 lg:w-1/2 lg:mt-0">
                      <h2 className="text-xs font-semibold tracking-widest text-gray-900 title-font">
                        EMAIL
                      </h2>
                      <a
                        className="leading-relaxed text-yellow-500"
                        href="mailto:matarrese@matarrese.it"
                      >
                        matarrese@matarrese.it
                      </a>
                      <h2 className="mt-4 text-xs font-semibold tracking-widest text-gray-900 title-font">
                        TELEFONO
                      </h2>
                      <p className="leading-relaxed">+39 080 4323 431</p>
                    </div>
                  </div>
                </Transition>
                <div
                  onClick={() => setIsOpen(!isOpen)}
                  className={clsx(
                    isOpen && "hidden",
                    "ring-8 ring-black ring-opacity-50 text-2xl absolute rounded-full w-10 h-10 bg-yellow-400 text-white flex justify-center items-center cursor-pointer font-bold shadow-md hover:shadow-lg "
                  )}
                >
                  +
                </div>
              </div>
              <div className="flex flex-col w-full mt-8 bg-white lg:w-1/3 md:w-1/2 md:ml-auto md:py-8 md:mt-0">
                <ContactForm />
                {/* TODO: aggingungere termini e condizioni */}
              </div>
            </div>
          </section>
        </Container>
      </Layout>
    </>
  );
}
