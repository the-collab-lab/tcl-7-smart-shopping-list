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
            <div className="grocery-list">
              <h1>Groceries</h1>
              <ul className="tl f2">
                {data.map(item => (
                  <li className="bg-white pa1 shadow" key={item.id}>
                    <label>
                    <input 
                      type="checkbox"
                      ischecked={this.state.toggleCheck}
                      defaultChecked={
                        item.lastPurchasedDate
                          ? Date.now() / 1000 - item.lastPurchasedDate.seconds <
                            86400
                          : false
                      }
                    />
                    {item.itemName}
                    </label>
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
