import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import FormRow from "../../components/FormRow";
import FormRow2 from "../../components/FormRow2";
import styled from "styled-components";
import FileBase64 from "react-file-base64";
import { toast } from "react-toastify";
import { BsImage } from "react-icons/bs";
import { createBlog, updateBlog } from "../../features/blog/blogSlice";
import { SpinnerCircularSplit } from "spinners-react";

const Create = () => {
  const { isLoading, isEditing } = useSelector((state) => state.blog);

  const [values, setValues] = useState({
    title: "",
    desc: "",
    image: "",
  });

  const blog = useSelector((store) => store.blog);

  const blogId = useSelector((state) => state.blog.editBlogId);

  const dispatch = useDispatch();

  useEffect(() => {
    if (blogId) setValues(blog.blog);
  }, [blogId, blog]);

  const handleChange = (e) => {
    setValues({ ...values, [e.target.name]: e.target.value });
  };

  const onSubmit = (e) => {
    e.preventDefault();
    const { title, desc, image } = values;

    if (!title || !desc || !image) {
      toast.error("Please Fill Out All Fields.");
      return;
    }

    if (blogId) {
      dispatch(updateBlog({ blogId: blogId, blog: values }));
      return;
    } else {
      dispatch(createBlog(values));
      return;
    }
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
      <h3 className="edit">{isEditing ? "Edit Blog" : "Publish Blog"}</h3>
      <ContentWrapper>
        <ImageWrapper>
          {values?.image?.length > 0 ? (
            <img src={values?.image} alt="blog" />
          ) : (
            <div className="no-image">
              <BsImage className="icon" /> Please Select an Image to see
              Preview.
            </div>
          )}
        </ImageWrapper>

        <DetailsWrapper>
          <form className="form" onSubmit={onSubmit}>
            <FormRow
              type="text"
              placeholder="title"
              name="title"
              value={values.title}
              handleChange={handleChange}
            />

            <FormRow2
              type="text"
              placeholder="Description"
              name="desc"
              value={values.desc}
              handleChange={handleChange}
            />

            <FileBase64
              type="file"
              label="Image"
              multiple={false}
              name="myFile"
              accept=".jpeg, .png, .jpg, .svg"
              value={values.image}
              onDone={({ base64 }) => setValues({ ...values, image: base64 })}
            />

            <button type="submit" disabled={isLoading} className="btn-update">
              {isLoading ? `Please Wait` : `Publish`}
            </button>
          </form>
        </DetailsWrapper>
      </ContentWrapper>
    </Wrapper>
  );
};

export default Create;

const Loader = styled.div`
  height: 800px;
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const Wrapper = styled.div`
  height: 80vh;

  .edit {
    text-align: center;
    font-family: "Poppins", sans-serif;
    font-weight: 600;
    font-size: 20px;
    margin: 20px 0;
  }
`;
const ContentWrapper = styled.div`
  max-width: 1234px;
  height: 100%;
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  grid-gap: 10px;
  justify-content: center;
  align-items: center;
  margin: 0 auto;

  @media only screen and (max-width: 640px) {
    grid-template-columns: 1fr;
    grid-gap: 40px;
  }
`;

const ImageWrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;

  img {
    width: 300px;
    height: 300px;
    border-radius: 5px;
  }

  .no-image {
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 20px;
    text-align: center;
    font-family: "Poppins", sans-serif;
    font-weight: 500;
    flex-direction: column;
  }

  .icon {
    margin: 10px 0;
    font-size: 25px;
  }
`;

const DetailsWrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;

  .form {
    display: flex;
    align-items: center;
    justify-content: center;
    flex-direction: column;
    padding: 20px 0;

    background: white;
    width: 380px;
    border-radius: 5px;

    border: 1px solid black;
    box-shadow: 0px 20px 30px rgba(0, 0, 0, 0.2);
  }

  input {
    width: 80%;
    height: 50px;
    padding-left: 5px;
    background: #dff3fe;
    border: none;
    border-radius: 5px;
    margin: 10px 0;
    outline: none;
    transition: all 0.3s ease-in-out;
  }

  input:focus {
    color: black;
    font-weight: 400;
    font-family: "Poppins", sans-serif;
  }

  input::placeholder {
    font-family: "Poppins", sans-serif;
  }

  textarea {
    width: 80%;
    height: 300px;
    padding-top: 5px;
    padding-left: 5px;
    background: #dff3fe;
    border: none;
    border-radius: 5px;
    margin: 10px 0;
    resize: none;
    overflow: auto;
    outline: none;
    transition: all 0.3s ease-in-out;
    font-family: "Poppins", sans-serif;
  }

  textarea:focus {
    color: black;
    font-weight: 400;
    font-family: "Poppins", sans-serif;
  }

  textarea::placeholder {
    font-family: "Poppins", sans-serif;
  }

  textarea::-webkit-scrollbar {
    width: 1em;
  }

  textarea::-webkit-scrollbar-track {
    -webkit-box-shadow: inset 0 0 6px rgba(0, 0, 0, 0.3);
  }

  textarea::-webkit-scrollbar-thumb {
    background-color: darkgrey;
    outline: 1px solid slategrey;
  }

  .btn-update {
    width: 80%;
    height: 50px;
    background: #a1ddff;
    border-radius: 5px;
    cursor: pointer;
    border: none;

    font-family: "Poppins";
    font-style: normal;
    font-weight: 400;
    font-size: 20px;
    line-height: 45px;

    margin: 20px 0;
    transition: all 0.25s ease-in-out;

    &:hover {
      background: #399ffd;
      box-shadow: 0px 10px 20px rgba(57, 159, 253, 0.5);
      transform: translate(0, -5px);
      color: white;
    }
  }

  .btn-logout {
    width: 80%;
    height: 50px;
    background: #ff5454;
    border-radius: 5px;
    cursor: pointer;
    border: none;

    font-family: "Poppins";
    font-style: normal;
    font-weight: 400;
    font-size: 20px;
    line-height: 45px;

    margin: 20px 0;
    transition: all 0.25s ease-in-out;

    &:hover {
      background: #fd3939;
      box-shadow: 0px 10px 20px rgba(253, 57, 57, 0.5);
      transform: translate(0, -5px);
      color: white;
    }
  }
`;
