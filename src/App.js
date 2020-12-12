import { Switch, Route } from 'react-router-dom'
import * as V from './views'

function App() {

  if ('geolocation' in navigator) {
    console.log('Available');
    navigator.geolocation.getCurrentPosition(async ({coords}) => {
      const { latitude, longitude } = coords
      
    })
  } else {
    console.log('Not Available');
  }


  return (
      <Switch>
        <Route exact path="/" component={V.Home} />
        <Route exact path="/search" component={V.Listing} />
        <Route exact path="/:category" component={V.Listing} />
        <Route path="/item/:id" component={V.Details} />
        <Route exact path="/profile" component={V.Profile} />
        <Route exact path="/chat/:roomId" component={V.Chat} />
      </Switch>
  );
}

export default App;
