import { useParams ,Link, useNavigate } from "react-router-dom";
import { useState ,formik, useEffect} from "react";
import axios from "axios";
import { useFormik } from "formik";


export function AdminUpdateVideo(){

let navigate = useNavigate();

let param = useParams();
const[video,setVideos] = useState([{VideoId:0,Title:'',Description:'',Url:'',Likes:0,DisLikes:0,Views:0,categoryId:0}]);
const[Categories,setCategories] =  useState([{categoryId:0,categoryName:''}]);

const formik = useFormik({
    initialValues:{VideoId:video[0].VideoId,Title:video[0].Title,Description:video[0].Description,Url:video[0].Url,Likes:video[0].Likes,DisLikes:video[0].DisLikes,Views:video[0].Views,categoryId:video[0].categoryId},
    onSubmit:(videoDetails)=>{
     axios.put(`http://localhost:2500/edit-video/${videoDetails.VideoId}`,videoDetails)
     .then(()=>{
        alert("video updated successfully..");
        navigate("/Admin-DashBoard");
     })
    },
    enableReinitialize:true
})

    function LoadVideo(){
        axios.get(`http://localhost:2500/get-video/${param.id}`)
        .then(res=>{
            setVideos(res.data);
        })
    }

    function LoadCategories(){
        
        axios.get('http://localhost:2500/get-categories')
        .then(res=>{
            res.data.unshift({categoryId:-1,categoryName:'Select CategoryName'})
            setCategories(res.data)
    });
    }

    useEffect(()=>{
        LoadVideo();
        LoadCategories();
    },[]);


        return(
            <div style={{height:'100vh'}}>
                <h1>Update video</h1>
            <form onSubmit={formik.handleSubmit}>
            <dl className="row">
                        <dt className="col-3">VideoId</dt>
                        <dd className="col-9"><input type="number" onChange={formik.handleChange} value={formik.values.VideoId} className="form-control w-25" name="VideoId" /></dd>
                        <dt className="col-3">Title</dt>
                        <dd className="col-9"><input type="text"className="form-control w-25" onChange={formik.handleChange} value={formik.values.Title}  name="Title" /></dd>
                        <dt className="col-3">Description</dt>
                        <dd className="col-9"><input type="text" className="form-control w-25" onChange={formik.handleChange} value={formik.values.Description}  name="Description"/></dd>
                        <dt className="col-3">Url</dt>
                        <dd className="col-9"><input type="text"  className="form-control w-25" value={formik.values.Url} onChange={formik.handleChange}  name="Url"/></dd>
                        <dt className="col-3">Likes</dt>
                        <dd className="col-9"><input type="number"  className="form-control w-25" value={formik.values.Likes} onChange={formik.handleChange}  name="Likes"/></dd>
                        <dt className="col-3">DisLikes</dt>
                        <dd className="col-9"><input type="number"  className="form-control w-25" value={formik.values.DisLikes} onChange={formik.handleChange} name="DisLikes" /></dd>
                        <dt className="col-3">Views</dt>
                        <dd className="col-9"><input type="number"  className="form-control w-25" value={formik.values.Views} onChange={formik.handleChange} name="Views" /></dd>
                        <dt className="col-3">CategoryId</dt>
                        <dd className="col-9">
                        <select name="categoryId" className="w-25 form-select" value={formik.values.categoryId} onChange={formik.handleChange}>
                        {
                                Categories.map(category => <option value={category.categoryId}>{category.categoryName}</option>)
                            }
                        </select>
                        </dd>
                    </dl>
                    <button className="btn btn-success">Update</button>
                    <Link to={'/Admin-DashBoard'} className="btn btn-danger ms-4"> Cancel </Link>
            </form>
            </div>
        )
    }