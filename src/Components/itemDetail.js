import React from 'react';
import '../App.css';
import { useParams } from 'react-router-dom';
import { getLocalToken } from '../lib/token.js';
import { FirestoreDocument } from 'react-firestore';
import { Link } from 'react-router-dom';

function ItemDetailPage() {
  let { docId } = useParams();
  // date formater

  // calculate days until next purchase
  const getFormattedDate = date => {
    const seconds = date.seconds;
    const year = Math.floor(seconds / 31536000);
    const nummonths = Math.floor((seconds % 31536000) / 2628000);
    const numdays = Math.floor(((seconds % 31536000) % 2628000) / 86400);

    const month = nummonths.toString().padStart(2, '0');
    const day = numdays.toString().padStart(2, '0');

    return month + '/' + day + '/' + year;
  };

  // this is duplicated from getList lines 87-93. Should refactor in seperate issue.
  const today = new Date();
  const getDaysToNextPurchase = item => {
    return Math.floor(
      (item.nextPurchaseDate.toMillis() - today.getTime()) / (1000 * 3600 * 24),
    );
  };

  // top navigation to go back
  return (
    <FirestoreDocument
      path={`${getLocalToken()}/${docId}`}
      render={({ isLoading, data }) => {
        return isLoading ? (
          <div>loading...</div>
        ) : (
          <div className="shadow bg-white pa2">
            <h1 className="b f1">{data.itemName}</h1>
            <ul className="f5 gray">
              <li>
                Last purchase date: {getFormattedDate(data.lastPurchasedDate)}
              </li>
              <li>
                Estimated number of days until the next purchase:{' '}
                {getDaysToNextPurchase(data)}
              </li>
              <li>
                Number of times the item has been purchase:{' '}
                {data.numberOfPurchases}
              </li>
            </ul>
            <Link to="/list-view">go back to the list</Link>
          </div>
        );
      }}
    />
  );
}

export default ItemDetailPage;
