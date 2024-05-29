import {Link} from 'react-router-dom';
export function RegisterLink(){
    return(
        <div> 
            <Link to={'/user-register'} className="btn btn-primary"> Register </Link>
        </div>
    )
}