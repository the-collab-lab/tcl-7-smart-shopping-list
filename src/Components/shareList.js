import React from 'react';
import { fb } from '../lib/firebase';
import { setLocalToken } from '../lib/token.js';

class ShareList extends React.Component {
  constructor(props) {
    super(props);
    this.state = { token: '' };

    this.updateInput = this.updateInput.bind(this);
  }

  updateInput(event) {
    this.setState({ token: event.target.value });
  }

  getExistingList() {
    const db = fb.firestore();
    const promise = db.collection(this.state.token).get();

    promise.then(querySnapshot => {
      //check if value has list
      if (!querySnapshot.empty) {
        //if yes, set local token and route to list view
        setLocalToken(this.state.token);
        window.location.href = '/list-view';
      } else {
        //if no, show alert
        window.alert('Enter a valid share code and try again');
      }
    });
  }

  handleCheckShareCode = e => {
    e.preventDefault();
    this.getExistingList();
  };

  render() {
    return (
      <form className="shadow bg-white pa2" action="./add-item">
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
            className="bb bw1 b--gray"
            autocapitalize="none"
            onChange={this.updateInput}
            value={this.state.shareCode}
            required
          />
          <label for="share-code" className="tc gray f1 b hover">
            Share Code
          </label>
        </div>
        <p>
          <button
            onClick={this.handleCheckShareCode}
            className="bg-green ph2 pv1 white f2 b"
          >
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
}

export default ShareList;
