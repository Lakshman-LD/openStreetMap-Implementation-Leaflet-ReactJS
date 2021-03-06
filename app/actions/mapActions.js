import fetch from 'isomorphic-fetch';

export const STORE_SOURCE = 'STORE_SOURCE';
export const STORE_DESTINATION = 'STORE_DESTINATION';
export const STORE_LATLNG = 'STORE_LATLNG';
export const STORE_SOURCE_LABEL = 'STORE_SOURCE_LABEL';
export const STORE_DESTINATION_LABEL = 'STORE_DESTINATION_LABEL';

export function storeSource(source) {
  return dispatch => {
    return dispatch({
      type: STORE_SOURCE,
      source: source
    });
  };
}

export function storeSourceLabel(sourceLabel) {
  return dispatch => {
    return dispatch({
      type: STORE_SOURCE_LABEL,
      sourceLabel: sourceLabel
    });
  };
}

export function storeDestinationLabel(destinationLabel) {
  return dispatch => {
    return dispatch({
      type: STORE_DESTINATION_LABEL,
      destinationLabel: destinationLabel
    });
  };
}

export function storeDestination(destination) {
  return dispatch => {
    return dispatch({
      type: STORE_DESTINATION,
      destination: destination
    });
  };
}

function receiveLatLng(latlngs) {
  return dispatch => {
    return dispatch({
      type: STORE_LATLNG,
      latlngs: latlngs
    });
  };
}

export function getShortestPath(source, destination) {
  return dispatch => {
    return fetch('/api/calculateShortestPath', {credentials: 'include',
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({'source' : source, 'destination' : destination})})
      .then(res => res.json())
      .then(json => dispatch(receiveLatLng(json)));
  };
}
