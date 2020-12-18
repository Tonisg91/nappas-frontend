import { Switch, Route } from 'react-router-dom'
import * as V from './views'

function App() {

  return (
      <Switch>
          <Route exact path="/" component={V.Home} />
          <Route exact path="/search" component={V.Listing} />
          <Route exact path="/search/:category" component={V.Listing} />
          <Route path="/item/:id" component={V.Details} />
          <Route exact path="/profile" component={V.Profile} />
          <Route exact path="/chat/:roomId" component={V.Chat} />
          <Route exact path="/signup" component={V.Auth} />
          <Route exact path="/login" component={V.Auth} />
      </Switch>
  );
}

export default App;
