import React from 'react';
import '../App.css';
import { useParams } from 'react-router-dom';
import { fb } from '../lib/firebase';
import { getLocalToken } from '../lib/token.js';

function ItemDetailPage() {
  let { docId } = useParams();
  let item;

  const db = fb.firestore();
  // test docId is ShD6aFa48RPzE7N9UazC
  const docRef = db.collection(getLocalToken()).doc(docId);
  docRef
    .get()
    .then(function(doc) {
      if (doc.exists) {
        item = doc.data();
      } else {
        // doc.data() will be undefined in this case
        console.log('No such document!');
      }
    })
    .catch(function(error) {
      console.log('Error getting document:', error);
    });

  return (
    <div className="shadow bg-white pa2">
      <h1 className="b f1">{item.itemName}</h1>
      <ul className="f5 gray">
        <li>Last purchase date: {item.lastPurchaseDate}</li>
        <li>
          Estimated number of days until the next purchase:{' '}
          {item.purchaseFrequency}
        </li>
        <li>
          Number of times the item has been purchase: {item.numberOfPurchases}
        </li>
      </ul>
    </div>
  );
}

export default ItemDetailPage;
