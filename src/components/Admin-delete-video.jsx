import axios from "axios";
import { useEffect ,useState} from "react";
import { useParams ,Link, useNavigate } from "react-router-dom"

export function AdminDeleteVideo(){

    let navigate = useNavigate();
  let params = useParams();
  const[videos,setVideos] = useState([{VideoId:0,Title:'',Description:'',Url:'',Likes:0,DisLikes:0,Views:0,categoryId:0}]);

  function LoadVideo(){
    axios.get(`http://localhost:2500/get-video/${params.id}`)
    .then(response=>{
       setVideos(response.data);
    });
  }

  useEffect(()=>{
    LoadVideo();
  },[])


 function handleButtonClick(){
   axios.delete(`http://localhost:2500/delete-video/${params.id}`)
   .then(()=>{
     navigate("/Admin-DashBoard");
   });
 }

    return(
        <div style={{height:'100vh'}}>
           <h1>Delete video</h1>
           {
            videos.map(video=>
                <div className="card w-25  bg-primary-subtle" >
                <div className="card-header text-center">
                  {
                    video.Title
                  }
                </div>
                <div className="card-body">
                  {
                    <iframe src={video.Url}></iframe>
                  }
                </div>
                <div className="card-footer text-center">
                 <button onClick={handleButtonClick} className="btn btn-success me-4"> Yes </button>
                <Link to="/Admin-DashBoard" className="btn btn-danger"> No </Link>
                </div>
                </div>
            )
           }
        </div>
    )
}