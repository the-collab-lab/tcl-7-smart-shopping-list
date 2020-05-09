import React from 'react';
// import ReactDOM from 'react-dom';
import { FirestoreDocument } from 'react-firestore';

class GetList extends React.Component {
  render() {
    return (
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
