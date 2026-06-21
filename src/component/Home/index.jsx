import { Component } from "react";
import Header from "../Header";
import RefDashboard from "../RefDashboard";
import Footer from "../Footer";
import './index.css'

class Home extends Component{
  render(){
    return(
      <div>
      <div className="home-bg">
        <Header/>
        <RefDashboard/>
      </div>
      <Footer/>
      </div>
    )
  }
}

export default Home