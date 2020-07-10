import React from 'react';
import '../assets/main.css';
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
          <div className="bg-white m-auto rounded object-center shadow-lg max-w-screen-sm px-6 py-4">
            <nav className="pa1 flex">
              <Link to="/list-view">
                <img src="/img/arrow_back-24px.svg" alt="back"></img>
              </Link>
            </nav>
            <h1 className="font-display text-3xl font-bold mb-2">
              {data.itemName}
            </h1>
            <table className="m-auto table-auto font-body text-gray-700">
              <tbody>
                <tr>
                  <td className="border px-4 py-2 text-left">
                    Last purchase date
                  </td>
                  <td className="border px-4 py-2 text-right">
                    {getFormattedDate(data.lastPurchasedDate)}
                  </td>
                </tr>
                <tr className="bg-gray-100">
                  <td className="border px-4 py-2 text-left">
                    Estimated number of days until the next purchase
                  </td>
                  <td className="border px-4 py-2 text-right">
                    {getDaysToNextPurchase(data)}
                  </td>
                </tr>
                <tr>
                  <td className="border px-4 py-2 text-left">
                    Number of times the item has been purchase
                  </td>
                  <td className="border px-4 py-2 text-right">
                    {data.numberOfPurchases}
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        );
      }}
    />
  );
}

export default ItemDetailPage;
