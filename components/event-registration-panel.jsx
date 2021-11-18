import * as React from 'react'
import {formatDate} from '../actions/utils/formatDate'
import FormModal from '../components/Form/FormModal'

function RegistrationPanel({event}) {
  const startDate = formatDate(event.startDate)
  const endDate = formatDate(event.endDate)

  return (
    <div
      id="register"
      className="bg-secondary flex flex-col items-stretch pb-10 pt-12 px-10 w-full rounded-lg lg:flex-row-reverse lg:items-center lg:justify-end lg:py-8"
    >
      <div className="mb-10 lg:mb-0 lg:ml-16">
        <h5 className="text-black text-2xl font-medium">{event.title}</h5>
        {startDate === endDate ? (
          <p>{startDate}</p>
        ) : (
          <p>
            {startDate} - {endDate}
          </p>
        )}
      </div>
      <FormModal
        buttonText="Partecipa"
        type="reservation"
        title={event.title}
      />
    </div>
  )
}

export {RegistrationPanel}
//               <CardEvent
//                 title={event.title}
//                 slug={event.slug}
//                 id={event.id}
//                 startDate={event.startDate}
//                 endDate={event.endDate}
//                 excerpt={event.excerpt}
//                 venue={event.venue}
//                 coverImage={event.featuredImage?.node}
//               />
