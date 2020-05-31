import React from 'react';
import '../App.css';
import { fb } from '../lib/firebase';
import { getLocalToken } from '../lib/token.js';
import { Alert } from 'react-bootstrap';

class AddItem extends React.Component {
  constructor() {
    super();
    this.state = {
      itemName: '',
      purchaseFrequency: null,
      lastPurchasedDate: null,
      errorMsg: null,
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

  
  clearError = () => this.setState({ errorMsg: null });

 
  addItem = e => {
    e.preventDefault();
    const db = fb.firestore();
    const collection = db.collection(getLocalToken());

    var query = collection.where('itemName', '==', this.state.itemName);

    query
      .get()
      .then(querySnapshot => {
        if (querySnapshot.size) {
          // console.log('this name is already in db:', this.state.itemName);
          this.setState({ errorMsg: 'Item is already in list.' });
        } else {

          collection
            .add({
              itemName: this.state.itemName,
              purchaseFrequency: this.state.purchaseFrequency,
              lastPurchasedDate: new Date(),
            })
            .then(() => {})
            .catch(err => {
              console.log('Could not add item:', err);
            });

          this.setState({
            itemName: '',
            purchaseFrequency: null,
            lastPurchasedDate: null,
          });
        }
      })
      .catch(error => {
        console.log('Error getting documents: ', error);
      });
  };
  render() {
    return (
      <div className="add-item-form">
        <form onSubmit={this.addItem}>
          <label id="item-text">
            Name of Item
            <input
              type="text"
              name="itemName"
              onChange={this.updateInput}
              value={this.state.itemName}
            />
          </label>
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
              Kind of soon
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
          <br />
          {this.state.errorMsg ? (
            <div>
              {' '}
              <Alert dismissible onClose={this.clearError} variant="danger">
                {this.state.errorMsg}
              </Alert>{' '}
            </div>
          ) : null}
        </form>
      </div>
    );
  }
}

export default AddItem;
