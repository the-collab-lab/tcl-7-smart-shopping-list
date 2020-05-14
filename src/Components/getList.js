import React from 'react';
import { FirestoreDocument } from 'react-firestore';
import getLocalToken from '../lib/token.js';

class GetList extends React.Component {
  render() {
    return (
      // Can we get the collection?
      // this refers to a single document not the collection
      // map over the collection pulling out the path for each one
      // and displaying it as a firestoredocument component
      <FirestoreDocument
        path="items/tIA3kp24eSWYTNKxA3wl"
        render={({ isLoading, data }) => {
          return isLoading ? (
            <div>loading...</div>
          ) : (
            <div>
              <h2>Grocery Items: {data.itemname}</h2>
            </div>
          );
        }}
      />
    );
  }
}
export default GetList;
