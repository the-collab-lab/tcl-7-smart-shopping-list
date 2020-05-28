import React from 'react';
import { FirestoreCollection } from 'react-firestore';
import { getLocalToken } from '../lib/token.js';

class GetList extends React.Component {
  constructor() {
    super();
    this.state = {
      isChecked: true,
    };
  }

  toggleCheck = () => {
    this.setState({
      isChecked: false,
    });
  };

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
              <ul className="grocery-list">
                {data.map(item => (
                  <li key={item.id}>
                    <input
                      type="checkbox"
                      isChecked={this.toggleCheck}
                      defaultChecked={
                        item.lastPurchasedDate
                          ? Date.now() / 1000 - item.lastPurchasedDate.seconds <
                            86400
                          : false
                      }
                    />
                    {item.itemName}
                  </li>
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
