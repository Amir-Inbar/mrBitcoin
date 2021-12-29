import React, { Component } from 'react';
import { Route, HashRouter as Router, Switch } from 'react-router-dom';
import Navbar from './cmps/Navbar';
import { ContactDetailsPage } from './pages/ContactDetailsPage';
import { ContactEditPage } from './pages/ContactEditPage';
import { ContactPage } from './pages/ContactPage';
import { HomePage } from './pages/HomePage';
import { SignupPage } from './pages/SignupPage';
import StatisticPage from './pages/StatisticPage';
export class App extends Component {
  render() {
    return (
      <Router>
        <section className="App">
          <Navbar />
          <main className="main-layout">
            <Switch>
              <Route exact path="/" component={HomePage} />
              <Route exact path="/signup" component={SignupPage} />
              <Route exact path="/contacts" component={ContactPage} />
              <Route exact path="/statistic" component={StatisticPage} />
              <Route
                exact
                path="/contacts/edit/:id?"
                component={ContactEditPage}
              />
              <Route
                exact
                path="/contacts/:id"
                component={ContactDetailsPage}
              />
            </Switch>
          </main>
        </section>
      </Router>
    );
  }
}
