 
import React from "react";
import Header from "./component/Header";
import Footer from "./component/Footer";
import BookFormModal from "./component/BookFormModal";
import Profile from "./Profile";
import "bootstrap/dist/css/bootstrap.min.css";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import BookInfo from "./component/BookInfo";
import axios from "axios";



class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      BooksData: [],
      userEmail: "",
      showAddBookForm: false,
      login:false

    };
  }

  // login
  componentDidMount = (email,loginstate) => {

    if (email) {
      axios.get(`${process.env.REACT_APP_API_URL}/books?email=${email}`)
        .then((book) => {
          console.log(book);
          this.setState({ 
            BooksData: book.data,
            userEmail:email,
            login:loginstate
          });
        })
        .catch((error) => alert(error.message));
     
    } else {
      console.log(email)
    }
  }

  handelLogout = ()=>{
    this.setState({ 
      BooksData: [],
      userEmail:'',
      login:false
    });
  }


  //------------------------------------------------------
  // adding book 
  addBook = async (e) => {
    e.preventDefault();
    console.log('work')

    let bookInfo = {
      title: e.target.bookName.value,
      description: e.target.description.value,
      email: this.state.userEmail,
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
   
    // let catsInfo = await axios.delete(`${process.env.REACT_APP_SERVER}/deleteCat?catID=${catID}`)
    let booksInfo = await axios.delete(`${process.env.REACT_APP_API_URL}/deletebook/${bookID}?email=${this.state.userEmail}`)

    this.setState({
      BooksData: booksInfo.data
    })
    alert('successfully deleted')
  }


  render() {
    return (
      <>
        <Router>
          <Header user={this.state.user} onLogout={this.logoutHandler}
            componentDidMount={this.componentDidMount}
            handelLogout={this.handelLogout}
          />

          <Switch>
            <Route exact path="/"></Route>
            <Route exact path="/profile">
              <Profile />
            </Route>
          </Switch>

          <BookInfo
            BooksData={this.state.BooksData} 
            deleteBook={this.deleteBook}
            />
          {!this.state.showAddBookForm && this.state.login &&
            <button onClick={this.getAddBookForm}>
              Add book
            </button>
          }
          <BookFormModal
            showAddBookForm={this.state.showAddBookForm}
            addBook={this.addBook}
            
          />
          <Footer />
        </Router>
      </>
    );
  }
}


export default App;
