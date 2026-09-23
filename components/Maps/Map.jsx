import React from 'react'
import {Loader} from '@googlemaps/js-api-loader'


const MAPS_API = process.env.NEXT_PUBLIC_MAPS_API
const MAPS_ID = process.env.NEXT_PUBLIC_MAPS_ID || '8513f02641727d0d16e6a183'

function MapExample() {
  const mapRef = React.useRef(null)

  React.useEffect(() => {
    const loader = new Loader({
      apiKey: MAPS_API,
      version: 'weekly',
      libraries: ['marker'],
    })

    const mapOptions = {
      mapId: MAPS_ID,
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

    loader
      .importLibrary('maps')
      .then(() => loader.importLibrary('marker'))
      .then(() => {
        map = new window.google.maps.Map(mapRef.current, mapOptions);

        // AdvancedMarkerElement (nuovo marker API)
        const { AdvancedMarkerElement } = window.google.maps.marker;
        const marker = new AdvancedMarkerElement({
          map,
          position: { lat: 40.791522, lng: 17.2448473 },
          title: 'Matarrese srl',
        });

        const contentString =
          '<div class="text-md font-bold"><h2>Matarrese srl</h2>' +
          '<hr/><p>vieni a trovarci!</p></div>';

        const infowindow = new window.google.maps.InfoWindow({
          content: contentString,
        });

        marker.addListener('click', () => {
          infowindow.open({ anchor: marker, map });
        });
      })
      .catch((error) => {
        // Notify the user if the API fails to load
        if (mapRef.current) {
          mapRef.current.innerHTML =
            '<div style="color:red;text-align:center;padding:1em;">Failed to load Google Maps. Please try again later.</div>';
        }
        // Optionally log the error
        console.error('Google Maps API failed to load:', error);
      });
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
