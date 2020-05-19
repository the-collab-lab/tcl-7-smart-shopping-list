import React from 'react';
import { fb } from '../lib/firebase';
//import { hasLocalToken, setLocalToken, getLocalToken } from './lib/token.js';
import { hasList } from './hasList.js';


class ShareList extends React.Component {

     hasList = (token) => {
        const db = fb.firestore();
        const collectionReference = db.collection(token)
        collectionReference
          .get()
          .then(
            function(querySnapshot) {
              if (querySnapshot.empty) {
                return false
              } else {
                console.log('here');
                return true
              }
             }
          )
      }
    
    handleCheckShareCode = e => {
      //get the value from input 
      const token = document.getElementById('share-code').value;
      //check if value has list
      //if no, show alert
      //if yes, set local token and route to list view
      console.log(this.hasList(token));
    if ( this.hasList(token) ) {
        //e.preventDefault();
      //route to list view
      
      console.log('this worked');
    } else {
        e.preventDefault();
        window.alert('Enter a valid share code and try again');
    }
  
    }   
  render() {
    return (
   <form className="shadow bg-white pa2" action="./add-item">
    <h1 className="b f1">Welcome to your smart shopping list!</h1>
    <p className="f3">Enter your share code below. Then tap "Join shopping list" to get started.</p>
    <label>
        Share Code
        <input
          type="text"
          name="shareCode"
          id="share-code"
        />
      </label>
    <button
      onClick={this.handleCheckShareCode}
      className="bg-green ph2 pv1 white f2 b">
     Join Shopping List
    </button>
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