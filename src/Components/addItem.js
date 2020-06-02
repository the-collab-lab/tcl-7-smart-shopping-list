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
      show: true,
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

  onClose = () => {
    this.setState({
      show: !this.state.show,
    });
  };

  /* user is placeholder for user token when functionality is completed */
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
          // console.log(
          //   'the item is not in db - we can add it:',
          //   this.state.itemName,
          // );

          collection
            .add({
              itemName: this.state.itemName,
              purchaseFrequency: this.state.purchaseFrequency,
              lastPurchasedDate: this.state.lastPurchasedDate,
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
      <form className="shadow bg-white pa2" onSubmit={this.addItem}>
        <h1 className="b f1">Add an item to your shopping list!</h1>
        <div className="input-field-hover pv2">
          <input
            id="itemName"
            type="text"
            name="itemName"
            className="tc bb bw1 b--gray pa1 f3"
            autoCapitalize="none"
            onChange={this.updateInput}
            value={this.state.itemName}
            required
          />
          <label htmlFor="itemName" className="tc gray f1 b hover">
            Name of Item
          </label>
        </div>
        <label>How soon do you expect to buy this again?</label>
        <br></br>
        <div className="form-button flex row pa2">
          <label className="bg-light-green b f3 fl-grow1 pa2 shadow">
            <input
              type="radio"
              value="7"
              checked={this.state.purchaseFrequency === '7'}
              onChange={this.updateFrequency}
            />
            Soon
          </label>
          <label className="bg-light-orange b f3 fl-grow1 pa2 shadow">
            <input
              type="radio"
              value="14"
              checked={this.state.purchaseFrequency === '14'}
              onChange={this.updateFrequency}
            />
            Kind of soon
          </label>
          <label className="bg-light-red b f3 fl-grow1 pa2 shadow">
            <input
              type="radio"
              value="30"
              checked={this.state.purchaseFrequency === '30'}
              onChange={this.updateFrequency}
            />
            Not soon
          </label>
          <br></br>
        </div>
        <button type="submit" className="bg-green ph2 pv1 white f2 b shadow">
          Add It
        </button>
        <br />
        {this.state.errorMsg ? (
          <div>
            {' '}
            <Alert dismissible variant="danger">
              {this.state.errorMsg}
            </Alert>{' '}
          </div>
        ) : null}
      </form>
    );
  }
}

export default AddItem;
