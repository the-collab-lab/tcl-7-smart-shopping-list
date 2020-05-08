import React from 'react';
import ReactDOM from 'react-dom';
import { fb } from '../lib/firebase';
import { FirestoreProvider } from 'react-firestore';

class Item extends React.Component {
  constructor() {
    super();
    this.state = {
      itemname: '',
    };
  }
  updateInput = e => {
    this.setState({
      [e.target.name]: e.target.value,
    });
  };
  addItem = e => {
    e.preventDefault();
    const db = fb.firestore();
    db.settings({
      timestampsInSnapshots: true,
    });
    const itemRef = db.collection('items').add({
      itemname: this.state.itemname,
    });
    this.setState({
      itemname: '',
    });
  };
  render() {
    return (
      <form onSubmit={this.addItem}>
        <input
          type="text"
          name="itemname"
          onChange={this.updateInput}
          value={this.state.itemname}
        />
        <button type="submit">Submit</button>
      </form>
    );
  }
}
export default Item;
