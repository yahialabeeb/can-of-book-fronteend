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
     
    };
  }

  // loginHandler = (user) => {
  //   this.setState({
  //     user,
  //   });
  // };

  // logoutHandler = () => {
  //   this.setState({
  //     user: null,
  //   });
  // };
  // 
  componentDidMount = (userEmail) => {
    
    if (userEmail){    console.log(userEmail)
    }else{
    axios.get(`${process.env.REACT_APP_API_URL}/books?email=${userEmail}`)
      .then((book) => {
        console.log(book);
        this.setState({ BooksData: book.data });
      })
      .catch((error) => alert(error.message));
    }

  };
  render() {
    return (
      <>
        <Router>
          <Header user={this.state.user} onLogout={this.logoutHandler}
            componentDidMount={this.componentDidMount}
          />

          <Switch>
            <Route exact path="/"></Route>
            <Route exact path="/profile">
              <Profile />
            </Route>
          </Switch>
          <BookInfo
          BooksData={this.state.BooksData} />
          <Footer />
        </Router>
      </>
    );
  }
}

export default App;
