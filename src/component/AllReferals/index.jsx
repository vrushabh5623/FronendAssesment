import { Component } from "react";
import { Link } from "react-router-dom";
import Cookies from 'js-cookie'
import './index.css'


const apiStatusConstan = {
  initial: 'INITIAL',
  inProgress: 'IN_PROGRESS',
  success: 'SUCCESS'
}
class AllReferals extends Component{
  state = {
    repaeatreferallist:[],
    selectItem:'asc',
    searchInput:'',
    apiStatus: apiStatusConstan.initial
  }

  getselectValue = (event) =>{
    this.setState({
      selectItem:event.target.value
    },this.getRepeateData)
  }

  getSearchInput = (event) =>{
    this.setState({
      searchInput:event.target.value
    },this.getRepeateData)
  }
  
  componentDidMount = () =>{
    this.getRepeateData()
  }

  getRepeateData = async() =>{
    this.setState({
      apiStatus:apiStatusConstan.inProgress
    })
    const {selectItem,searchInput} = this.state
    const jwtToken = Cookies.get('jwt_token2')
    let url = `https://v9fes04dwf.execute-api.eu-north-1.amazonaws.com/api/referrals?sort=${selectItem}`
    if(searchInput.trim() !== ''){
      url += `&search=${searchInput}`
    }
    const options = {
      methodi: 'GET',
      headers:{
        Authorization: `Bearer ${jwtToken}`,
      },
    }
    const response = await fetch(url,options)
    const data = await response.json()
    // console.log(data)
    if(response.ok === true){
      this.setState({
        repaeatreferallist:data.data.referrals,
        apiStatus:apiStatusConstan.success
      })
    }
  }

  renderReferalSuccess = () =>{
    const {repaeatreferallist} = this.state
    return(
      <>
      {
          repaeatreferallist.map(eachItem=>(
            <Link to={`/referrals/${eachItem.id}`} key={eachItem.id} className='link'>
              <div className="attribute-div rows"  key={eachItem.id}>
                <p className="attribute">{eachItem.name}</p>
                <p className="attribute">{eachItem.serviceName}</p>
                <p className="attribute">{eachItem.date}</p>
                <p className="attribute">{eachItem.profit}</p>
              </div>
              <hr/>
            </Link>
          ))
        }
      </>
    )
  }

  renderRepeateResult = () =>{
    const {apiStatus} = this.state
    switch(apiStatus){
      case apiStatusConstan.inProgress:
        return <p className="data-loading-para">Loading Data...</p>
      case apiStatusConstan.success:
        return this.renderReferalSuccess()
      default:
        null
    }
  }



  render(){
    const {repaeatreferallist,selectItem,searchInput} = this.state
    return(
      <>
      <div className="overview-div overview-div-referal">
        <h1 className="overview-head">All referrals</h1>
        <div className="search-field">
          <div>
            <label className="total-balance">Search</label>
            <input value={searchInput} onChange={this.getSearchInput} type='search' className="search-input" placeholder="Name of service..."/>
          </div>

          <div>
            <label className="total-balance">Sort by date</label>
            <select className="select-tag" value={selectItem} onChange={this.getselectValue}>
              <option value={'asc'}>Newest first</option>
              <option value={'desc'}>Oldest first</option>
            </select>
          </div>
        </div>   
      </div>
      <div className="attribute-div">
        <p className="attribute">name</p>
        <p className="attribute">service</p>
        <p className="attribute">date</p>
        <p className="attribute">profit</p>
      </div>
      <div className="all-row-cotainer">
        {this.renderRepeateResult()}
      </div>
      </>

    )
  }
}

export default AllReferals