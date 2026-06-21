import { Link } from 'react-router-dom'
import NotFound from '../NotFound'
import Header from '../Header'
import './index.css'

const FailureView = () =>{
  return(
  <div className="home-bg">
    <Header/>
    <div className='failure-bg'>
      <h1 className='not-found-num'>404</h1>
      <p className='not-found-para'>Page not found</p>
      <Link to='/' className='link'>
        <button className='not-found-btn'>Back to dashboard</button>
      </Link>
    </div>
  </div>
  )
}

export default FailureView