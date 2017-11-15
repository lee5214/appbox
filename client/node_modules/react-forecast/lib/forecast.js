import React, { PropTypes } from 'react';

let Forecast = (props) => {
  const { height, width, latitude, longitude, name, color, font, units } = props;

  const url = `http://forecast.io/embed/#lat=${latitude}&lon=${longitude}&name=${name}&color=${color}&font=${font}&units=${unit}`;

  return (
    <iframe type='text/html' height={height} width={width} frameBorder='0' src={url} />
  );
}

Forecast.propTypes = {
  height: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.number
  ]),
  width: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.number
  ]),
  latitude: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.number
  ]).isRequired,
  longitude: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.number
  ]).isRequired,
  name: PropTypes.string,
  color: PropTypes.string,
  font: PropTypes.string,
  units: PropTypes.string,
};

Forecast.defaultProps = {
  height: 245,
  width: '100%',
  name: '',
  color: '',
  font: '',
  units: ''
}

export default Forecast;
