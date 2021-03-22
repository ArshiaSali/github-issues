import React, { Component } from 'react'
import GitHubIssueService from '../services/GitHubIssueService'
import ReactPaginate from 'react-paginate';

class ListGitHubIssues extends Component {
    constructor(props) {
        super(props)
        this.state = {
                issues: [],
                currentPage:0
        }
        this.handlePageClick = this.handlePageClick.bind(this);
    }
    viewIssue(number){
        //console.log(number);
        this.props.history.push(`/${number}`);
    }
    componentDidMount(){
        GitHubIssueService.getIssues().then((res) => {
            this.setState({ issues: res.data});
        });
    }
    handlePageClick({ selected: selectedPage }) {
       // setCurrentPage(selectedPage);
       this.setState({currentPage:selectedPage});
    }
    render() {
        const PER_PAGE = 10;
        const offset = this.state.currentPage * PER_PAGE;
        const currentPageData = this.state.issues
            .slice(offset, offset + PER_PAGE)
            .map(
                issue => 
                <tr key = {issue.id}>
                     <td> { issue.id} </td>   
                     <td> {issue.title}</td>
                     <td> {issue.state}</td>
                     <td>
                     <button style={{marginLeft: "10px"}} onClick={ () => this.viewIssue(issue.number)} className="btn btn-info">View </button>
                     </td>
                </tr>
            );
        const pageCount = Math.ceil(this.state.issues.length / PER_PAGE);
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
                                {currentPageData}
                            </tbody>
                        </table>

                 </div>
                 <ReactPaginate
                    previousLabel={"← Previous"}
                    nextLabel={"Next →"}
                    pageCount={pageCount}
                    onPageChange={this.handlePageClick}
                    containerClassName={"pagination"}
                    previousLinkClassName={"pagination__link"}
                    nextLinkClassName={"pagination__link"}
                    disabledClassName={"pagination__link--disabled"}
                    activeClassName={"pagination__link--active"}
                />
            </div>
        )
    }
}

export default ListGitHubIssues
