import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import Navbar from "../../components/Navbar";
import { createBlog, updateBlog } from "../../features/blog/blogSlice";

const Create = () => {
  const [blogData, setBlogData] = useState({
    createdBy: "",
    title: "",
    desc: "",
    image: "",
  });

  const blog = useSelector((store) => store.blog);
  // console.log(blog)

  const blogId = useSelector((state) => state.blog.editBlogId);
  // console.log(blogId);

  const b = useSelector((state) =>
    state.blog.editBlogId
    // blogId
      ? state.blog.blogs.find((main) => main._id === blogId)
      : null
  );
  // console.log(b);

  const dispatch = useDispatch();

  useEffect(() => {
    if (b) setBlogData(b);
  }, [b]);

  const handleClick = (e) => {
    e.preventDefault();
    // console.log(blogId, blogData);
    // if (!b) {
    //   dispatch(createBlog(blogData));
    //   // console.log(blogData);
    // } else {
    //   // console.log(blogId, blogData);
    //   dispatch(updateBlog(blogId, blogData));
      
    // }

    if (b) {
    
      dispatch(updateBlog({
        blogID: blogId,
        blog : blogData
      }));
      return;
    } else {
      dispatch(createBlog(blogData));
      return;
    }



  };

  return (
    <div>
      <Navbar />
      <input
        value={blogData.createdBy}
        name={blogData.createdBy}
        placeholder="Username"
        type="text"
        onChange={(e) =>
          setBlogData({ ...blogData, createdBy: e.target.value })
        }
      />
      <input
        value={blogData.title}
        name={blogData.title}
        placeholder="Title"
        type="text"
        onChange={(e) => setBlogData({ ...blogData, title: e.target.value })}
      />
      <input
        value={blogData.desc}
        name={blogData.desc}
        placeholder="Desc"
        type="text"
        onChange={(e) => setBlogData({ ...blogData, desc: e.target.value })}
      />
      <input
        value={blogData.image}
        name={blogData.image}
        placeholder="Image"
        type="text"
        onChange={(e) => setBlogData({ ...blogData, image: e.target.value })}
      />

      <button onClick={handleClick}>Submit</button>
    </div>
  );
};

export default Create;
