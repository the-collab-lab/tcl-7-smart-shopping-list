import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';
import Container from '@material-ui/core/Container';
import { hasLocalToken, setLocalToken } from './lib/token.js';
import GetList from './Components/getList.js';
import AddItem from './Components/addItem.js';
import ShareList from './Components/shareList.js';
import Button from '@material-ui/core/Button';

import {
  BrowserRouter as Router,
  useHistory,
  Switch,
  Route,
  Link,
} from 'react-router-dom';

function App() {
  return (
    <div className="App">
      <Router>
        <main className="bg-deep-blue pa1">
          <Container maxWidth="md">
            <Switch>
              <Route path="/list-view">
                <Listview />
              </Route>
              <Route path="/add-item">
                <ItemForm />
              </Route>
              <Route path="/join-existing">
                <ShareList />
              </Route>
              <Route path="/">
                <Landing />
              </Route>
            </Switch>
          </Container>
        </main>
      </Router>
    </div>
  );
}

class Landing extends React.Component {
  render() {
    if (hasLocalToken()) {
      return <GetList />;
    } else {
      return <SignIn />;
    }
  }
}

function SignIn() {
  // uses setLocalToken to set token to local storage when button is clicked
  let history = useHistory();
  const handleSubmit = () => {
    setLocalToken();
    history.push('/list-view');
  };

  return (
    <div className="shadow bg-white brd pa2">
      <form onSubmit={handleSubmit}>
        <h1 className="deep-blue f1 pa2">
          Welcome to your smart shopping list!
        </h1>
        <p className="deep-blue f3">
          Tap “Create shopping list” to get started.
        </p>
        <button className="bg-teal-green pa2 white f2 b">
          Create shopping list
        </button>
      </form>
      <p className="f5 gray pa2">You can also </p>
      <Button
        component={Link}
        to="/join-existing"
        variant="contained"
        size="large"
        className="bg-teal-green pa2 white f2 b"
      >
        join an existing shopping list
      </Button>
    </div>
  );
}

function Listview() {
  return <GetList />;
}

function ItemForm() {
  return <AddItem />;
}

export default App;
