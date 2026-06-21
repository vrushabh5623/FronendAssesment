import { Link } from 'react-router-dom'
import './index.css'

const NotFound = () =>{
  return(
    <div className='notfound-bg'>
      <h1 className='not-found-num'>404</h1>
      <p className='not-found-para'>Page not found</p>
      <Link to='/' className='link'>
      <button className='not-found-btn'>Back to dashboard</button>
      </Link>
    </div>
  )
}

export default NotFound