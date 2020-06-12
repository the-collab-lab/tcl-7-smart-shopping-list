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

const FrequencyColor = props => {
  if (props.data.purchaseFrequency <= 7) {
    return '#88c057';
  } else if (props.data.purchaseFrequencyy <= 14) {
    return '#eeaf4b';
  } else if (props.data.purchaseFrequency <= 30) {
    return '#ed3f32';
  } else {
    return 'white';
  }
};

function ItemRow(props) {
  const { item } = props;
  const [isChecked, setIsChecked] = useState(false);

  const generateUpdatedItemData = () => {
    const today = new Date();
    const prevPurchaseFrequency = parseInt(item.purchaseFrequency, 10);
    const latestInterval = Math.floor(
      (today.getTime() - item.lastPurchasedDate.toMillis()) /
        (1000 * 3600 * 24),
    );

    const newPurchaseFrequency = calculateEstimate(
      prevPurchaseFrequency,
      latestInterval,
      item.numberOfPurchases,
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
      numberOfPurchases: item.numberOfPurchases + 1,
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
    if (isChecked === false) {
      setIsChecked(true);
      updateServerItem(props.item.id, generateUpdatedItemData());
    } else {
      event.preventDefault();
      setIsChecked(false);
    }
  };

  return (
    <li className="bg-white pa1 shadow">
      <label>
        <input
          type="checkbox"
          value={isChecked}
          onChange={handleCheck}
          defaultChecked={
            item.lastPurchasedDate
              ? Date.now() / 1000 - item.lastPurchasedDate.seconds < 86400
              : false
          }
        />
        {item.itemName}
      </label>
    </li>
  );
}

function FullList(props) {
  const [searchTerm, setSearchTerm] = useState('');

  const handleChange = e => {
    setSearchTerm(e.target.value);
  };

  const clearSearch = () => {
    setSearchTerm('');
  };

  const searchList = props.data.filter(item => {
    return item.itemName.toLowerCase().includes(searchTerm.toLowerCase());
  });

  return (
    <div className="grocery-list">
      <h1>Groceries</h1>
      <ul className="tl f2 check-list">
        <li className="bg-white pa1 shadow">
          <div className="filter-input">
            <input
              type="text"
              placeholder="Filter List"
              value={searchTerm}
              onChange={handleChange}
            />
            <button className="filter-button" onClick={clearSearch}>
              {' '}
              X{' '}
            </button>
          </div>
        </li>

        {searchTerm
          ? searchList.map(item => <ItemRow key={item.id} item={item} />)
          : props.data.map(item => <ItemRow key={item.id} item={item} />)}
      </ul>
    </div>
  );
}

function EstimatedDaystoNextPurchase(props) {
  //lastPurchaseDate to seconds
  // estimated next purchase date - is last purhchased date + PurchaseFrequency
  // subtract today's date from estimated purchase date
  const millisecPerDay = 100 * 60 * 60 * 24;
  let estimatedNextPurchaseDate = new Date(props.data.lastPurchasedDate);
  estimatedNextPurchaseDate.setDate(
    estimatedNextPurchaseDate.getDate() + props.data.purchaseFrequency,
  );
  let currentDate = Date.now();

  console.log(currentDate);
}

function sortedItems(props) {
  props.data.sort((a, b) => {
    /* sort by estimated number of days until next purchase - 
    is this stored in a variable from previous issue or is it calculated by nextPurchaseDate - LastPurchaseDate */
    if (a.estimate === b.estimate) {
      // sorts alphabetically if estimated days until next purchase are the same
      return a.itemName > b.itemName ? 1 : -1;
    }
    return a.estimate - b.estimate;
  });
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
