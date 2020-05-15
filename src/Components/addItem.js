import React from 'react';
import ReactDOM from 'react-dom';
import { fb } from '../lib/firebase';

class AddItem extends React.Component {
  constructor() {
    super();
    this.state = {
      itemName: '',
      purchaseFrequency: 14,
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

  addItem = e => {
    e.preventDefault();
    const db = fb.firestore();
    db.collection('items').add({
      itemName: this.state.itemName,
      purchaseFrequency: this.state.purchaseFrequency,
    });

    this.setState({
      itemName: '',
      purchaseFrequency: 14,
    });
  };
  render() {
    return (
      <div>
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
          <label>
            <input
              type="radio"
              value="7"
              checked={this.state.purchaseFrequency === '7'}
              onChange={this.updateFrequency}
              className="form-button"
            />
            Soon
          </label>
          <label>
            <input
              type="radio"
              value="14"
              checked={this.state.purchaseFrequency === '14'}
              onChange={this.updateFrequency}
              className="form-button"
            />
            Pretty soon
          </label>
          <label>
            <input
              type="radio"
              value="30"
              checked={this.state.purchaseFrequency === '30'}
              onChange={this.updateFrequency}
              className="form-button"
            />
            Not soon
          </label>
          <br></br>
          <button type="submit">Add It</button>
        </form>
      </div>
    );
  }
}

export default AddItem;
