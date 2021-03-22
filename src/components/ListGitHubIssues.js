import React, { Component } from 'react'
import GitHubIssueService from '../services/GitHubIssueService'

class ListGitHubIssues extends Component {
    constructor(props) {
        super(props)
        this.state = {
                issues: []
        }
    }
    componentDidMount(){
        GitHubIssueService.getIssues().then((res) => {
            this.setState({ issues: res.data});
        });
    }
    render() {
        console.log(this.state.issues);
        return (
            <div>
                 <h2 className="text-center">Issues List</h2>
                 <br></br>
                 <div className = "row">
                        <table className = "table table-striped table-bordered">

                            <thead>
                                <tr>
                                    <th> Issue Id</th>
                                    <th> Title</th>
                                    <th> State</th>
                                    <th> Actions</th>
                                </tr>
                            </thead>
                            <tbody>
                                {
                                    this.state.issues.map(
                                        issue => 
                                        <tr key = {issue.id}>
                                             <td> { issue.id} </td>   
                                             <td> {issue.title}</td>
                                             <td> {issue.state}</td>
                                             <td>
                                                 <button style={{marginLeft: "10px"}} className="btn btn-info">View </button>
                                             </td>
                                        </tr>
                                    )
                                }
                            </tbody>
                        </table>

                 </div>
            </div>
        )
    }
}

export default ListGitHubIssues
