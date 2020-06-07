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

const FullList = (props) => {
  const [isChecked, setCheck] = useState(false);
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
          ? searchList.map((item) => (
              <li className="bg-white pa1 shadow" key={item.id}>
                <div className="checkbox-input">
                  <label>
                    <input
                      type="checkbox"
                      value={isChecked}
                      onChange={() => setCheck((checked) => !checked)}
                      defaultChecked={
                        item.lastPurchasedDate
                          ? Date.now() / 1000 - item.lastPurchasedDate.seconds <
                            86400
                          : false
                      }
                    />
                    {item.itemName}
                  </label>
                </div>
              </li>
            ))
          : props.data.map((item) => (
              <li className="bg-white pa1 shadow" key={item.id}>
                <div className="checkbox-input">
                  <label>
                    <input
                      type="checkbox"
                      value={isChecked}
                      onChange={() => setCheck((checked) => !checked)}
                      defaultChecked={
                        item.lastPurchasedDate
                          ? Date.now() / 1000 - item.lastPurchasedDate.seconds <
                            86400
                          : false
                      }
                    />
                    {item.itemName}
                  </label>
                </div>
              </li>
            ))}
      </ul>
    </div>
  );
};

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
