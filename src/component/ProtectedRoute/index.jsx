import { Redirect,Route } from "react-router-dom/cjs/react-router-dom.min";
import Cookies from "js-cookie";

const ProtectedRoute = (props) =>{
  const token = Cookies.get('jwt_token2')
  if(token === undefined){
    return <Redirect to='/login'/>
  }
  return <Route {...props}/>
}

export default ProtectedRoute