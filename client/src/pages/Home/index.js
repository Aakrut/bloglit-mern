import React, { useEffect,useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import Navbar from "../../components/Navbar";
import { getBlogs, setEditBlog,deleteBlog } from "../../features/blog/blogSlice";
import moment from 'moment';
import { Link } from "react-router-dom";

const Home = () => {

  const { blogs, isLoading, editBlogId } = useSelector((state) => state.blog);


  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getBlogs());
  }, [dispatch]);

  if (isLoading) {
    return <>
      <h1>Loading...</h1>
    </>
  }

  return <div>
    <Navbar />
    Home
    {
      blogs?.map((blog) =>{
        return (
          <ul key={blog._id}>
            <li>{blog._id}</li>
            <li>{blog.title}</li>
            <li>{blog.createdBy}</li>
            <li>{blog.desc}</li>
            <li>{blog.image}</li>
            <li>{moment(blog.createdAt).format("MM DD, YYYY")}</li>
            <button
              onClick={() => {
                dispatch(
                  setEditBlog({
                    editBlogId: blog._id,
                  })
                );
              }}
            >
              <Link to="/create">Edit</Link>
            </button>
            <button onClick={() => dispatch(deleteBlog(blog._id))}>
              Delete
            </button>
          </ul>
        );
      })
    }
  </div>;
};

export default Home;
