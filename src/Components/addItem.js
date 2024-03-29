import React, { useState } from 'react';
import '../assets/main.css';
import { fb } from '../lib/firebase';
import { getLocalToken } from '../lib/token.js';
import Footer from './footerNav.js';

function AddItem() {
  const [itemName, setItemName] = useState('');
  const [purchaseFrequency, setPurchaseFrequency] = useState(null);
  // eslint-disable-next-line no-unused-vars
  const [lastPurchasedDate, setLastPurchasedDate] = useState(null);
  const [errorMsg, setErrorMsg] = useState(null);

  const updateInput = e => setItemName(e.target.value);
  const updateFrequency = e => setPurchaseFrequency(e.target.value);
  const clearError = () => setErrorMsg(null);

  const addItem = e => {
    e.preventDefault();
    const db = fb.firestore();
    const collection = db.collection(getLocalToken());
    var query = collection.where('itemName', '==', itemName);

    query
      .get()
      .then(querySnapshot => {
        if (querySnapshot.size) {
          setErrorMsg('Item is already in list.');
        } else {
          const date = new Date();
          const nextPurchaseDate = new Date(date);
          nextPurchaseDate.setDate(
            nextPurchaseDate.getDate() + parseInt(purchaseFrequency, 10),
          );

          collection
            .add({
              itemName: itemName,
              purchaseFrequency: purchaseFrequency,
              lastPurchasedDate: date,
              nextPurchaseDate: nextPurchaseDate,
              numberOfPurchases: 0,
            })
            .then(() => {})
            .catch(err => {
              console.log('Could not add item:', err);
            });
          setItemName('');
          setPurchaseFrequency(null);
          setLastPurchasedDate(null);
        }
      })
      .catch(error => {
        console.log('Error getting documents: ', error);
      });
  };

  return (
    <React.Fragment>
      <div className="bg-white container sm:mt-3 mx-auto rounded shadow-lg xs:min-h-screen sm:min-h-0 max-w-screen-sm lg:max-w-screen-md px-6 py-3">
        <form onSubmit={addItem}>
          <h1 className="font-display text-3xl font-bold mb-3">
            Add an item to your shopping list!
          </h1>
          <div className="input-field-hover py-4 mb-4">
            <input
              id="itemName"
              type="text"
              name="itemName"
              className="text-center font-body p-3 shadow bg-gray-100 rounded-lg outline-none focus:bg-gray-200"
              autoCapitalize="none"
              onChange={updateInput}
              value={itemName}
              required
            />
            <label
              htmlFor="itemName"
              className="font-body font-semibold text-xl text-center text-gray-700 hover py-3"
            >
              Name of Item
            </label>
          </div>
          <label className="mt-3 font-body text-xl text-gray-700">
            How soon do you expect to buy this again?
          </label>
          <div className="form-button flex flex-col sm:flex-col md:flex-row py-2">
            <label className="bg-green-500 font-body font-semibold text-gray-800 text-lg p-3 flex-grow shadow-sm hover:bg-green-600">
              <input
                type="radio"
                value="7"
                checked={purchaseFrequency === '7'}
                onChange={updateFrequency}
              />
              Soon
            </label>
            <label className="bg-yellow-500 font-body font-semibold text-gray-800 text-lg p-3 flex-grow shadow-sm hover:bg-yellow-600">
              <input
                type="radio"
                value="14"
                checked={purchaseFrequency === '14'}
                onChange={updateFrequency}
              />
              Pretty soon
            </label>
            <label className="bg-red-500 font-body font-semibold text-gray-800 text-lg p-3 flex-grow shadow-sm hover:bg-red-600">
              <input
                type="radio"
                value="30"
                checked={purchaseFrequency === '30'}
                onChange={updateFrequency}
              />
              Not soon
            </label>
            <br></br>
          </div>
          <button
            type="submit"
            className="bg-green-700 text-white font-body font-bold text-lg w-full rounded-lg mt-4 mb-2 p-3 shadow-sm"
          >
            Add Item
          </button>
          <br />
          {errorMsg ? (
            <div
              class="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative"
              role="alert"
            >
              {' '}
              <span class="block sm:inline">{errorMsg}</span>
              <span class="absolute top-0 bottom-0 right-0 px-4 py-3">
                <svg
                  class="fill-current h-6 w-6 text-red-500"
                  role="button"
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 20 20"
                >
                  <title>Close</title>
                  <path
                    d="M14.348 14.849a1.2 1.2 0 0 1-1.697 0L10 11.819l-2.651 3.029a1.2 1.2 0 1 1-1.697-1.697l2.758-3.15-2.759-3.152a1.2 1.2 0 1 1 1.697-1.697L10 8.183l2.651-3.031a1.2 1.2 0 1 1 1.697 1.697l-2.758 3.152 2.758 3.15a1.2 1.2 0 0 1 0 1.698z"
                    onClick={clearError}
                  />
                </svg>
              </span>
            </div>
          ) : null}
        </form>
      </div>
      <Footer />
    </React.Fragment>
  );
}

export default AddItem;
