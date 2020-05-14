import React from 'react';
import ReactDOM from 'react-dom';
import { fb } from '../lib/firebase';

class AddItem extends React.Component {
  constructor() {
    super();
    this.state = {
      itemName: '',
      purchaseFrequency: 0,
    };
  }
  updateInput = e => {
    this.setState({
      [e.target.name]: e.target.value,
    });
  };

  updateFrequency = e => {
    this.setState({
      [e.target.value]: e.target.value,
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
      purchaseFrequency: 0,
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
          <button type="submit">Submit</button>
          <br></br>
          <label>
            How soon do you expect to buy this again?
            <select value={this.state.value} onChange={this.updateFrequency}>
              <option value="7">Soon</option>
              <option value="14">Pretty Soon</option>
              <option value="30">Not Soon</option>
            </select>
          </label>
        </form>
        <button id="soon" onclick="frequent()">
          Soon
        </button>
        <button id="kindaSoon" onclick="frequent()">
          Kinda soon
        </button>
        <button id="prettySoon" onclick="frequent()">
          pretty soon
        </button>
      </div>
    );
  }
}

export default AddItem;
