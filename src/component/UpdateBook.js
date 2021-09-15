import React, { Component } from "react";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";

export class UpdateBook extends Component {
  
  constructor(props) {
    super(props);
    this.state = {

    };
  }
  
  
  render() {
    return (
      <Modal
        show={this.props.show}
        // onHide={this.props.showUpdateModal}
      >
        <Modal.Header closeButtoun>
          <Modal.Title>Update Book</Modal.Title>
          <Button variant="primary" onClick={this.props.closeupdatemodal}>
              close
            </Button>
        </Modal.Header>
        <Modal.Body>
          <Form onSubmit={this.props.updateBookModal}>
            <Form.Group className="mb-3">
              <Form.Label>Book Title</Form.Label>
              <Form.Control
                type="text"
                name="bookTitle"
                defaultValue={this.props.selectedBookDataObj.title}
              />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>Description</Form.Label>
              <Form.Control
                type="text"
                name="bookDescription"
                defaultValue={this.props.selectedBookDataObj.description}
              />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>Status</Form.Label>
              <Form.Control
                type="text"
                name="status"
                defaultValue={this.props.selectedBookDataObj.status}
              />
            </Form.Group>

            <Button variant="primary" type="submit">
              Update!
            </Button>
          </Form>
        </Modal.Body>
      </Modal>
    );
  }
}
export default UpdateBook;
