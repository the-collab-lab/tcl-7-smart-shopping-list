import React from 'react';
import { FirestoreCollection } from 'react-firestore';
import { getLocalToken } from '../lib/token.js';
import { useHistory } from 'react-router-dom';
import { useState } from 'react';

function EmptyList() {
  let history = useHistory();

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
const FrequencyColor = (props) => {
   if (props.data.purchaseFrequency <= 7) {
     return '#88c057';
   } else if (props.data.purchaseFrequencyy <= 14) {
     return '#eeaf4b';
   } else if (props.data.purchaseFrequency <=30) {
     return '#ed3f32';
   } else {
     return 'white';
   }
 }
 
const FullList = (props) => {
  const [searchTerm, setSearchTerm] = useState('');

  const handleChange = (e) => {
    setSearchTerm(e.target.value);
  };

  const clearSearch = () => {
    setSearchTerm('');
  };

  const searchList = props.data.filter((item) => {
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
           ? searchList.map(item => <GroceryItem key={item.id} item={item} />)
        : props.data.map(item => <GroceryItem key={item.id} item={item} />)
        }
      </ul>
    </div>
  );
};


function EstimatedDaystoNextPurchase (props) {
  //lastPurchaseDate to seconds 
  // estimated next purchase date - is last purhchased date + PurchaseFrequency 
  // subtract today's date from estimated purchase date
  const millisecPerDay = 100 * 60 * 60 * 24;
let estimatedNextPurchaseDate = new Date(props.data.lastPurchasedDate);
  estimatedNextPurchaseDate.setDate(estimatedNextPurchaseDate.getDate() + props.data.purchaseFrequency);
  let currentDate = Date.now();

console.log(currentDate);
}

function sortedItems(props) {
  props.data.sort((a, b) => {
    /* sort by estimated number of days until next purchase - 
    is this stored in a variable from previous issue or is it calculated by nextPurchaseDate - LastPurchaseDate */
    if(a.estimate === b.estimate) {
    // sorts alphabetically if estimated days until next purchase are the same
      return a.itemName > b.itemName ? 1 : -1;
    } 
    return a.estimate - b.estimate;
  }
  )}

function GroceryItem(props) {
  const [isChecked, setCheck] = useState(false);
  const { item } = props;
  return (
    <li className="bg-white pa1 shadow" key={item.id}>
      <div className="checkbox-input">
        <label>
          <input
            type="checkbox"
            value={isChecked}
            onChange={() => setCheck(checked => !checked)}
            defaultChecked={
              item.lastPurchasedDate
                ? Date.now() / 1000 - item.lastPurchasedDate.seconds < 86400
                : false
            }
          />
          {item.itemName}
        </label>
      </div>
    </li>
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
