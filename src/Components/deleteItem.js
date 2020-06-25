import React from 'react';
import '../App.css';
import { fb } from '../lib/firebase';
import { getLocalToken } from '../lib/token.js';
import { Button } from 'react-bootstrap';

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
    <Button
      variant="outline-info"
      size="sm"
      className="float-right"
      onClick={close}
    >
      X
    </Button>
  );
}

export default DeleteItem;
