import Link from 'next/link'
import * as React from 'react'
// import {formatDate} from '../actions/utils/formatDate'
import FormModal from '../components/Form/FormModal'
import {Button, ButtonLink} from './button'

function RegistrationPanel({event, pastEvent, modal}) {
  // const startDate = formatDate(event.startDate)
  // const endDate = formatDate(event.endDate)
  const startDate = event.startDate
  const endDate = event.endDate

  return (
    <div
      id="register"
      className="bg-secondary flex w-full flex-col items-stretch rounded-lg px-10 pb-10 pt-12 lg:flex-row-reverse lg:items-center lg:justify-end lg:py-8"
    >
      <div className="mb-10 lg:mb-0 lg:ml-16">
        <Link href={`/eventi/${event.slug}`}>
          <a>
            <h5 className="text-2xl font-medium text-black">{event.title}</h5>
          </a>
        </Link>
        {startDate === endDate ? (
          <p>{startDate}</p>
        ) : (
          <p>
            {startDate} - {endDate}
          </p>
        )}
      </div>
      {pastEvent ? null : modal ? (
        <FormModal
          withButton
          buttonText="Partecipa"
          type="reservation"
          title={event.title}
        />
      ) : (
        <Button>
          <Link href={`eventi/${event.slug}`}>Partecipa</Link>
        </Button>
      )}
    </div>
  )
}

export {RegistrationPanel}
