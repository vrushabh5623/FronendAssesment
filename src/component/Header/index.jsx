import { Link } from 'react-router-dom/cjs/react-router-dom.min'
import Cookies from 'js-cookie'
import './index.css'

const Header = (props) =>{
  const onLogout = () =>{
    const {history} = props
    Cookies.remove('jwt_token2')
    history.replace('/login')
  }
  return(
    <div>
      <nav className='nav-bar'>
          <Link to='/' className='link'><li className='head-logo'>Go Business</li></Link>
          <ul>
            <button className='try-btn'>Try for free</button>
            <button className='logout-btn' onClick={onLogout}>Log out</button>
          </ul>
      </nav>
    </div>
  )
}

export default Header