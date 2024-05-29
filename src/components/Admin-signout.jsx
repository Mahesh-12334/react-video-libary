import { useCookies } from "react-cookie"
import { useNavigate } from "react-router-dom";

export function AdminSignout(){

let navigate = useNavigate();
 const[cookie,setCookie,removeCookie] = useCookies("Admin-id");


  function handleSignoutClick(){
    removeCookie('Admin-id');
    navigate("/");
    window.location.reload();
  }

  
    return(
        <div>
            <button  onClick={handleSignoutClick} className="btn btn-danger">{cookie['Admin-id']} Signout</button>
        </div>
    )
}