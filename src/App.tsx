import Confirmation from 'pages/confirmation/confirmation';
import Successful from 'pages/successful/successful';
import { Redirect, Route, Switch } from 'react-router';
import './App.scss';
import Exchange from './pages/exchange/exchange';

function App() {
  return (
    <div className="App">
      <Switch>
        <Route exact path="/" render={() => <Redirect to="/exchange" />} />
        <Route path="/exchange" render={() => <Exchange />} />
        <Route path="/confirmation" render={() => <Confirmation />} />
        <Route path="/successful" render={() => <Successful/>} />
        <Route path="*" render={() => <div>404 NotFound</div>} />
      </Switch>
    </div>
  );
}

export default App;
