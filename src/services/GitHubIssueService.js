import axios from 'axios';

const GITHUB_ISSUE_BASE_URL = "https://api.github.com/repos/walmartlabs/thorax/issues";

class GitHubIssueService {
   
    getIssues(){
        return axios.get(GITHUB_ISSUE_BASE_URL);
    }

    getIssueByNumber(issueNumber){
        return axios.get(GITHUB_ISSUE_BASE_URL + '/' + issueNumber);
    }
}
export default new GitHubIssueService()

