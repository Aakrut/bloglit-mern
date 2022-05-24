import React, { useEffect } from "react";
import { useParams, Link, useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import {
  deleteBlog,
  getBlog,
  setEditBlog,
} from "../../features/blog/blogSlice";
import styled from "styled-components";
import ImageProfile from "../../assets/images/landing1.png";
import moment from "moment";
import { SpinnerCircularSplit } from "spinners-react";
import { AiOutlineLike, AiFillLike } from "react-icons/ai";

const Blog = () => {
  const { blog, isLoading, editBlogId } = useSelector((state) => state.blog);
  const { user } = useSelector((state) => state.user);

  const blogId = blog?._id;

  const { id } = useParams();
  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    dispatch(getBlog(id));
  }, [dispatch, id]);

  const handleLike = () => {
    console.log("Soon I Will Add Like Blog Feature!");
  };

  const Likes = () => {
    if (blog?.likes?.length > 0) {
      return blog?.likes?.find((like) => like === user.user._id) ? (
        <>
          <AiFillLike className="like-icon" />
          &nbsp;
          {blog?.likes?.length > 2
            ? `You and ${blog?.likes?.length - 1} others`
            : `${blog?.likes?.length} like${
                blog?.likes?.length > 1 ? "s" : ""
              }`}
        </>
      ) : (
        <>
          <AiOutlineLike className="like-icon" />
          &nbsp;{blog?.likes?.length}{" "}
          {blog?.likes?.length === 1 ? "Like" : "Likes"}
        </>
      );
    }
    return (
      <>
        <AiOutlineLike className="like-icon" />
        &nbsp;Like
      </>
    );
  };

  if (isLoading) {
    return (
      <Loader>
        <SpinnerCircularSplit
          size={50}
          thickness={100}
          speed={100}
          color="rgba(57, 159, 253, 1)"
          secondaryColor="rgba(57, 159, 253, 0.5)"
        />
      </Loader>
    );
  }

  return (
    <Wrapper>
      <ContentWrapper>
        <UserWrapper>
          <div className="user-profile">
            <img
              src={blog?.createdBy?.avatar || ImageProfile}
              alt="profile"
              className="profile"
            />

            <div className="user">
              <h4 className="name">{blog?.createdBy?.fullName}</h4>
              <p className="username">@{blog?.createdBy?.username}</p>
            </div>
          </div>
          {blog?.createdBy?._id === user.user._id ? (
            <BtnWrapper>
              <Button
                to="/create"
                className="button-edit"
                onClick={() => {
                  dispatch(
                    setEditBlog({
                      editBlogId: blog._id,
                    })
                  );
                }}
              >
                Edit Blog
              </Button>

              <button
                className="btn-delete"
                onClick={() => {
                  dispatch(deleteBlog(blog._id));
                  navigate("/");
                }}
              >
                Delete
              </button>
            </BtnWrapper>
          ) : null}
        </UserWrapper>

        <BlogWrapper>
          <ImageWrapper>
            <ImageContainer>
              <img src={blog.image} alt="blog" className="blog-image" />
              <img src={blog.image} alt="blog" className="blog-blur" />
            </ImageContainer>
          </ImageWrapper>

          <DetailWrapper>
            <div className="detail_1">
              <div className="like" onClick={!user?.user ? null : handleLike}>
                <Likes />
              </div>

              <h4 className="time">{moment(blog.createdAt).fromNow()}</h4>
            </div>

            <div className="blog">
              <h2 className="title">{blog.title}</h2>
              <p className="description">{blog.desc}</p>
            </div>
          </DetailWrapper>
        </BlogWrapper>
      </ContentWrapper>
    </Wrapper>
  );
};

export default Blog;

const Loader = styled.div`
  height: 800px;
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const Wrapper = styled.div``;

const ContentWrapper = styled.div`
  max-width: 1234px;
  margin: 0 auto;
`;

const UserWrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin: 10px 0;

  @media only screen and (max-width: 768px) {
    margin: 10px 10px;
  }

  .profile {
    width: 102px;
    height: 102px;
    border-radius: 50%;

    @media only screen and (max-width: 768px) {
      width: 61px;
      height: 61px;
    }
  }

  .user-profile {
    display: flex;
    justify-content: center;
    align-items: center;
  }

  .user {
    margin: 0 10px;
  }

  .name {
    font-family: "Inter", sans-serif;
    font-style: normal;
    font-weight: 600;
    font-size: 25px;
    line-height: 30px;

    @media only screen and (max-width: 768px) {
      font-size: 18px;
    }
  }

  .username {
    font-family: "Poppins", sans-serif;
    font-style: normal;
    font-weight: 500;
    font-size: 20px;
    line-height: 24px;
    color: #9a9a9a;

    @media only screen and (max-width: 768px) {
      font-size: 18px;
    }
  }
`;

const BlogWrapper = styled.div``;

const ImageWrapper = styled.div`
  width: 1234px;
  height: 450px;
  margin: 20px 0;

  @media only screen and (max-width: 768px) {
    width: auto;
    margin: 0 10px;
    height: 225px;
  }
`;

const ImageContainer = styled.div`
  position: relative;
  width: 1234px;
  height: 450px;

  @media only screen and (max-width: 768px) {
    width: auto;
    height: 225px;
  }

  img {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    border-radius: 5px;
    z-index: 0;
  }

  .blog-blur {
    width: 80%;
    height: 80%;
    top: 110px;
    left: 120px;
    filter: blur(60px) saturate(2);
    z-index: -1;

    @media only screen and (max-width: 768px) {
      top: 60px;
      left: 38px;
    }
  }
`;

const DetailWrapper = styled.div`
  @media only screen and (max-width: 768px) {
    margin: 0 10px;
  }
  .detail_1 {
    display: flex;
    align-items: center;
    justify-content: space-between;
    margin: 20px 0;
  }

  .like {
    width: auto;
    height: auto;
    border: 2px solid #ff5454;
    display: flex;
    align-items: center;
    justify-content: center;
    border-radius: 5px;
    cursor: pointer;
    padding: 10px;
  }

  .like-icon {
    font-size: 35px;
    cursor: pointer;
  }

  .time {
    font-family: "Poppins", sans-serif;
    font-style: normal;
    font-weight: 400;
    font-size: 18px;
    line-height: 24px;
  }

  .blog {
    text-align: center;
    margin: 20px 0;
  }
  .title {
    font-family: "Inter";
    font-style: normal;
    font-weight: 600;
    font-size: 60px;
    line-height: 73px;
    margin: 20px 0;
  }

  .description {
    font-family: "Poppins", sans-serif;
    font-style: normal;
    font-weight: 300;
    font-size: 24px;
    line-height: 125.52%;

    @media only screen and (max-width: 768px) {
      font-weight: 200;
      font-size: 18px;
    }
  }
`;

const Button = styled(Link)`
  width: 102px;
  height: 40px;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 5px;
  transition: all 0.3s ease-in-out;
  font-family: "Poppins", sans-serif;
  text-decoration: none;
  color: white;
  border: 3px solid #399ffd;
  color: #399ffd;

  &:hover {
    background: #399ffd;
    color: white;
    box-shadow: 0px 10px 20px rgba(57, 159, 253, 0.5);
  }

  @media only screen and (max-width: 768px) {
    width: 60px;
    font-size: 12px;
  }
`;

const BtnWrapper = styled.div`
  display: flex;
  align-items: center;

  .btn-delete {
    width: 102px;
    height: 45px;
    display: flex;
    align-items: center;
    justify-content: center;
    border-radius: 5px;
    transition: all 0.3s ease-in-out;
    font-family: "Poppins", sans-serif;
    color: white;
    border: 3px solid #fd3939;
    color: #fd3939;
    cursor: pointer;
    background: transparent;
    margin-left: 10px;

    &:hover {
      background: #fd3939;
      color: white;
      box-shadow: 0px 10px 20px rgba(253, 57, 57, 0.5);
    }

    @media only screen and (max-width: 768px) {
      width: 60px;
      font-size: 12px;
    }
  }
`;
