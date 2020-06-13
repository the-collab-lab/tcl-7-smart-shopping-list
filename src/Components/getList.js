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




  var groupBy = function (arr, criteria) {
	return arr.reduce(function (obj, item) {

		// Check if the criteria is a function to run on the item or a property of it
		var key = typeof criteria === 'function' ? criteria(item) : item[criteria];

		// If the key doesn't exist yet, create it
		if (!obj.hasOwnProperty(key)) {
			obj[key] = [];
		}

		// Push the value to the object
		obj[key].push(item);

		// Return the object to the next item in the loop
		return obj;

	}, {});
};

const groupedList = groupBy(props.data, 'purchaseFrequency');
Object.keys(groupedList).forEach((frequencyGroup) => {
  groupedList[frequencyGroup].sort((item1, item2) => {
    if (item1.lastPurchasedDate === item2.lastPurchasedDate) {
      return item1.itemName > item2.itemName ? 1 : -1;
    } else {
      return item1.lastPurchasedDate > item2.lastPurchasedDate ? 1 : -1;
    }
  });
});


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
