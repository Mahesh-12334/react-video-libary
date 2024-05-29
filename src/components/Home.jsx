import axios from "axios";
import { useState } from "react";
import { PasswordContainer } from "./Password-Container";
import { RegisterLink } from "./Register-link";

export function Home(){

const[UsersEmail,setUserEmail] =useState();
const[Usres,setUsers] = useState([{UserId:'',UserName:'',UserPwd:'',Email:'',phone:''}]);
const[IsAvailable,IsSetAvailable] = useState();
 

function handlEmailChange(e){
 setUserEmail(e.target.value);
}   

function handleEmailClick(){
    axios.get('http://localhost:2500/get-users')
    .then(response=>{
    var data = response.data.find(client=>client.Email===UsersEmail);
     if(data){
     IsSetAvailable(<PasswordContainer/>);
     }else{
       IsSetAvailable(<RegisterLink/>);
     }
    })
}
    return(
    <div style={{marginTop:'200px'}}>
        <main className="d-flex flex-column justify-content-center align-items-center" >
            <div className='h2 fw-bold mb-2'>Unlimited Videos, Online Demo's and more</div>
                <div className='h3'>Watch anywhere. Cancel anytime.</div>
                <div className='h4 fw-bold mt-3 text-black'>Ready to watch? Enter your email or mobile number to create or restart your membership.</div>
                <div className='input-group-text mt-3'>
                <input type='text'  name="Email" onChange={handlEmailChange} placeholder="Enter Your Email ?"  className="form-control" size={50}/>
                <button onClick={handleEmailClick} className='btn btn-danger text-white fw-bold ms-2' style={{width:'200px'}}>Get Started <span className='bi bi-chevron-right'></span></button>
            </div>
            <div className="mt-3">
                {IsAvailable}
            </div>
        </main>
    </div>
    )
}