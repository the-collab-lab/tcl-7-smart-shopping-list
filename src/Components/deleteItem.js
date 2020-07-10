import React from 'react';
import '../App.css';
import '../assets/main.css';
import { fb } from '../lib/firebase';
import { getLocalToken } from '../lib/token.js';

function DeleteItem({ id }) {
  const close = () => {
    const confirmed = window.confirm('Do you want to really delete?');
    if (!confirmed) {
      return;
    }

    const db = fb.firestore();
    const collection = db.collection(getLocalToken());

    collection
      .doc(id)
      .delete()
      .then(function() {
        console.log('Document successfully deleted!');
        console.log('I am deleted', id);
      })
      .catch(function(error) {
        console.error('Error removing document: ', error);
      });
  };

  return (
    <button
      cursor="pointer"
      type="button"
      className="float-right font-body text-sm select-none inline-block leading-tight px-2 py-1 rounded no-underline bg-gray-200 shadow hover:bg-gray-300"
      onClick={close}
    >
      {' '}
      X{' '}
    </button>
  );
}

export default DeleteItem;
