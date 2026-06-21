import { Component } from "react";
import { GoArrowLeft } from "react-icons/go";
import {Link} from 'react-router-dom'
import Cookies from "js-cookie";
import Header from "../Header";
import './index.css'


class DetailsPage extends Component{
  state = {
    regferalDetailslist: [],
  }

  // onBackbtClick = () =>{
  //   const {history} = this.props
  //   history.replace('/')
  // }

  componentDidMount = () =>{
    this.getReferalDetails()
  }

  getReferalDetails = async() =>{
    const {match} = this.props
    const {params} = match
    const {id} = params
    // console.log(id)
    const jwtToken = Cookies.get('jwt_token2')
    const api = `https://v9fes04dwf.execute-api.eu-north-1.amazonaws.com/api/referrals?id=${id}`
    const options = {
      method:'GET',
      headers:{
        Authorization: `Bearer ${jwtToken}`
      }
    }
    const response = await fetch(api,options)
    const data = await response.json()
    console.log(data)
    if (response.ok === true){
      this.setState({regferalDetailslist:data.data.referrals[0]})
    }
  }


  render(){
    const {regferalDetailslist} = this.state
    return(
      <div>
        <div className="home-bg">
          <Header/>
          <div className="referal-div">
            <div className="back-btn-cotainer">
              <Link to='/' className='link2'>
                <GoArrowLeft className="left-icon"/>
                <>
                <button className="left-back-btn">Back to dashboard</button>
                </>
              </Link>
            </div>

            <div>
              <h1 className="referal-head">Referral Details</h1>
              <p className="referal-para">Full information for this referal partner.</p>
            </div>

            <div className="overview-div">
              <div className="rekha-div">
                <h1 className="referal-name">{regferalDetailslist.name}</h1>
                <span className="hr-bg">{regferalDetailslist.serviceName
}</span>
              </div>
              <hr/>

              <div className="referal-id-div">
                <p className="detail-para">referal id</p>
                <p className="detail-id">{regferalDetailslist.id}</p>
              </div>
              <hr/>


              <div className="referal-id-div">
                <p className="detail-para">Name</p>
                <p className="detail-id">{regferalDetailslist.name}</p>
              </div>
              <hr/>
              <div className="referal-id-div">
                <p className="detail-para">service name</p>
                <p className="detail-id">{regferalDetailslist.serviceName}</p>
              </div>
              <hr/>
              <div className="referal-id-div">
                <p className="detail-para">date</p>
                <p className="detail-id">{regferalDetailslist.date}</p>
              </div>
              <hr/>
              <div className="referal-id-div">
                <p className="detail-para">profit</p>
                <p className="detail-id">{regferalDetailslist.profit}</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    )
  }
}

export default DetailsPage