import React from 'react';
import {
  StaticGoogleMap,
  Marker,
  Direction
} from 'react-static-google-map';

const MapCard = ({ resAddress, cusAddress }) => {
  return resAddress && cusAddress ? (
    <StaticGoogleMap size="350x350" apiKey={process.env.REACT_APP_API_KEY}>
      <Marker location={resAddress} color="green" label="S" />
      <Marker location={cusAddress} color="red" label="E" />
      <Direction
        weight="5"
        origin={resAddress}
        destination={cusAddress}
      />
    </StaticGoogleMap>
  ) : null;
};

export default MapCard;
