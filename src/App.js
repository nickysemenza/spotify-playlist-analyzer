import React from 'react';
import Home from './pages/Home';
import { Container } from 'semantic-ui-react';
import { Route, BrowserRouter as Router, Switch } from 'react-router-dom';
import Callback from './pages/Callback';
import Nav from './components/Nav';
import PlaylistDetail from './pages/PlaylistDetail';
const App = () => (
        <Router>
        <div>
        <Nav/>
        <Container style={{ marginTop: '7em' }}>
      <Switch>
        <Route exact path="/" component={Home} />
        <Route path="/callback" component={Callback} />
        <Route path="/playlist/:uri" component={PlaylistDetail} />
        {/*<Route path="/faq" component={FAQ} />*/}
      </Switch>
    </Container>
  </div></Router>
);
export default App;
