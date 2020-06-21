import React, { useState } from 'react';
import { fb } from '../lib/firebase';
import { getLocalToken } from '../lib/token.js';
import { Alert } from 'react-bootstrap';
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
      <form className="shadow bg-white pa2" onSubmit={addItem}>
        <h1 className="b f1">Add an item to your shopping list!</h1>
        <div className="input-field-hover pv2">
          <input
            id="itemName"
            type="text"
            name="itemName"
            className="tc bb bw1 b--gray pa1 f3"
            autoCapitalize="none"
            onChange={updateInput}
            value={itemName}
            required
          />
          <label htmlFor="itemName" className="tc gray f1 b hover">
            Name of Item
          </label>
        </div>
        <label>How soon do you expect to buy this again?</label>
        <br></br>
        <div className="form-button flex row pa2">
          <label className="bg-light-green b f3 fl-grow1 pa2 shadow">
            <input
              type="radio"
              value="7"
              checked={purchaseFrequency === '7'}
              onChange={updateFrequency}
            />
            Soon
          </label>
          <label className="bg-light-orange b f3 fl-grow1 pa2 shadow">
            <input
              type="radio"
              value="14"
              checked={purchaseFrequency === '14'}
              onChange={updateFrequency}
            />
            Kind of soon
          </label>
          <label className="bg-light-red b f3 fl-grow1 pa2 shadow">
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
        <button type="submit" className="bg-green ph2 pv1 white f2 b shadow">
          Add It
        </button>
        <br />
        {errorMsg ? (
          <div>
            {' '}
            <Alert dismissible onClose={clearError} variant="danger">
              {errorMsg}
            </Alert>{' '}
          </div>
        ) : null}
      </form>
      <Footer />
    </React.Fragment>
  );
}

export default AddItem;
