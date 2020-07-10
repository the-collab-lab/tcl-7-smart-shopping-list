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
} from 'react-router-dom';

function App() {
  return (
    <div className="App">
      <Router>
        <main className="pt-0 sm:pt-2 wallpaper">
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
    <div className="bg-white container sm:mt-3 mx-auto rounded shadow-lg xs:min-h-screen sm:min-h-0 max-w-screen-sm lg:max-w-screen-md px-6 py-3">
      <form className="p-4" onSubmit={handleSubmit}>
        <h1 className="font-display text-3xl font-bold mb-3 p-4">
          Welcome to your smart shopping list!
        </h1>
        <p className="m-3 font-body text-xl text-gray-700">
          Get started by creating a new list.
        </p>
        <button
          className="bg-green-700 text-white font-body font-bold text-lg w-3/6 rounded-lg mb-2 p-3 shadow-sm"
          type="submit"
        >
          Create shopping list
        </button>
      </form>
      <p className="line-text text-gray-700">Or</p>
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
