import React, { useState } from "react";
import styled from "styled-components";
import { useDispatch, useSelector } from "react-redux";
import FormRow from "../../components/FormRow";
import { logoutUser } from "../../features/user/userSlice";
import FileBase64 from "react-file-base64";

const UserProfile = () => {
  const { user } = useSelector((state) => state.user);

  const [userData, setDataUser] = useState({
    username: user?.username || "",
    email: user?.email || "",
    fullName: user?.fullName || "",
    avatar: user?.avatar || "",
    bio: user?.bio || "",
  });

  const dispatch = useDispatch();

  const handleChange = (e) => {
    setDataUser({ ...userData, [e.target.name]: e.target.value });
  };

  const onSubmit = (e) => {
    e.preventDefault();
    console.log(userData);
  };

  return (
    <Wrapper>
      <ContentWrapper>
        <ImageWrapper>
          <img src={user.avatar} alt="profile" />
        </ImageWrapper>

        <DetailsWrapper>
          <form className="form" onSubmit={onSubmit}>
            <FormRow
              type="text"
              placeholder="username"
              name="username"
              value={userData.username}
              handleChange={handleChange}
            />

            <FormRow
              type="text"
              placeholder="fullName"
              name="fullName"
              value={userData.fullName}
              handleChange={handleChange}
            />

            <FormRow
              type="email"
              placeholder="email"
              name="email"
              value={userData.email}
              handleChange={handleChange}
            />

            <FormRow
              type="text"
              placeholder="bio"
              name="bio"
              value={userData.bio}
              handleChange={handleChange}
            />

            <FileBase64
              type="file"
              label="Image"
              multiple={false}
              name="myFile"
              accept=".jpeg, .png, .jpg"
              onDone={({ base64 }) =>
                setDataUser({ ...userData, avatar: base64 })
              }
            />

            <button type="submit" className="btn-update">
              Update Profile
            </button>

            <button className="btn-logout" onClick={() => dispatch(logoutUser)}>
              Log Out
            </button>
          </form>
        </DetailsWrapper>
      </ContentWrapper>
    </Wrapper>
  );
};

export default UserProfile;

const Wrapper = styled.div`
  height: 80vh;
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
`;

const ImageWrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;

  img {
    width: 150px;
    height: 150px;
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
