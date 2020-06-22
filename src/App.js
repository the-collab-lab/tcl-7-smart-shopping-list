import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';
import { hasLocalToken, setLocalToken } from './lib/token.js';
import GetList from './Components/getList.js';
import AddItem from './Components/addItem.js';
import ShareList from './Components/shareList.js';
import { Button, Form } from 'react-bootstrap';
import ItemDetailPage from './Components/itemDetail';

import {
  BrowserRouter as Router,
  useHistory,
  Switch,
  Route,
} from 'react-router-dom';

function App() {
  return (
    <div className="App">
      <Router>
        <main className="pt2 wallpaper">
          <Switch>
            <Route path="/list-item/:docId">
              <ItemDetailPage />
            </Route>
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
    <div className="wrapper shadow bg-white brd pa2">
      <Form className="pa2" onSubmit={handleSubmit}>
        <h1 className="deep-blue f1 pa2 b">
          Welcome to your smart shopping list!
        </h1>
        <p className="deep-blue f3">Get started by creating a new list.</p>
        <Button className="white f2 b btn" type="submit">
          Create shopping list
        </Button>
      </Form>
      <p className="line-text deep-blue">Or</p>
      <div>
        <ShareList />
      </div>
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
