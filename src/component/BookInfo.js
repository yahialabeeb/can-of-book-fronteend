import React from "react";

import Row from "react-bootstrap/Row";

import Card from "react-bootstrap/Card";

import UpdateBook from "./component/UpdateBook";

import Row from 'react-bootstrap/Row'
import Card from "react-bootstrap/Card";



class BookInfo extends React.Component {
  constructor(props) {
    super(props);
    this.state = {

      bookData: [],
      anything: "",
      showUpdateModal: false,
      selectedBookDataObj: {}

   


    };
  }

  // update data code -----------------------------
  handelUpdateModal = (e) => {
    e.preventDefault();

    const reqBody = {
      title: e.target.bookTitle.value,
      description: e.target.bookDescription.value,
      email: e.target.email.value,
    };
    axios
      .put(
        `${process.env.REACT_APP_API_URL}/book/${this.state.selectedBookDataObj._id}`,
        reqBody
      )
      .then((updatedBookObject) => {
        const updateBookArr = this.state.BooksData.map((book) => {
          if (book._id === this.state.selectedBookDataObj._id) {
            book = updatedBookObject.data;

            return book;
          }

          return book; // we add this to make sure that we dont get undefined values when we dont find a match
        });

        this.setState({
          bookData: updateBookArr,
          selectedBookDataObj: {},
        });

        this.handelDisplayUpdateModal(); // hide the update modal
      })
      .catch(() => alert("Something went wrong!"));
  };
  render() {
    return (
      this.props.BooksData.length > 0 && (
        <>

          <Row md="4">

      

            {this.props.BooksData.map((book, idx) => {
              return (
                <div key={idx}>
                  {this.state.showUpdateModal && (
                    <>
                      {/*
                       *update form    -----------------------
                       */}
                      <UpdateBook
                        show={this.state.showUpdateModal}
                        handelUpdateModal={this.handelUpdateModal}
                        handelDisplayUpdateModal={this.handelDisplayUpdateModal}
                        selectedBookDataObj={this.state.selectedBookDataObj}
                      />
                    </>
                  )}
                  <Card style={{ width: "18rem" }}>
                    <Card.Body key={idx}>
                      <Card.Title>{book.title}</Card.Title>


                      <p>{book.description}</p>
                      <p>{book.status}</p>
                      <p>{book.email}</p>
                      <Button
                        variant="warning"
                        onClick={() => this.handelDisplayUpdateModal(book)}
                      >
                        Update Book
                      </Button>
                    </Card.Body>
                  </Card>
                </div>

                      <p>Description: {book.description}</p>
                      <p>status{book.status}</p>
                      <p>User Email:{book.email}</p>
                      <button onClick={()=>{this.props.deleteBook(book._id)}}>Delete</button>
                    </Card.Body>
                  </Card>
                </div>


              );
            })}
          </Row>
        </>
      )
    );
  }
}

export default BookInfo;
