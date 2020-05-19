import React from 'react';
import { fb } from '../lib/firebase';


export function hasList(token) {
    const db = fb.firestore();
    const collectionReference = db.collection(token)
    collectionReference
      .get()
      .then(
        function(querySnapshot) {
          if (querySnapshot.empty) {
            return false
          } else {
            console.log('here');
            return true
          }
         }
      )
  }