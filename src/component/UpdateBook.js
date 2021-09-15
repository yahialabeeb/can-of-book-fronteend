import React, { Component } from "react";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";

export class UpdateBook extends Component {
  render() {
    return (
      <Modal
        show={this.props.show}
        onHide={this.props.handelDisplayUpdateModal}
      >
        <Modal.Header closeButton>
          <Modal.Title>Update Book</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form onSubmit={this.props.handelUpdateModal}>
            <Form.Group className="mb-3">
              <Form.Label>Book Title</Form.Label>
              <Form.Control
                type="text"
                name="bookTitle"
                placeholder="Enter Book Title"
                defaultValue={this.props.selectedBookDataObj.title}
              />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>Cat Breed</Form.Label>
              <Form.Control
                type="text"
                name="bookDescription"
                placeholder="Enter Book Description"
                defaultValue={this.props.selectedCatDataObj.description}
              />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>E-mail</Form.Label>
              <Form.Control
                type="text"
                name="email"
                placeholder="Enter email"
                defaultValue={this.props.selectedCatDataObj.email}
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
