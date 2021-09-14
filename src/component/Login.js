import React from "react";


class Login extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      showForm: false,
      login: false,
      user: "",
    };
  }
  handelLogin = () => {
    this.setState({
      showForm: true
    })
  };

  getData = async (e) => {
    e.preventDefault();

    let UserEmail = e.target.Email.value;
    console.log(UserEmail);
    await this.setState({
      showForm: false,
      login: true,
      user:e.target.Username.value
    })
    this.props.componentDidMount(UserEmail, this.state.login)
    
  }
  
  handelLogout=()=>{
    this.setState({
      showForm: true,
      login: false,
      user:''
    })
    this.props.handelLogout()

  }

  render() {
    return (
      <>
        {(this.state.showForm !== 0) && (this.state.login === false) &&
          < button onClick={this.handelLogin} >
            log in
          </button>
        }
        {this.state.showForm &&
          < form onSubmit={this.getData}>
            <label>Enter your Email and User Name</label>
            <input type="text" name='Email' placeholder='Enter your Email       ' />
            <input type="text" name='Username' placeholder='Enter your User Name' />
            <input type="submit" value="Log in" />
          </form>}
        {this.state.login &&
        <>
          <p style={{color:"white"}}>
            Welcome {this.state.user}
          </p> 
           < button onClick={this.handelLogout} >
           log out
         </button>
        </>
        }
      </>
    );
  }
}

export default Login;
