import ListGitHubIssues from './components/ListGitHubIssues';
import {BrowserRouter as Router, Route, Switch} from 'react-router-dom';
import './App.css';
import HeaderGitHubIssues from './components/HeaderGitHubIssues';

function App() {
  return (
    <div>
      <Router>
        <HeaderGitHubIssues />
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
