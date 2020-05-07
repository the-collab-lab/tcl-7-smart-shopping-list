import React from 'react';
import firebase from '@firebase/app';
//import {FirestoreCollection} from 'react-firestore';
import { FirestoreCollection, withFirestore } from 'react-firestore';

/*<FirestoreCollection
  path="dogs"
  //sort="publishedDate:desc,authorName"
  render={({ data }) => {
    return  (
      <div>
        <h1>Dogs</h1>
        <ul>
          {data.map(dogs => (
            <li key={dogs.id}>
              {dogs.breed} - {dogs.name}
            </li>
          ))}
        </ul>
      </div>
    );
  }}
/>

export default FirestoreCollection;*/

class ListComponent extends Component {
  state = {
    dogs: null,
  };

  componentDidMount() {
    const { firestore } = this.props;

    firestore.doc('dogs/1').onSnapshot(snapshot => {
      this.setState({ dogs: snapshot });
    });
  }

  render() {
    const { dogs } = this.state;
    const dogsData = dogs ? dogs.data() : null;

    return dogsData ? (
      <div>
        <h1>{dogsData.breed}</h1>
        <h2>{dogsData.name}</h2>
      </div>
    ) : (
      <Loading />
    );
  }
}

export default ListComponent;
