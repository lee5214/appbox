export const SET_MODE = "SET_MODE";
export const SET_MOUSE_TRACK = "SET_MOUSE_TRACK";

const minimalWidth = 992;
export const setMode = mode => {
  if (window.innerWidth < minimalWidth) {
    return {
      type: SET_MODE,
      payload: "2D"
    };
  }
  return {
    type: SET_MODE,
    payload: mode
  };
};

export const setMouseTrack = (track = false) => {
  if (window.innerWidth < minimalWidth) {
    return {
      type: SET_MODE,
      payload: false
    };
  }
  return {
    type: SET_MOUSE_TRACK,
    payload: track
  };
};
