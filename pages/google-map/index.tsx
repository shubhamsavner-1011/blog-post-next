// import { useMemo } from "react";
// import { GoogleMap, useLoadScript, Marker } from "@react-google-maps/api";


// export default function Google() {
//   const { isLoaded } = useLoadScript({
//     googleMapsApiKey: process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY || '',
//   });

//   if (!isLoaded) return <div>Loading...</div>;
//   return (
//     <>
//     <h1>Google Map</h1>

//     <Map />
//     </>
//   )
// }

// function Map() {
//   const center = useMemo(() => ({ lat: 44, lng: -80 }), []);

//   return (
//     <GoogleMap zoom={10} center={center} mapContainerClassName="map-container">
//       <Marker position={center} />
//     </GoogleMap>
//   );
// }


const Google = () => {
  return (
    <div>Google Map</div>
  )
}

export default Google