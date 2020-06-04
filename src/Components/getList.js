import React from 'react';
import { FirestoreCollection } from 'react-firestore';
import { getLocalToken } from '../lib/token.js';
import { useHistory } from 'react-router-dom';
import { useState } from 'react';

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

function FullList(props) {
  const [isChecked, setCheck] = useState(false);

  return (
    <div className="grocery-list">
      <h1>Groceries</h1>
      <ul className="tl f2">
        {props.data.map(item => (
          <li className="bg-white pa1 shadow" key={item.id}>
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
          </li>
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
