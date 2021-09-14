import React from "react";
import Row from 'react-bootstrap/Row'
import Card from "react-bootstrap/Card";


class BookInfo extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      anything: "",

    };
  }


  render() {
    return (
      this.props.BooksData.length > 0 && (
        <>
          <Row md='4' >
            {this.props.BooksData.map((book, idx) => {
              return (
                <div key={idx}>
                  <Card style={{ width: "18rem" }}>
                    <Card.Body key={idx}>
                      <Card.Title>{book.title}</Card.Title>

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
