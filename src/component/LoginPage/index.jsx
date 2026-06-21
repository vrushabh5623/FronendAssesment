import { Component } from "react";
import {Redirect} from 'react-router-dom'
import Cookies from 'js-cookie'
import './index.css'

class LoginPage extends Component{
  state = {
    email:'',
    password: '',
    errorStatus:false,
    showerror:''
  }

  onSuccess = (jwtToken) =>{
    const {history} = this.props
    Cookies.set('jwt_token2',jwtToken,{expires:30,path:'/'})
    history.replace('/')
    const {email,password} = this.state
    localStorage.setItem('email',email)
    localStorage.setItem('password',password)
  }

  onSubmitForm = async(event)=>{
    event.preventDefault()
    const {email,password} = this.state
    const userDetails = {email,password}
    const url = 'https://v9fes04dwf.execute-api.eu-north-1.amazonaws.com/api/auth/signin'
    const options = {
      method: 'POST',
      body:JSON.stringify(userDetails)
    }
    const response = await fetch(url,options)
    const data = await response.json()
    // console.log(data)
    if (response.ok === true){
      this.onSuccess(data.data.token)
    }else{
      this.setState({errorStatus: true, showerror: data.message})
    }
  }

  getusername = (event) =>{
    this.setState({email: event.target.value})
  }

  getpassword = (event) =>{
    this.setState({password: event.target.value})
  }


  
  renderUserInput = () =>{
    const {email} = this.state
    return(
      <div>
        <label htmlFor="username"className="userlable">Email</label>
        <br/>
        <input type="email" id="username" value={email} onChange={this.getusername}  className="userinput" placeholder="username"/>
      </div>
    )
  }

  renderPassword = () =>{
    const {password} = this.state
    return(
      <div>
        <label htmlFor="password" className="passlable">Password</label>
        <br/>
        <input type="password" value={password} onChange={this.getpassword} id="password" className="passinput"/>
      </div>
    )
  }


  render(){
    const {errorStatus, showerror} = this.state
    const jwtToken = Cookies.get('jwt_token2')
    if(jwtToken !== undefined){
      return <Redirect to='/'/>
    }
    return(
      <div className="login-main-container">
        <form className="form-bg" onSubmit={this.onSubmitForm}>
          <div className="login-align-div">
            <h1 className="login-head">Go Business</h1>
            <p className="tag-line">Sign in to open your referral dashboard.</p>
            {this.renderUserInput()}
            {this.renderPassword()}
            <div className="error-div">
              {
                errorStatus&&(<p className="error">{showerror}</p>)
              }
              
            </div>
            <button className="sign-btn" type="submit">Sign in</button>
          </div>
        </form>
      </div>
    )
  }
}

export default LoginPage