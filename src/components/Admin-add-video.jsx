import axios from "axios";
import { useFormik } from "formik";
import { useEffect, useState } from "react"
import { Link, useNavigate } from "react-router-dom";

export function AddVideo(){

let navigate = useNavigate();
 const[Categories,setCategories] =  useState([{categoryId:0,categoryName:''}]);

   function LoadCategories(){
    axios.get('http://localhost:2500/get-categories')
    .then(res=>{
       
        setCategories(res.data)
   });
   }

    useEffect(()=>{
       LoadCategories();
    },[]);


   const formik = useFormik({
    initialValues:{
        VideoId:0,
        Title:'',
        Description:'',
        Url:'',
        Likes:0,
        DisLikes:0,
        Views:0,
        categoryId:0
    },
    onSubmit:function(videoDetails){
    axios.post('http://localhost:2500/add-video',videoDetails)
    .then(()=>{
        alert("Video Added Successfully....");
        navigate('/Admin-DashBoard');
        
    })
    }
   })

    return(
        <div style={{height:'100vh'}}>
           <h2 className="text-center mb-3">Add New Video</h2>
            <form onSubmit={formik.handleSubmit} >
                <dl className="row">
                    <dt className="col-3">VideoId</dt>
                    <dd className="col-9"><input type="number" onChange={formik.handleChange} className="form-control w-25" name="VideoId" /></dd>
                    <dt className="col-3">Title</dt>
                    <dd className="col-9"><input type="text" onChange={formik.handleChange} className="form-control w-25" name="Title" /></dd>
                    <dt className="col-3">Description</dt>
                    <dd className="col-9"><input type="text" onChange={formik.handleChange} className="form-control w-25" name="Description"/></dd>
                    <dt className="col-3">Url</dt>
                    <dd className="col-9"><input type="text" onChange={formik.handleChange} className="form-control w-25" name="Url"/></dd>
                    <dt className="col-3">Likes</dt>
                    <dd className="col-9"><input type="number" onChange={formik.handleChange} className="form-control w-25" name="Likes"/></dd>
                    <dt className="col-3">DisLikes</dt>
                    <dd className="col-9"><input type="number" onChange={formik.handleChange} className="form-control w-25" name="DisLikes" /></dd>
                    <dt className="col-3">Views</dt>
                    <dd className="col-9"><input type="number" onChange={formik.handleChange} className="form-control w-25" name="Views" /></dd>
                    <dt className="col-3">CategoryId</dt>
                    <dd className="col-9">
                       <select name="categoryId" onChange={formik.handleChange} className="w-25 form-select">
                        {
                            Categories.map(category => <option key={category.categoryId} value={category.categoryId}>{category.categoryName}</option>)
                        }
                       </select>
                    </dd>
                </dl>

                <button className="btn btn-primary">ADD-VIDEO</button>
                <Link to={'/Admin-DashBoard'} className='btn btn-danger ms-3'> Cancel </Link>
            </form>
        </div>
    )
}