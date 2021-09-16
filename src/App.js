
import React from "react";
import Header from "./component/Header";
import Footer from "./component/Footer";
import BookFormModal from "./component/BookFormModal";
import Profile from "./Profile";
import "bootstrap/dist/css/bootstrap.min.css";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import BookInfo from "./component/BookInfo";
import UpdateBook from "./component/UpdateBook";
import axios from "axios";
import { withAuth0 } from '@auth0/auth0-react';


class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      BooksData: [],
      userEmail: "",
      showAddBookForm: false,
      login: false,
      selectedBookDataObj: {},
      showUpdateModal: false


    };
  }


  // login
  getData = () => {

    if (this.props.auth0.user){
      axios.get(`${process.env.REACT_APP_API_URL}/books?email=${this.props.auth0.user.email}`)
        .then((book) => {
          console.log(book);
          this.setState({
            BooksData: book.data,
            userEmail: this.props.auth0.user.email,

          });

        })
        .catch((error) => alert(error.message));
      }
      
  }

  // handelLogout = () => {
  //   this.setState({
  //     BooksData: [],
  //     userEmail: '',
  //     login: false,
  //     showUpdateModal: false
  //   });
  // }


  //------------------------------------------------------
  // adding book 
  addBook = async (e) => {
    e.preventDefault();
    console.log('work')

    let bookInfo = {
      title: e.target.bookName.value,
      description: e.target.description.value,
      email: this.props.auth0.user.email,
      status: e.target.status.value,
    }
    console.log(bookInfo)
    let bookInfoData = await axios.post(`${process.env.REACT_APP_API_URL}/addbook`, bookInfo)

    await this.setState({
      BooksData: bookInfoData.data,
      showAddBookForm: false // hide form and show button
    })

    alert(`${bookInfo.title} successfully added`)


  }
  // handle button and form showing
  getAddBookForm = async () => {
    await this.setState({
      showAddBookForm: true
    })
  }


  // delete----------------------------------------------
  deleteBook = async (bookID) => {


    let booksInfo = await axios.delete(`${process.env.REACT_APP_API_URL}/deletebook/${bookID}?email=${this.props.auth0.user.email}`)

    this.setState({
      BooksData: booksInfo.data
    })
    alert('successfully deleted')
  }
  // update data code -----------------------------
  updateBook = async (bookID) => {
    let chosenBook = this.state.BooksData.find(book => {

      return book._id === bookID
    })
    console.log({ chosenBook });
    await this.setState({
      showUpdateModal: true,
      selectedBookDataObj: chosenBook
    })
  }

  updateBookModal = (e) => {
    e.preventDefault();

    const reqBody = {
      email: this.state.userEmail,
      title: e.target.bookTitle.value,
      description: e.target.bookDescription.value,
      status: e.target.status.value,
    };
    axios
      .put(
        `${process.env.REACT_APP_API_URL}/updatebook/${this.state.selectedBookDataObj._id}`,
        reqBody
      )
      .then((userbooks) => {
        this.setState({
          BooksData: userbooks.data,
          selectedBookDataObj: {},
          showUpdateModal: false,
        });

      })
      .catch(() => alert("Something went wrong!"));
  };
  closeupdatemodal = () => {
    console.log("hi")
    this.setState({
      showUpdateModal: false,
    });
  }
  componentDidUpdate(){
    this.getData();
  }
  render() {
    
    const { isAuthenticated } = this.props.auth0;
    return (
      <>
        <Router>
          <Header
            componentDidMount={this.componentDidMount}
            handelLogout={this.handelLogout}
            key={this.state.userEmail}
          />

          <Switch>
            <Route exact path="/">
              {isAuthenticated &&
                <BookInfo
                  BooksData={this.state.BooksData}
                  deleteBook={this.deleteBook}
                  updateBook={this.updateBook}
                  
                />
              }
              {!this.state.showAddBookForm && isAuthenticated &&
                <button onClick={this.getAddBookForm}>
                  Add book
                </button>
              }
            </Route>
            <Route exact path="/profile">
              <Profile />
            </Route>
          </Switch>



          <BookFormModal
            showAddBookForm={this.state.showAddBookForm}
            addBook={this.addBook}
          />
          {this.state.showUpdateModal && (
            <>
              <UpdateBook
                show={this.state.showUpdateModal}
                updateBook={this.updateBook}
                updateBookModal={this.updateBookModal}
                selectedBookDataObj={this.state.selectedBookDataObj}
                closeupdatemodal={this.closeupdatemodal}
              />
            </>
          )}
          <Footer />
        </Router>
      </>
    );
  }
}


export default withAuth0(App);
