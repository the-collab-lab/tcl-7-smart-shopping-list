import { getToken } from './tokenGenerator';

// added setLocalToken, hasLocalToken, getLocalToken

// Checks the local storage to see if it has a property with the key 'token' returns string value else null
export function getLocalToken() {
  return window.localStorage.getItem('token');
}

// Checks to see if 'token' exists and returns boolean
export function hasLocalToken() {
  return !!getLocalToken();
}

// Sets token in local storage
export function setLocalToken() {
  const token = getToken();
  const myStorage = window.localStorage;
  myStorage.setItem('token', token);
}
