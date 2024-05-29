
import axios from "axios";
import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useCookies } from "react-cookie";

export  function AdminDashBoard(){
  
  let navigate = useNavigate();
 const[videos,setVideos] = useState([{VideoId:0,Title:'',Description:'',Url:'',Likes:0,DisLikes:0,Views:0,categoryId:0}]);
 const[cookie,setCookie,removeCookie] = useCookies("Admin-id");

  function LoadVideos(){
    axios.get('http://localhost:2500/get-videos')
    .then(res=>{
     setVideos(res.data);
    })
  }

  useEffect(()=>{
   if(cookie['Admin-id']){
    LoadVideos();
   }else{
   navigate('/Admin-login');
   }
  },[])

  function handleDeleteClick(id){
   axios.delete(`http://localhost:2500/delete-video/${id}`)
   .then(()=>{
    alert("video deleted successfully...");
    window.location.reload();
   })
  }
   
  return(
    <div style={{height:'100vh'}}>
        <h1 className="text-center mt-2"> Admin-DashBorad</h1>
        <Link to='/Add-video' className="bi bi-camera-video-fill text-decoration-none btn btn-primary"> AddVideo </Link>
       <table className="table table-hover table-responsive mt-4">
        <thead>
          <tr>
            <th>Title</th>
            <th>Preview</th>
            <th>Description</th>
            <th>Actions</th>
          </tr>
        </thead>
            <tbody>
              {
                videos.map(video=>
                  <tr>
                    <td>{video.Title}</td>
                    <td><iframe src={video.Url}  ></iframe></td>
                    <td>{video.Description}</td>
                     <td>
                      <Link to={`/Update-video/${video.VideoId}`} className=" bi bi-pen-fill btn btn-success me-3"> Update</Link>
                      <Link to={`/Delete-video/${video.VideoId}`} className=" bi bi-trash btn btn-warning"> Delete</Link>
                     </td>
                  </tr>
                )
              }
            </tbody>
       </table>
    </div>
  )
}