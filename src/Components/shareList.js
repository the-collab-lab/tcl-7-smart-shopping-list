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
    <form onSubmit={handleSubmitShareCode} className="pa2">
      <p className="f3 pt2 deep-blue">
        You can also join an existing list by entering a share code below.
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
      <button className="pa2 white f2 b btn">Join Shopping List</button>
    </form>
  );
}

export default ShareList;
