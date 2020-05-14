import React from 'react';
import { fb } from '../lib/firebase';
import { Link } from 'react-router-dom';

class CreateList extends React.Component {
  constructor() {
    super();
    this.ref = fb.firestore().collection('newList');
    this.state = {
      itemName: '',
    };
  }
  onClick = e => {
    this.setState({
      [e.target.name]: e.target.value,
    });
  };

  render() {
    return (
      <h4>
        <Link to="/">Create</Link>
      </h4>
    );
  }
}

export default CreateList;
