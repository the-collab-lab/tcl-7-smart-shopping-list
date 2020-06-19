import React, { useState } from 'react';
import '../App.css';
import { useParams } from 'react-router-dom';
import { getLocalToken } from '../lib/token.js';
import { FirestoreDocument } from 'react-firestore';

function ItemDetailPage() {
  let { docId } = useParams();
  // date formater

  // calculate days until next purchase
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
              <li>Last purchase date: {data.lastPurchaseDate}</li>
              <li>
                Estimated number of days until the next purchase:{' '}
                {getDaysToNextPurchase(data)}
              </li>
              <li>
                Number of times the item has been purchase:{' '}
                {data.numberOfPurchases}
              </li>
            </ul>
          </div>
        );
      }}
    />
  );
}

export default ItemDetailPage;
