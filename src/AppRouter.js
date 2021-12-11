import React from "react";
import { HashRouter as Router, Switch, Route } from "react-router-dom";
import { Home, Favorites } from "pages";
import { ThemeProvider } from "theme";
import { createStore, combineReducers } from "redux";
import { Provider } from "react-redux";
import NavBar from "components/NavBar";
import { favoriteUsersReducer, countryReducer } from "redux/reducers";

const store = createStore(combineReducers({ favoriteUsersReducer, countryReducer }));

const AppRouter = () => {
  return (
    <ThemeProvider>
      <Provider store={store}>
        <Router>
          <NavBar />
          <Switch>
            <Route exact path="/" component={Home} />
            <Route exact path="/favorites" component={Favorites} />
          </Switch>
        </Router>
      </Provider>
    </ThemeProvider>
  );
};

export default AppRouter;
