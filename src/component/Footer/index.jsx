import { MdOutlineCopyright } from "react-icons/md";
import { Link } from "react-router-dom";

import './index.css'

const Footer = () =>{
  return(
    <div className='footer-bg'>
      <Link to='/' className='link' ><li className='footer-logo'>Go Business</li></Link>
      
      <ul className='un-list'>
        <li className='about'>About</li>
        <li className='about'>Contact</li>
        <li className='about'>Privacy</li>
        <li className='about'>Terms</li>
      </ul>
      <li className="copy-right"><MdOutlineCopyright /> 2024 Go Business, Inc.</li>
    </div>
  )
}

export default Footer