import axios from 'axios';

const GITHUB_REPO = "thorax";
const GITHUB_ORGANIZATION = "walmartlabs";
const GITHUB_ISSUE_BASE_URL = 'https://api.github.com/repos/'+GITHUB_ORGANIZATION+'/'+GITHUB_REPO+'/issues';

class GitHubIssueService {
   
    getIssues(){
        return axios.get(GITHUB_ISSUE_BASE_URL);
    }
}
export default new GitHubIssueService()

