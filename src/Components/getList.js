import React from 'react';
import { FirestoreCollection } from 'react-firestore';
import { getLocalToken } from '../lib/token.js';

// Can we get the collection?
// this refers to a single document not the collection
// map over the collection pulling out the path for each one
// and displaying it as a firestoredocument component

class GetList extends React.Component {
  render() {
    return (
      <FirestoreCollection
        path={`${getLocalToken()}/`}
        render={({ isLoading, data }) => {
          return isLoading ? (
            <div>loading...</div>
          ) : (
            <div>
              <h1>Groceries</h1>
              <ul>
                {data.map(item => (
                  <li key={item.id}>{item.itemName}</li>
                ))}
              </ul>
            </div>
          );
        }}
      />
    );
  }
}

export default GetList;
