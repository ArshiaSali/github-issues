import ListGitHubIssues from './components/ListGitHubIssues';
import {BrowserRouter as Router, Route, Switch} from 'react-router-dom';
import './App.css';

function App() {
  return (
    <div>
      <Router>
          <div className="container">
              <Switch> 
                    <Route path = "/" exact component = {ListGitHubIssues}></Route>
                    <Route path = "/issues" component = {ListGitHubIssues}></Route>
              </Switch>
          </div>
        </Router>
    </div>
  );
}

export default App;
