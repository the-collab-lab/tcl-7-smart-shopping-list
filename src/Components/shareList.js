import React, { useState } from 'react';
import { fb } from '../lib/firebase';
import { setLocalToken } from '../lib/token.js';

function getExistingList(token) {
  const db = fb.firestore();
  const promise = db.collection(token).get();

  promise.then(querySnapshot => {
    if (!querySnapshot.empty) {
      setLocalToken(token);
      window.location.href = '/list-view';
    } else {
      window.alert('Enter a valid share code and try again');
    }
  });
}

export function ShareList() {
  const [token, setToken] = useState('');

  const handleSubmitShareCode = e => {
    e.preventDefault();
    getExistingList(token);
  };

  return (
    <form className="shadow bg-white pa2" onSubmit={handleSubmitShareCode}>
      <h1 className="b f1">Welcome to your smart shopping list!</h1>
      <p className="f3 pv2">
        Enter your share code below. Then tap "Join shopping list" to get
        started.
      </p>
      <div className="input-field-hover pv2">
        <input
          id="share-code"
          type="text"
          name="shareCode"
          className="tc bb bw1 b--gray pa1 f3"
          autoCapitalize="none"
          onChange={event => setToken(event.target.value)}
          value={token}
          required
        />
        <label htmlFor="share-code" className="tc gray f1 b hover">
          Share Code
        </label>
      </div>
      <p>
        <button className="bg-green ph2 pv1 white f2 b">
          Join Shopping List
        </button>
      </p>
      <p className="f5 gray">
        You can also{' '}
        <a className="black" href="/">
          create a new shopping list
        </a>
        .
      </p>
    </form>
  );
}

export default ShareList;
