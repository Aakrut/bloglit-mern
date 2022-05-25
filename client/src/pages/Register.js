import React, { useEffect, useState } from "react";
import styled from "styled-components";
import FormRow from "../components/FormRow";
import { toast } from "react-toastify";
import { useSelector, useDispatch } from "react-redux";
import { loginUser, registerUser } from "../features/user/userSlice";
import { useNavigate } from "react-router-dom";
import { SpinnerCircularSplit } from "spinners-react";

const initialState = {
  username: "",
  email: "",
  fullName: "",
  password: "",
  isMember: true,
};

const Register = () => {
  const [values, setValues] = useState(initialState);

  const { isLoading, user } = useSelector((state) => state.user);

  const dispatch = useDispatch();

  const navigate = useNavigate();

  const toggleMember = () => {
    setValues({ ...values, isMember: !values.isMember });
  };

  const handleChange = (e) => {
    setValues({ ...values, [e.target.name]: e.target.value });
  };

  const onSubmit = (e) => {
    e.preventDefault();
    const { username, email, password, fullName, isMember } = values;

    if (
      !email ||
      !password ||
      (!isMember && !username) ||
      (!isMember && !fullName)
    ) {
      toast.error("Please Provide All Fields.");
      return;
    }
    if (isMember) {
      dispatch(loginUser({ email: email, password: password }));
      return;
    }
    dispatch(registerUser({ username, fullName, email, password }));
  };

  useEffect(() => {
    if (user) {
      setTimeout(() => {
        navigate("/");
      }, 3000);
    }
  }, [user, navigate]);

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
        <form className="form" onSubmit={onSubmit}>
          <Main>
            <Title>BlogLit</Title>
            <h3>{values.isMember ? "Login" : "Register"}</h3>
          </Main>

          <Fields>
            {!values.isMember && (
              <FormRow
                type="username"
                placeholder="username"
                name="username"
                value={values.username}
                handleChange={handleChange}
              />
            )}

            {!values.isMember && (
              <FormRow
                type="fullName"
                placeholder="fullname"
                name="fullName"
                value={values.fullName}
                handleChange={handleChange}
              />
            )}

            <FormRow
              type="email"
              placeholder="email"
              name="email"
              value={values.email}
              handleChange={handleChange}
            />

            <FormRow
              type="password"
              placeholder="password"
              name="password"
              value={values.password}
              handleChange={handleChange}
            />
            <button type="submit" className="btn-login">
              {values.isMember ? "Login" : "Register"}
            </button>
            <p>
              {values.isMember
                ? "Not Have An Account?"
                : "Already Have an Account? "}
              <span onClick={toggleMember}>
                {" "}
                {!values.isMember ? "Login" : "Create one."}
              </span>
            </p>
          </Fields>
        </form>
      </ContentWrapper>
    </Wrapper>
  );
};

export default Register;

const Loader = styled.div`
  height: 800px;
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const Wrapper = styled.div`
  height: 100vh;
`;

const ContentWrapper = styled.div`
  max-width: 1234px;
  height: 100%;
  margin: 0 auto;
  display: flex;
  align-items: center;
  justify-content: center;

  .form {
    background: white;
    width: 380px;
    border-radius: 5px;

    border: 1px solid black;
    box-shadow: 0px 20px 30px rgba(0, 0, 0, 0.2);
  }
`;

const Main = styled.div`
  text-align: center;
  margin: 20px 0;

  h3 {
    font-family: "Poppins";
    font-style: normal;
    font-weight: 700;
    font-size: 30px;
    line-height: 45px;
  }
`;

const Title = styled.h2`
  font-family: "Inter";
  font-style: normal;
  font-weight: 700;
  font-size: 50px;
  line-height: 75px;
  margin: 10px 0;
`;

const Fields = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;

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

  .btn-login {
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

  p {
    font-family: "Poppins", sans-serif;
    font-style: normal;
    font-weight: 400;
    font-size: 12px;
    line-height: 30px;
    margin-bottom: 20px;
  }

  span {
    font-family: "Poppins", sans-serif;
    font-style: normal;
    font-weight: 450;
    font-size: 14px;
    line-height: 30px;
    color: #399ffd;
    transition: all 0.3s ease-in-out;

    cursor: pointer;
  }
`;
