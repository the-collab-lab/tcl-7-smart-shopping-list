import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';
import { hasLocalToken, setLocalToken } from './lib/token.js';
import GetList from './Components/getList.js';
import AddItem from './Components/addItem.js';
import ShareList from './Components/shareList.js';
import ItemDetailPage from './Components/itemDetail';

import {
  BrowserRouter as Router,
  useHistory,
  Switch,
  Route,
  NavLink,
  Link,
  useParams,
} from 'react-router-dom';

function App() {
  return (
    <div className="App">
      <Router>
        <main className="bg-blue pa1">
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
        <footer>
          <nav>
            <NavLink to="/list-view">
              <img src="/img/list.svg" alt="view list" />
            </NavLink>
            <NavLink to="/add-item">
              <img src="/img/add.svg" alt="add item" />
            </NavLink>
          </nav>
        </footer>
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
    <form className="shadow bg-white pa2" onSubmit={handleSubmit}>
      <h1 className="b f1">Welcome to your smart shopping list!</h1>
      <p className="f3">Tap “Create shopping list” to get started.</p>
      <button className="bg-green ph2 pv1 white f2 b">
        Create shopping list
      </button>
      <p className="f5 gray">
        You can also{' '}
        <Link className="black" to="/join-existing">
          join an existing shopping list
        </Link>
        .
      </p>
    </form>
  );
}

function Listview() {
  return <GetList />;
}

function ItemForm() {
  return <AddItem />;
}

export default App;
