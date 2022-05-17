import React, { useEffect,useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import Navbar from "../../components/Navbar";
import { getBlogs, setEditBlog } from "../../features/blog/blogSlice";
import moment from 'moment';
import { Link } from "react-router-dom";

const Home = () => {

  const { blogs, isLoading, editBlogId } = useSelector((state) => state.blog);


  const [currentId, setCurrentId] = useState(null);

  const dispatch = useDispatch();

  console.log(blogs);

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
      blogs.map((item) =>{
        return (
          <ul key={ item._id} >
            <li>{item._id }</li>
            <li>{item.title }</li>
            <li>{item.createdBy }</li>
            <li>{item.desc }</li>
            <li>{item.image }</li>
            <li>{moment(item.createdAt).format('MM DD, YYYY')}</li>
            <button onClick={() => {
              dispatch(setEditBlog({
                editBlogId: item._id,
            }))} }>
              <Link to='/create'>
                  Edit
              </Link>
              </button>
          </ul>
        )
      })
    }
  </div>;
};

export default Home;
