import React from 'react';
import { getLocalToken, setLocalToken } from '../lib/token.js';

//step 1: fetch data and use saved token: do I use setLocalToken()?
export const fetchList = token => {
  let db = fb.firestore();
  db.collection(setLocalToken())
    .doc('itemName')
    .get()
    .then(doc => {
      console.log(doc.data());
    });
};

//step 2: map over data and push into empty array

//step 3: create method to check for duplication

//step 4: onSubmit in AddItem must have an alert
