import React from 'react';
import Home from './pages/Home';
import { Container } from 'semantic-ui-react';
import { Route, BrowserRouter as Router, Switch } from 'react-router-dom';
import Callback from './pages/Callback';
import PlaylistDetail from './pages/PlaylistDetail';
const App = () => (
  <Router>
    <Container>
      <Switch>
        <Route exact path="/" component={Home} />
        <Route path="/callback" component={Callback} />
        <Route path="/playlist/:uri" component={PlaylistDetail} />
        {/*<Route path="/faq" component={FAQ} />*/}
      </Switch>
    </Container>
  </Router>
);
export default App;
