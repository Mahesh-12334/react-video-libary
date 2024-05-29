import { Link } from "react-router-dom"
export function AdminError(){
    return(
        <div style={{height:'100vh'}} className="text-center" >
            <h1 className="text-black">Incorrect Login Crendentials</h1>
            <Link to='/Admin-login' className=" text-black ">Back To Login</Link>
        </div>
    )
}