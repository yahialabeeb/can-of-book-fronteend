import React from "react";
import Header from "./component/Header";
import Footer from "./component/Footer";
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
      login: false

    };
  }

  // login
  componentDidMount = (email, loginstate) => {

    if (email) {
      axios.get(`${process.env.REACT_APP_API_URL}/books?email=${email}`)
        .then((book) => {
          console.log(book);
          this.setState({
            BooksData: book.data,
            userEmail: email,
            login: loginstate
          });
        })
        .catch((error) => alert(error.message));

    } else {
      console.log(email)
    }
  }

  handelLogout = () => {
    this.setState({
      BooksData: [],
      userEmail: '',
      login: false
    });
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

          />
          <Footer />
        </Router>
      </>
    );
  }
}


export default App;