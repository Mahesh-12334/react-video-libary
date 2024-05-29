import axios from "axios"
import { useState } from "react"
import { useCookies } from "react-cookie";
import { useNavigate } from "react-router-dom";

export function PasswordContainer(){
  
    let navigate = useNavigate();
   const[userPassword,setUserPassword] = useState();
   const[cookie,setCookie,removeCookie] = useCookies('user-id');

   function handlePwdChange(e){
       setUserPassword(e.target.value);
   }

   function handleVerifyClick(){
    axios.get('http://localhost:2500/get-users')
    .then(response=>{
        var data = response.data.find(item=>item.UserPwd === userPassword)
        if(data){
        setCookie('user-id',data.UserId);
            navigate('/user-dashboard');
        }else{
            navigate('/user-error');
        }
    })
   } 

    return(
        <div className="input-group"> 
            <input type="password" className="form-control" name="UserPwd" onChange={handlePwdChange}/>
            <button onClick={handleVerifyClick} className="btn btn-success w-25"> Verify </button>
        </div>
    )
}