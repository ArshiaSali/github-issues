import React, { Component } from 'react'
import GitHubIssueService from '../services/GitHubIssueService'
import ReactPaginate from 'react-paginate';
import Table from 'react-bootstrap/Table';
import Image from 'react-bootstrap/Image';
import Modal from 'react-bootstrap/Modal'
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import Col from 'react-bootstrap/Col';

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
                  {Object.keys(this.state.selectedIssue).length === 0 ? 
                  null : 
                  
                  <Modal size="lg" show={this.state.showModal} onHide={this.handleClose} >
                    <Modal.Header closeButton>
                    <Modal.Title>Details of Issue # {this.state.selectedIssue.id}</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                    <Image src={this.state.selectedIssue.user.avatar_url} alt="profile image" roundedCircle />
                    <Form>
                    <Form.Row>
                            <Form.Group as={Col} controlId="issueId">
                            <Form.Label>Id</Form.Label>
                            <Form.Control type="text" value={this.state.selectedIssue.id}/>
                            </Form.Group>

                            <Form.Group as={Col} controlId="issueOwner">
                            <Form.Label>Owner</Form.Label>
                            <Form.Control type="text" value={this.state.selectedIssue.user.login}/>
                            </Form.Group>

                            <Form.Group as={Col} controlId="issueStatus">
                            <Form.Label>Status</Form.Label>
                            <Form.Control type="text" value={this.state.selectedIssue.state}>
                            </Form.Control>
                            </Form.Group>

                        </Form.Row>
                        <Form.Row>
                            <Form.Group as={Col} controlId="issueTitle">
                            <Form.Label>Title</Form.Label>
                            <Form.Control type="text" value={this.state.selectedIssue.title} />
                            </Form.Group>
                        </Form.Row>
                        <Form.Row>
                            <Form.Group as={Col} controlId="issueBody">
                                <Form.Label>Body</Form.Label>
                                <Form.Control as="textarea" rows={3} value={this.state.selectedIssue.body}/>
                            </Form.Group>
                        </Form.Row>
                        <Form.Row>
                            <Form.Group as={Col} controlId="issueCreatedAt">
                            <Form.Label>Created At</Form.Label>
                            <Form.Control type="text" value={this.state.selectedIssue.created_at}/>
                            </Form.Group>

                            <Form.Group as={Col} controlId="issueUpdatedAt">
                            <Form.Label>Updated At</Form.Label>
                            <Form.Control type="text" value={this.state.selectedIssue.updated_at}/>
                            </Form.Group>

                        </Form.Row>
                        </Form>
                    </Modal.Body>
                    <Modal.Footer>
                    <Button variant="secondary" onClick={this.handleClose}>
                        Close
                    </Button>
                    </Modal.Footer>
                </Modal>
                  
               }
                
            </div>
        )
    }
}

export default ListGitHubIssues
