/**
 * @description Reducer for server data
 */

import * as types from '../actions/actionTypes';

const initialState = {
  servers: (window.localStorage.store ? JSON.parse(window.localStorage.store).servers : {}),
};

const serversReducer = (state = initialState, action: any) => {
  switch (action.type) {
    case types.CREATE_SERVER: {

    
      ///PERSISTENT SERVER CONFIGS
      //deep copy of state, map over it to set STOPPED, save on local storage
      let data = JSON.parse(JSON.stringify({...state, servers: {...state.servers,[action.payload.id]: {...action.payload,},},}))
      Object.values(data.servers).map((value: any) => value.status = "STOPPED")
      window.localStorage.setItem("store", JSON.stringify(data))
      console.log("Local Storage: ", data)

      return {
        ...state,
        servers: {
          ...state.servers,
          [action.payload.id]: {
            ...action.payload,
          },
        },
      };
    }
    case types.UPDATE_SERVER_STATE: {
      return {
        ...state,
        servers: {
          ...state.servers,
          [action.payload.id]: {
            ...action.payload,
          },
        },
      };
    }
    case types.SET_CURRENT_EVENT: {
      const currentEvent = action.payload;
      return { ...state, currentEvent };
    }
    default: {
      return state;
    }
  }
};

export default serversReducer;
