import React from "react";




class Login extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      showForm: false,

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
    this.props.componentDidMount(UserEmail)
  }


    render() {
      return (
        <>
          {(this.state.showForm !== 0) &&
            < button onClick={this.handelLogin} >
              log in
            </button>
          }
          {this.state.showForm &&
            < form onSubmit={this.getData}>
              <label>Enter your Email and User Name</label>
              <input type="text" name='Email' placeholder='Enter your Email       ' />
              <input type="text" name='User name' placeholder='Enter your User Name' />
              <input type="submit" value="Log in" />
            </form>}
        </>
      );
    }
  }

export default Login;
