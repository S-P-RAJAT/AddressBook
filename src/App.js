import "./App.css";
import PayrollForm from "./components/address_book_form/AddressBookForm";

import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect,
} from "react-router-dom";

function App() {
  return (
    <div className="App">
      <div className="App">
        <Router>
          <Switch>
            <Route exact path="/form">
              <PayrollForm />
            </Route>
            <Route exact path="/form/:id">
              <PayrollForm />
            </Route>
          </Switch>
        </Router>
      </div>
    </div>
  );
}

export default App;
