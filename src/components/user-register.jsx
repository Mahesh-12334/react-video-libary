import axios from "axios";
import { Alert } from "bootstrap";
import { useFormik } from "formik"
import { useNavigate ,Link} from "react-router-dom";

export function UserRegister(){

    let navigate = useNavigate();

   const formik = useFormik({
    initialValues:{
        UserId:'',
        UserName:'',
        UserPwd:'',
        Email:'',
        phone:''
    },
    onSubmit:(user=>{
       axios.post('http://localhost:2500/register-user',user)
       .then(()=>{
        alert('Registered Suceessfully...');
        navigate('/');
       })
    })
   });

    return(
        <div style={{height:'600px'}} className="d-flex justify-content-center ">
           <form onSubmit={formik.handleSubmit} className="w-25">
             <h2>user-Register</h2>
            <dl>
                <dt className="form-label">UserId</dt>
                <dd><input type="text"  className="form-control" onChange={formik.handleChange} name="UserId"/></dd>
                <dt className="form-label">UserName</dt>
                <dd><input type="text"  className="form-control"  onChange={formik.handleChange}  name="UserName"/></dd>
                <dt className="form-label" >UserPwd</dt>
                <dd><input type="password" className="form-control"  onChange={formik.handleChange}  name="UserPwd"/></dd>
                <dt className="form-label">Email</dt>
                <dd><input type="text" className="form-control"  onChange={formik.handleChange}  name="Email"/></dd>
                <dt className="form-label">phone</dt>
                <dd><input type="text" className="form-control"  onChange={formik.handleChange}  name="phone" /></dd>
            </dl>
            <button className="btn btn-success">Register</button>
             <Link to='/' className="btn btn-danger ms-4">Cancel</Link>
           </form>
          
        </div>
    )
}