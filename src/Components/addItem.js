import React from 'react';
import { fb } from '../lib/firebase';

class AddItem extends React.Component {
  constructor() {
    super();
    this.state = {
      itemName: '',
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
    db.collection('items').add({
      itemName: this.state.itemName,
    });
    this.setState({
      itemName: '',
    });
  };
  render() {
    return (
      <form onSubmit={this.addItem}>
        <input
          type="text"
          name="itemName"
          onChange={this.updateInput}
          value={this.state.itemName}
        />
        <button type="submit">Submit</button>
      </form>
    );
  }
}
export default AddItem;
