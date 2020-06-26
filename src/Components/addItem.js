import React, { useState } from 'react';
import '../assets/main.css';
import { fb } from '../lib/firebase';
import { getLocalToken } from '../lib/token.js';
import Footer from './footerNav.js';

function AddItem() {
  const [itemName, setItemName] = useState('');
  const [purchaseFrequency, setPurchaseFrequency] = useState(null);
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
      <div className="bg-white container mt-3 mx-auto rounded shadow-lg max-w-screen-sm lg:max-w-screen-md px-6 py-4">
        <form onSubmit={addItem}>
          <h1 className="font-bold font-display">
            Add an item to your shopping list!
          </h1>
          <div className="input-field-hover py-4">
            <input
              id="itemName"
              type="text"
              name="itemName"
              className="text-center bb bw1 b--gray py-3 f3"
              autoCapitalize="none"
              onChange={updateInput}
              value={itemName}
              required
            />
            <label htmlFor="itemName" className="tc gray f1 b hover py-1">
              Name of Item
            </label>
          </div>
          <label>How soon do you expect to buy this again?</label>
          <div className="form-button flex flex-row py-3">
            <label className="bg-light-green font-bold text-base text-blac p-3 flex-grow shadow-sm">
              <input
                type="radio"
                value="7"
                checked={purchaseFrequency === '7'}
                onChange={updateFrequency}
              />
              Soon
            </label>
            <label className="bg-light-orange font-bold text-base text-black p-3 flex-grow shadow-sm">
              <input
                type="radio"
                value="14"
                checked={purchaseFrequency === '14'}
                onChange={updateFrequency}
              />
              Pretty soon
            </label>
            <label className="bg-light-red font-bold text-base text-black p-3 flex-grow shadow-sm">
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
            className="bg-green px-4 py-3 text-white text-base font-bold shadow-sm"
          >
            Add It
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
