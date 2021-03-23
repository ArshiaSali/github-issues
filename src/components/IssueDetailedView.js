import React, { Component } from 'react';
import Image from 'react-bootstrap/Image';
import Modal from 'react-bootstrap/Modal'
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import Col from 'react-bootstrap/Col';

class IssueDetailedView extends Component {
    constructor(props){
        super(props)
        this.state = {
       
        }
    }
    render() {
        return (
            <Modal size="lg" show={this.props.showDetails} onHide={this.props.close} >
            <Modal.Header closeButton>
            <Modal.Title>Details of Issue # {this.props.currentIssue.id}</Modal.Title>
            </Modal.Header>
            <Modal.Body>
            <Image src={this.props.currentIssue.user.avatar_url} alt="profile image" roundedCircle />
            <Form>
            <Form.Row>
                    <Form.Group as={Col} controlId="issueId">
                    <Form.Label>Id</Form.Label>
                    <Form.Control type="text" value={this.props.currentIssue.id}/>
                    </Form.Group>
            
                    <Form.Group as={Col} controlId="issueOwner">
                    <Form.Label>Owner</Form.Label>
                    <Form.Control type="text" value={this.props.currentIssue.user.login}/>
                    </Form.Group>
            
                    <Form.Group as={Col} controlId="issueStatus">
                    <Form.Label>Status</Form.Label>
                    <Form.Control type="text" value={this.props.currentIssue.state}>
                    </Form.Control>
                    </Form.Group>
            
                </Form.Row>
                <Form.Row>
                    <Form.Group as={Col} controlId="issueTitle">
                    <Form.Label>Title</Form.Label>
                    <Form.Control type="text" value={this.props.currentIssue.title} />
                    </Form.Group>
                </Form.Row>
                <Form.Row>
                    <Form.Group as={Col} controlId="issueBody">
                        <Form.Label>Body</Form.Label>
                        <Form.Control as="textarea" rows={3} value={this.props.currentIssue.body}/>
                    </Form.Group>
                </Form.Row>
                <Form.Row>
                    <Form.Group as={Col} controlId="issueCreatedAt">
                    <Form.Label>Created At</Form.Label>
                    <Form.Control type="text" value={this.props.currentIssue.created_at}/>
                    </Form.Group>
            
                    <Form.Group as={Col} controlId="issueUpdatedAt">
                    <Form.Label>Updated At</Form.Label>
                    <Form.Control type="text" value={this.props.currentIssue.updated_at}/>
                    </Form.Group>
            
                </Form.Row>
                </Form>
            </Modal.Body>
            <Modal.Footer>
            <Button variant="secondary" onClick={this.props.close}>
                Close
            </Button>
            </Modal.Footer>
            </Modal>
        );
    }
}
export default IssueDetailedView;

