import React, { Component } from 'react'
import GitHubIssueService from '../services/GitHubIssueService'
import ReactPaginate from 'react-paginate';
import Table from 'react-bootstrap/Table';
import Button from 'react-bootstrap/Button';
import IssueDetailedView from './IssueDetailedView';

class ListGitHubIssues extends Component {
    constructor(props) {
        super(props)
        this.state = {
                issues: [],
                currentPage:0,
                showModal : false,
                selectedIssue:{}
        }
        this.handlePageClick = this.handlePageClick.bind(this);
        this.handleClose = this.handleClose.bind(this);
        this.handleShow = this.handleShow.bind(this);
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
    handleClose(){
        this.setState({showModal:false})
    }
    handleShow(issue){
        this.setState(
            {showModal:true,
            selectedIssue:issue})
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
                     <Button variant="secondary" size="sm" onClick={ () => this.handleShow(issue)}>Show Details </Button>
                     </td>
                </tr>
            );
        const pageCount = Math.ceil(this.state.issues.length / PER_PAGE);
        console.log(this.state.issues);
        return (
            <div>
                 <h2 className="text-center">Issues</h2>
                 <br></br>
                 <div className = "row">
                        <Table striped bordered hover size="sm" variant="dark">
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
                        </Table>
                 </div>
                 <br />
                 <br />
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
                  {Object.keys(this.state.selectedIssue).length === 0 ? null : 
                 <IssueDetailedView showDetails={this.state.showModal} currentIssue={this.state.selectedIssue} close={this.handleClose}/>
                }
            </div>
        )
    }
}

export default ListGitHubIssues
