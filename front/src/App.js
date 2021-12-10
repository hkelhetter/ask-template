import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';

import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect,
} from 'react-router-dom';

// Components
import TopBar from './components/TopBar';

// Page
import Question from './page/Question';
import ListQuestions from './page/ListQuestions';
import Answer from './page/Answer';

function App() {
  return (
    <Router>
      <TopBar />

      <Switch>
        <Route path="/answer/:id">
          <Answer />
        </Route>

        <Route path="/ask">
          <Question />
        </Route>

        <Route exact path="/">
          <ListQuestions />
        </Route>

        <Redirect to="/" />
      </Switch>
    </Router>
  );
}

export default App;
