import * as MediaLibrary from 'expo-media-library';
import firebase from 'firebase/app';
import { SAVE_PHOTO, SAVE_TO_ROLL } from './actionTypes';
import { firebaseClient } from '../../auth/firebaseClient';
import 'firebase/storage';

export const savePhotoToCameraRoll = (photo) => async (dispatch) => {
  const asset = await MediaLibrary.createAssetAsync(photo.uri);
  return dispatch({
    type: SAVE_TO_ROLL,
    payload: asset.uri,
  });
};

export const savePhotoToFB = (photo) => (dispatch) => {
  firebaseClient();
  // console.log(photo)
  const user = firebase.auth().currentUser;
  const storageRef = firebase.storage().ref();
  const filename = photo.uri.substring(photo.uri.lastIndexOf('/') + 1);
  const imageRef = storageRef.child(`${user.uid}.${Date.now()}.${filename}`);
  // const message = `data:image/jpg;base64, ${filename}`

  imageRef.putFile(filename).then((snapshot) => {
    console.log(snapshot);
    console.log('uploaded!');
  });

  // let URL = imageRef.getDownloadURL((url, error) => {
  //   if (error) console.log(error);
  //   else return url;
  // })

  // console.log(URL)
  return dispatch({
    type: SAVE_PHOTO,
    payload: true,
  });
};
