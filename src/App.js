import { Switch, Route } from 'react-router-dom'
import { Home, Profile, Details, Chat } from './views'


function App() {
  return (
      <Switch>
        <Route exact path="/" component={Home} />
        <Route path="/item/:id" component={Details} />
        <Route exact path="/profile" component={Profile} />
        <Route exact path="/chat" component={Chat} />
      </Switch>
  );
}

export default App;
