import React, { useState } from 'react';
import '../App.css';
import { fb } from '../lib/firebase';
import { setLocalToken } from '../lib/token.js';
import { useHistory } from 'react-router-dom';

function hasList(token, callback) {
  const db = fb.firestore();
  const promise = db.collection(token).get();

  promise.then(querySnapshot => {
    if (!querySnapshot.empty) {
      callback(token);
    } else {
      window.alert('Enter a valid share code and try again');
    }
  });
}

export function ShareList() {
  const [token, setToken] = useState('');

  let history = useHistory();
  const handleSubmitShareCode = e => {
    e.preventDefault();

    const setList = token => {
      setLocalToken(token);
      history.push('/list-view');
    };

    hasList(token, setList);
  };

  return (
    <form onSubmit={handleSubmitShareCode} className="p-1">
      <p className="m-3 font-body text-xl text-gray-700">
        You can also join an existing list by entering a share code below.
      </p>
      <div className="input-field-hover py-4">
        <input
          id="share-code"
          type="text"
          name="shareCode"
          className="text-center font-body p-3 shadow bg-gray-100 rounded-lg outline-none focus:bg-gray-200"
          autoCapitalize="none"
          onChange={event => setToken(event.target.value)}
          value={token}
          required
        />
        <label
          htmlFor="share-code"
          className="font-body font-semibold text-xl text-center text-gray-700 hover py-3"
        >
          Share Code
        </label>
      </div>
      <button className="bg-green-700 text-white font-body font-bold text-lg w-3/6 rounded-lg mb-2 p-3 shadow-sm">
        Join Shopping List
      </button>
    </form>
  );
}

export default ShareList;
