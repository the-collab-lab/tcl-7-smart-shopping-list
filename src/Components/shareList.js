import React from 'react';
import { fb } from '../lib/firebase';
//import { FirestoreCollection } from 'react-firestore';
//import GetCollection from '/getCollection.js';
//import { hasLocalToken, setLocalToken, getLocalToken } from '../lib/token.js';
//import { GetCollection } from './hasList.js';


class ShareList extends React.Component {

    constructor(props) {
        super(props);
        this.state = {shareCode: ''};
    
        this.updateInput = this.updateInput.bind(this);
        //this.handleSubmit = this.handleSubmit.bind(this);
      }

      updateInput(event) {
        this.setState({shareCode: event.target.value});
      }
      
    async hasList (token) {
        const db = fb.firestore();
        //collect share code from input to query matching collection name
       const collectionReference = await db.collection(this.state.shareCode).get()
       .then(querySnapshot => {
        if (querySnapshot.empty) {
          token = false
        } else {
          console.log('here');
          token = true
        }
       }
    )
       return token
    }

    /* hasList = (token) => {
       const db = fb.firestore();
       const collectionReference = db.collection(token);
       collectionReference
         .get()
         .then(querySnapshot => {
             if (querySnapshot.empty) {
               return false
             } else {
               console.log('here');
               return true
             }
            }
         )
     }*/
   
   handleCheckShareCode = e => {
        e.preventDefault();
     //get the value from input 
     //const token = document.getElementById('share-code').value;
     //check if value has list
     //if no, show alert
     //if yes, set local token and route to list view
     console.log(this.hasList(this.token));
   if ( this.hasList(this.token) ) {
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
         onChange={this.updateInput}
         value={this.state.shareCode}
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