/* eslint-disable no-console */
import axios from 'axios';
import {
  NEW_FIELD_VISIT, SUBMIT_LOCATION, UPDATE_ENTRY, SAVE_SURVEY,
} from './actionTypes';

// creek_name: string, team_lead: string, team_members: string[]
// eslint-disable-next-line import/prefer-default-export
export const initializeFieldVisit = (creekName, teamLead, teamMembers) => (dispatch) => {
  const volunteers = {
    creekName,
    teamLead,
    teamMembers,
  };
  return dispatch({
    type: NEW_FIELD_VISIT,
    payload: {
      volunteersId: "123456",
      creek_name: creekName,
      team_lead: teamLead,
      team_members: teamMembers,
      started_at: "A few minutes ago",
    },
  });
  // console.log('about to make axios call')
  // axios.post('http://localhost:3001/saveVolunteers', volunteers)
  //   .then((response) => {
  //     console.log('response', response.data);
  //     return dispatch({
  //       type: NEW_FIELD_VISIT,
  //       payload: {
  //         volunteersId: response.data.volunteersId,
  //         creek_name: creekName,
  //         team_lead: teamLead,
  //         team_members: teamMembers,
  //         started_at: response.data.startedAt,
  //       },
  //     });
  //   })
  //   .catch((error) => console.log(error));
};

export const submitLocation = (coordinates) => (dispatch) => dispatch({
  type: SUBMIT_LOCATION,
  payload: coordinates,
});
// export const storeLocation (location) => dispatch => {
//   return dispatch({
//     type: STORE_LOCATION,
//     payload: location,
//   })
// }

import { Platform, AsyncStorage } from 'react-native';
import {
  CREATE_PIN,
  CREATE_VISIT,
  UPDATE_PIN,
  UPDATE_VISIT,
  REMOVE_PIN,
  REMOVE_VISIT,
  COMPLETE_PIN,
} from './actionTypes';
import { defaultVolunteer, defaultPin } from '../defaultState';

export const createFieldVisit = (location) => (dispatch) => {
  const fieldVisit = defaultVolunteer;
  fieldVisit.start_location = location;
  return dispatch({
    type: CREATE_VISIT,
    payload: fieldVisit,
  });
};

export const updateFieldVisit = (fieldVisit) => (dispatch) => dispatch({
  type: UPDATE_VISIT,
  payload: fieldVisit,
});

// on logout
export const removeVisit = () => async (dispatch) => {
  let LocalStorage;
  if (Platform.OS === 'android') {
    LocalStorage = AsyncStorage;
  } else {
    LocalStorage = window.localStorage;
  }
  try {
    await LocalStorage.removeItem('fieldVisit');
    return dispatch({
      type: REMOVE_VISIT,
      payload: true,
    });
  } catch (error) {
    return error;
  }
};

export const createPin = (location) => async (dispatch) => {
  const pin = defaultPin;
  pin.location = location;
  return dispatch({
    type: CREATE_PIN,
    payload: pin,
  });
};

export const updatePin = (pin) => async (dispatch) => dispatch({
  type: UPDATE_PIN,
  payload: pin,
});

export const completePin = (pin) => (dispatch) => dispatch({
  type: COMPLETE_PIN,
  payload: pin,
});

// on logout
export const removePin = () => async (dispatch) => {
  let LocalStorage;
  if (Platform.OS === 'android') {
    LocalStorage = AsyncStorage;
  } else {
    LocalStorage = window.localStorage;
  }
  try {
    await LocalStorage.removeItem('pin');
    return dispatch({
      type: REMOVE_PIN,
      payload: true,
    });
  } catch (error) {
    return error;
  }
};

