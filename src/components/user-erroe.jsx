import { Link } from "react-router-dom"
export function UserError(){
    return(
        <div style={{height:'100vh'}}>
         <div className="text-center h1"> 
            <p>Incorrect Login Details </p>
           BACK TO !<Link to="/" className="text-primary">Home</Link>
         </div>
          
        </div>
    )
}