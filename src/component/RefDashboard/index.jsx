import { Component } from "react";
import Cookies from 'js-cookie'
import { BsCurrencyDollar } from "react-icons/bs";
import AllReferals from "../AllReferals";
import FailureView from "../FailureView";
import './index.css'


const apiStatusConstant = {
  initial: 'INITIAL',
  success: 'SUCCESS',
  failure: 'FAILURE',
  inProgres: 'IN_PROGRESS'
}

class RefDashboard extends Component{
  state = {
    apiStatus: apiStatusConstant.initial,
    overviewlist:[],
    summarylist:[],
    referallink:[],
    referalsData:[],
  }

  componentDidMount = () =>{
    this.getOverviewData()
  }

  

  getOverviewData = async() =>{
    const{selectvalue,searchInput} = this.state
    this.setState({
      apiStatus: apiStatusConstant.inProgres
    })
    const jwtToken = Cookies.get('jwt_token2')
    let url = `https://v9fes04dwf.execute-api.eu-north-1.amazonaws.com/api/referrals`
    const options = {
      method: 'GET',
      headers:{
        Authorization: `Bearer ${jwtToken}`,
      },
    }
    const response = await fetch(url,options)
    const data = await response.json()
    // console.log(data)
    if(response.ok === true){
      const updateOverview = data.data.metrics.map(eachItem=>({
        id:eachItem.id,
        kind:eachItem.kind,
        label:eachItem.label,
        value:eachItem.value
      }))
      this.setState({overviewlist:updateOverview, summarylist:data.data.serviceSummary,referallink:data.data.referral,apiStatus:apiStatusConstant.success,referalsData:data.data.referrals})
    }
    if(response.status === 401){
      this.setState({apiStatus:apiStatusConstant.failure})
    }
  }


  renderDashboard = () =>{
    const {overviewlist,summarylist,referallink,referalsData} = this.state
    return(
      <div className="referal-div">
        <h1 className="referal-head">Referral Dashboard</h1>
        <p className="referal-para">Track your referrals, earnings, and partner activity in one<br/> place.</p>

        {/* overview card Dive or container */}
        <div className="overview-div">
          <h1 className="overview-head">Overview</h1>
          <div className="card-main-container">
            {
              overviewlist.map(eachItem=>(
                <div className="card-bg" key={eachItem.id}>
                  <span className="over-logo"><BsCurrencyDollar /></span>
                  <h1 className="currency">{eachItem.value}</h1>
                  <p className="total-balance">{eachItem.label}</p>
                </div>
              ))
            }
          </div>
        </div>


         {/* overview Summary or container */}
         <div className="overview-div">
          <h1 className="overview-head">Service summary</h1>
          <div className="card-main-container">
            <div className="card-bg">
              <p className="total-balance2">service</p>
              <h1 className="currency2">{summarylist.service}</h1>
            </div>

            <div className="card-bg">
              <p className="total-balance2">your Referrals</p>
              <h1 className="currency3">{summarylist.yourReferrals
}</h1>
            </div>

            <div className="card-bg">
              <p className="total-balance2">active Referrals
</p>
              <h1 className="currency3">{summarylist.activeReferrals}</h1>
            </div>

            <div className="card-bg">
              <p className="total-balance2">total Ref. Earnings
</p>
              <h1 className="currency3">{summarylist.totalRefEarnings
}</h1>
            </div>
          </div>
        </div>

        {/* overview card Dive or container */}
        <div className="overview-div">
          <h1 className="overview-head">Refer friends and earn more</h1>
          <div className="copy-btn-div">
            <div>
              <p className="total-balance2">your referal link</p>
              <div>
                <input className="link-input" type='link' placeholder={referallink.link}/>
                <button className="copy-btn">Copy</button>
              </div>
            </div>

            <div>
              <p className="total-balance2">your referal link</p>
              <div>
                <input className="link-input" type='link' placeholder={referallink.code}/>
                <button className="copy-btn">Copy</button>
              </div>
            </div>
          </div>
          
        </div>

        <AllReferals/>
        
      </div>
    )
  }

  renderFailureView = () =>{
    return(
      <FailureView/>
    )
  }


  renderInProgress = () =>{
    return(
      <div className="laoding-div">
        <p className="loading-para">Loading Dashboard...</p>
      </div>
    )
  }

  

  renderDashboardResult = () =>{
    const {apiStatus} = this.state
    switch(apiStatus){
      case apiStatusConstant.inProgres:
        return this.renderInProgress()
      case apiStatusConstant.success:
        return this.renderDashboard()
      case apiStatusConstant.failure:
        return this.renderFailureView()
      default:
        return null
    }
  }


  render(){
    return(
      <>{this.renderDashboardResult()}</>
    )
  }
}

export default RefDashboard