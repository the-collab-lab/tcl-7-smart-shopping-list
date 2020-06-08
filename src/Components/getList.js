import React from 'react';
import { FirestoreCollection } from 'react-firestore';
import { getLocalToken } from '../lib/token.js';
import { useHistory } from 'react-router-dom';
import { useState } from 'react';
import calculateEstimate from '../lib/estimates.js';
import { fb } from '../lib/firebase';

function EmptyList() {
  const history = useHistory();

  function handleClick() {
    history.push('/add-item');
  }

  return (
    <div className="bg-white shadow pa2">
      <h1 className="b f1">Welcome to your shopping list!</h1>
      <p>
        To get started add an item to your shopping list by clicking "add item
        below"
      </p>
      <button onClick={handleClick} className="bg-green ph2 pv1 white f2 b">
        Add an item
      </button>
    </div>
  );
}

function ItemRow(props) {
  const [isChecked, setIsChecked] = useState(
    props.item.lastPurchasedDate
      ? Date.now() / 1000 - props.item.lastPurchasedDate.seconds < 86400
      : false,
  );

  const generateUpdatedItemData = () => {
    const today = new Date();
    const prevPurchaseFrequency = parseInt(props.item.purchaseFrequency, 10);
    const latestInterval = Math.floor(
      (today.getTime() - props.item.lastPurchasedDate.toMillis()) /
        (1000 * 3600 * 24),
    );
    const newPurchaseFrequency = calculateEstimate(
      prevPurchaseFrequency,
      latestInterval,
      props.item.numberOfPurchases,
    );

    const addDays = (date, days) => {
      var result = new Date(date);
      result.setDate(result.getDate() + days);
      return result;
    };

    return {
      purchaseFrequency: newPurchaseFrequency,
      lastPurchasedDate: new Date(),
      nextPurchaseDate: addDays(today, prevPurchaseFrequency),
      numberOfPurchases: props.item.numberOfPurchases + 1,
    };
  };

  const updateServerItem = (documentId, data) => {
    const db = fb.firestore();
    const dbItem = db.collection(getLocalToken()).doc(documentId);
    dbItem
      .update(data)
      .then(function() {
        console.log('New data written!');
      })
      .catch(function(error) {
        console.error('Error writing new data to document: ', error);
      });
  };

  const handleCheck = event => {
    event.preventDefault();
    if (isChecked === false) {
      setIsChecked(true);
      updateServerItem(props.item.id, generateUpdatedItemData());
    }
  };

  return (
    <li className="bg-white pa1 shadow">
      <label>
        <input
          type="checkbox"
          value={isChecked}
          onChange={handleCheck}
          defaultChecked={isChecked}
        />
        {props.item.itemName}
      </label>
    </li>
  );
}

function FullList(props) {
  return (
    <div className="grocery-list">
      <h1>Groceries</h1>
      <ul className="tl f2">
        {props.data.map(item => (
          <ItemRow key={item.id} item={item} />
        ))}
      </ul>
    </div>
  );
}

function GetList() {
  return (
    <FirestoreCollection
      path={`${getLocalToken()}/`}
      render={({ isLoading, data }) => {
        return isLoading ? (
          <div>loading...</div>
        ) : data.length === 0 ? (
          <EmptyList />
        ) : (
          <FullList data={data} />
        );
      }}
    />
  );
}

export default GetList;
