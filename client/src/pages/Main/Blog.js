import React, { useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { getBlog, setEditBlog } from "../../features/blog/blogSlice";
import styled from "styled-components";
import ImageProfile from "../../assets/images/landing1.png";
import { BiLike } from "react-icons/bi";
import moment from "moment";
import { SpinnerCircularSplit } from "spinners-react";

const Blog = () => {
  const { blog, isLoading } = useSelector((state) => state.blog);
  const { user } = useSelector((state) => state.user);
  const { id } = useParams();
  const dispatch = useDispatch();

  console.log(blog);
  console.log(user);

  useEffect(() => {
    dispatch(getBlog(id));
  }, [dispatch, id]);

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
          {blog?.createdBy?._id === user._id ? (
            <Button
              to="/create"
              className="button-edit"
              onClick={() => {
                dispatch(setEditBlog({
                  editBlogId: blog._id,
                }))
              }}
            >
              Edit Blog
            </Button>
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
              <BiLike className="like-icon" />

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

  .profile {
    width: 102px;
    height: 102px;
    border-radius: 50%;
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
  }

  .username {
    font-family: "Poppins", sans-serif;
    font-style: normal;
    font-weight: 500;
    font-size: 20px;
    line-height: 24px;
    color: #9a9a9a;
  }
`;

const BlogWrapper = styled.div``;

const ImageWrapper = styled.div`
  width: 1234px;
  height: 450px;
  margin: 20px 0;
`;

const ImageContainer = styled.div`
  position: relative;
  width: 1234px;
  height: 450px;

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
  }
`;

const DetailWrapper = styled.div`
  .detail_1 {
    display: flex;
    align-items: center;
    justify-content: space-between;
    margin: 20px 0;
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
  }
`;

const Button = styled(Link)`
  width: 102px;
  height: 60px;
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
`;
