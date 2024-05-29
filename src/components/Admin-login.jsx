import axios from "axios";
import { useFormik } from "formik"
import { useState } from "react"
import { useCookies } from "react-cookie";
import { useNavigate } from "react-router-dom";


export function AdminLogin(){

   const[admin,setAdmin] = useState([{UserId:'',UserName:'',UserPwd:''}]);
   const[cookie,setCookie,removeCookie] = useCookies("Admin-id");
   let navigate  = useNavigate();
     const formik = useFormik({
        initialValues : {
            UserId:'',
            UserPwd:''
        },
        onSubmit:function(adminDetails){
            axios.get('http://localhost:2500/get-admin')
            .then(res=>{
                setAdmin(res.data);
                if(adminDetails.UserId === res.data[0].UserId && adminDetails.UserPwd === res.data[0].UserPwd){
                  setCookie('Admin-id',adminDetails.UserId);
                  navigate('/Admin-DashBoard');
                  window.location.reload();
                }else{
                   navigate('/Admin-error');
                }
            });
        
        }
    })
    return(
        <div className="d-flex justify-content-center align-items-center" style={{height:'100vh'}}>
          <form onSubmit={formik.handleSubmit}>
            <h4 className="text-center text-black">Admin-Login</h4>
            <dl>
                <dt>UserId</dt>
                <dd><input type="text" name="UserId" onChange={formik.handleChange} className="form-control" /></dd>
        
                <dt>Password</dt>
                <dd><input type="password" name="UserPwd"  onChange={formik.handleChange} className="form-control" /></dd>
                <button className="btn btn-primary w-100 ">Login</button>
            </dl>
          </form>
        </div>
    )
}