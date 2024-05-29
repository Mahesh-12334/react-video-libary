import { useEffect ,useState} from "react";
import axios from "axios";
import { useCookies } from "react-cookie";
import { useNavigate } from "react-router-dom";
    export function UserDashboard(){
    
        let navigate = useNavigate();
        const[videos,setVideos] = useState([{VideoId:0,Title:'',Description:'',Url:'',Likes:0,DisLikes:0,Views:0,categoryId:0}]);
        const[cookie,setCookie,removeCookie] = useCookies('user-id');

        function LoadVideos(){
        axios.get('http://localhost:2500/get-videos')
        .then(res=>{
        setVideos(res.data);
            })
        }

        useEffect(()=>{
       
        if(cookie['user-id']){
            LoadVideos();
        }else{
            navigate('/');
        }
        },[])

        function handleSignoutClick(){
            removeCookie('user-id');
            navigate('/');
            window.location.reload();
        }

    return(
        <div style={{height:'600px'}} >
            <h1 className="text-center text-info mb-4">{cookie['user-id']}-Dashboard- <button onClick={handleSignoutClick} className="btn btn-danger">Signout</button> </h1>
            <main className="d-flex">
            {
            videos.map(video=>
                <div className="card w-25 ms-3" style={{height:'350px'}}> 
                 <div className="card-header">
                 <iframe src={video.Url} style={{width:'100%'}}></iframe>
                 </div>
                 <div className="card-body">
                   <p>{video.Title}</p>
                   <p>{video.Description}</p>
                 </div>
                 <div className="card-footer d-flex justify-content-around">
                   <span className="bi bi-eye">{video.Views}</span>
                   <span className="bi bi-hand-thumbs-up">{video.Likes}</span> 
                   <span className="bi bi-hand-thumbs-down">{video.DisLikes}</span>
                 </div>
                </div>
            )
           }
            </main>
          </div>
    )
}