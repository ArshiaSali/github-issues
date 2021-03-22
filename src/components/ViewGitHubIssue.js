import React, { Component } from 'react'
import GitHubIssueService from '../services/GitHubIssueService'

class ViewGitHubIssue extends Component {
    constructor(props) {
        super(props)

        this.state = {
            number: this.props.match.params.number,
            issue: {}
        }
    }
    back(){
        console.log("back");
        this.props.history.goBack();
    }

    componentDidMount(){
        GitHubIssueService.getIssueByNumber(this.state.number).then( res => {
            this.setState({issue: res.data});
        })
    }

    render() {
        return (
            <div>
                <br></br>
                <div className = "card col-md-6 offset-md-3">
                <button style={{marginLeft: "10px"}} onClick={ () => this.back()} className="btn btn-info">Back </button>
                    <h3 className = "text-center"> View Issue Details</h3>
                    <div className = "card-body">
                        <div className = "row">
                            <label> Issue Id: </label>
                            <div> { this.state.issue.id }</div>
                        </div>
                        <div className = "row">
                            <label> Issue Title: </label>
                            <div> { this.state.issue.title }</div>
                        </div>
                        <div className = "row">
                            <label> Issue State: </label>
                            <div> { this.state.issue.state }</div>
                        </div>
                    </div>

                </div>
            </div>
        )
    }
}

export default ViewGitHubIssue
