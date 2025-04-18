import React from 'react';
import useGeolocation from './useGeolocation';

const GeolocationComponent = () => {
  const { location, error } = useGeolocation();

  return (
    <div>
      <h2>Geolocation</h2>
      {error && <p>{error}</p>}
      {location ? <p>Lat: {location.lat}, Lon: {location.lon}</p> : <p>Getting location...</p>}
    </div>
  );
};

export default GeolocationComponent;
