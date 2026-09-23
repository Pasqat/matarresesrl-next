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
    <div className="event-row">
      <div className="event-row-copy">
        <Link href={`/eventi/${event.slug}`}>
          <h3 className="text-2xl font-medium text-black">{event.title}</h3>
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
        <ButtonLink href={`/eventi/${event.slug}`}>Partecipa</ButtonLink>
      )}
    </div>
  )
}

export {RegistrationPanel}
