import React from 'react';
import '../App.css';
import { fb } from '../lib/firebase';

class AddItem extends React.Component {
  constructor() {
    super();
    this.state = {
      itemName: '',
      purchaseFrequency: null,
      lastPurchasedDate: null,
    };
  }
  updateInput = e => {
    this.setState({
      [e.target.name]: e.target.value,
    });
  };

  updateFrequency = e => {
    this.setState({
      purchaseFrequency: e.target.value,
    });
  };
  /* user is placeholder for user token when functionality is completed */
  addItem = e => {
    e.preventDefault();
    const db = fb.firestore();
    db.collection('user').add({
      itemName: this.state.itemName,
      purchaseFrequency: this.state.purchaseFrequency,
      lastPurchasedDate: this.state.lastPurchasedDate,
    });

    this.setState({
      itemName: '',
      purchaseFrequency: null,
      lastPurchasedDate: null,
    });
  };
  render() {
    return (
      <div className="add-item-form">
        <form onSubmit={this.addItem}>
          <input
            type="text"
            name="itemName"
            onChange={this.updateInput}
            value={this.state.itemName}
          />
          <br></br>
          <label>How soon do you expect to buy this again?</label>
          <br></br>
          <div className="form-button">
            <label>
              <input
                type="radio"
                value="7"
                checked={this.state.purchaseFrequency === '7'}
                onChange={this.updateFrequency}
              />
              Soon
            </label>
            <label>
              <input
                type="radio"
                value="14"
                checked={this.state.purchaseFrequency === '14'}
                onChange={this.updateFrequency}
              />
              Pretty soon
            </label>
            <label>
              <input
                type="radio"
                value="30"
                checked={this.state.purchaseFrequency === '30'}
                onChange={this.updateFrequency}
              />
              Not soon
            </label>
            <br></br>
            <button type="submit">Add It</button>
          </div>
        </form>
      </div>
    );
  }
}

export default AddItem;
