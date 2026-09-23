import {useEffect, useRef, useState} from 'react'
import {Loader} from '@googlemaps/js-api-loader'

export default function Map() {
  const mapRef = useRef(null)
  const [unavailable, setUnavailable] = useState(false)
  useEffect(() => {
    let active = true
    const previousAuthFailure = window.gm_authFailure
    const fail = () => {
      if (active) setUnavailable(true)
    }
    window.gm_authFailure = fail
    const apiKey = process.env.NEXT_PUBLIC_MAPS_API
    if (!apiKey) fail()
    else {
      const loader = new Loader({
        apiKey,
        version: 'weekly',
        libraries: ['marker'],
      })
      Promise.all([
        loader.importLibrary('maps'),
        loader.importLibrary('marker'),
      ])
        .then(([{Map: GoogleMap}, {AdvancedMarkerElement}]) => {
          if (!active || !mapRef.current) return
          const position = {lat: 40.791522, lng: 17.2448473}
          const map = new GoogleMap(mapRef.current, {
            mapId:
              process.env.NEXT_PUBLIC_MAPS_ID || '8513f02641727d0d16e6a183',
            zoom: 15,
            center: position,
            scrollwheel: false,
          })
          new AdvancedMarkerElement({map, position, title: 'Matarrese srl'})
        })
        .catch(fail)
    }
    return () => {
      active = false
      window.gm_authFailure = previousAuthFailure
    }
  }, [])
  return (
    <div className="absolute inset-0">
      <div
        ref={mapRef}
        className="h-full w-full"
        hidden={unavailable}
        aria-label="Mappa dello showroom Matarrese"
      />
      {unavailable && (
        <div className="map-fallback">
          <p className="page-intro">Ci trovi ad Alberobello</p>
          <h2>Vieni a trovarci.</h2>
          <p>Contrada Popoleto, n.c.</p>
          <a
            className="site-button"
            href="https://www.google.com/maps/search/?api=1&query=Matarrese+srl+Alberobello"
            target="_blank"
            rel="noreferrer"
          >
            Apri le indicazioni su Google Maps
          </a>
        </div>
      )}
    </div>
  )
}
