import React from 'react'
import {Loader} from '@googlemaps/js-api-loader'

const MAPS_API = process.env.NEXT_PUBLIC_MAPS_API

function MapExample() {
  const mapRef = React.useRef(null)

  React.useEffect(() => {
    const loader = new Loader({
      apiKey: MAPS_API,
      version: 'weekly',
    })

    const mapOptions = {
      zoom: 15,
      center: {lat: 40.788, lng: 17.2448473},
      scrollwheel: false,
      zoomControl: true,
      styles: [
        {
          featureType: 'administrative',
          elementType: 'labels.text.fill',
          stylers: [{color: '#444444'}],
        },
        {
          featureType: 'landscape',
          elementType: 'all',
          stylers: [{color: '#f2f2f2'}],
        },
        {
          featureType: 'landscape.man_made',
          elementType: 'geometry',
          stylers: [
            {hue: '#aaffaa'},
            {saturation: -80},
            {lightness: -5},
            {visibility: 'on'},
          ],
        },
        {
          featureType: 'poi',
          elementType: 'all',
          stylers: [{visibility: 'off'}],
        },
        {
          featureType: 'road',
          elementType: 'all',
          stylers: [{saturation: -50}, {lightness: 45}],
        },
        {
          featureType: 'road.highway',
          elementType: 'all',
          stylers: [{visibility: 'simplified'}],
        },
        {
          featureType: 'road.arterial',
          elementType: 'labels.icon',
          stylers: [{visibility: 'on'}],
        },
        {
          featureType: 'transit',
          elementType: 'all',
          stylers: [{visibility: 'off'}],
        },
        {
          featureType: 'water',
          elementType: 'all',
          stylers: [{color: '#cbd5e0'}, {visibility: 'on'}],
        },
      ],
    }

    let map
    // let lat = '40.791522'
    // let lng = '17.2448473'

    loader.load().then(() => {
      // const myLatlng = new google.maps.LatLng(lat, lng)
      map = new window.google.maps.Map(mapRef.current, mapOptions)

      const marker = new window.google.maps.Marker({
        position: {lat: 40.791522, lng: 17.2448473},
        map: map,
        animation: window.google.maps.Animation.DROP,
        title: 'Matarrese srl',
      })

      const contentString =
        '<div class="text-md font-bold"><h2>Matarrese srl</h2>' +
        '<hr/><p>vieni a trovarci!</p></div>'

      const infowindow = new window.google.maps.InfoWindow({
        content: contentString,
      })

      window.google.maps.event.addListener(marker, 'click', function () {
        infowindow.open(map, marker)
      })
    })
  }, [])
  return (
    <>
      <div className="absolute inset-0 h-full w-full rounded">
        <div className="h-full rounded" ref={mapRef} />
      </div>
    </>
  )
}

export default MapExample
