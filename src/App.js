import "./App.css";

import { BrowserRouter, Route, NavLink } from "react-router-dom";

import Accueil from "./views/Accueil";
import Ajouter from "./views/Ajouter";
import Infos from "./views/Infos";
import Modification from "./views/Modification";

//  http:/localhost:9000/api/recipes

function App() {
  return (
    <BrowserRouter>
      <div className="App">
        <header>
          <NavLink to="/" activeClassName="selected" className="header-a" exact>
            Accueil
          </NavLink>

          <NavLink
            to="/ajouter"
            activeClassName="selected"
            className="header-a"
            exact
          >
            Ajouter
          </NavLink>
        </header>

        {/*Accueil */}
        <Route path="/" component={Accueil} exact />
        {/*Ajouter */}
        <Route path="/ajouter" component={Ajouter} exact />
      </div>
    </BrowserRouter>
  );
}

export default App;
