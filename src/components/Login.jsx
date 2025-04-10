import React, { useState } from "react";
import SideImageCard from "./common/SideImageCard";
import UserNameInput from "./common/Inputs/UserNameInput";
import PasswordInput from "./common/Inputs/PasswordInput";
import axios from "axios";
import { useDispatch } from "react-redux";
import { addUser } from "../utils/userSlice";
import { useNavigate } from "react-router-dom";

const Login = () => {
  const [userName, setUserName] = useState("vikas@mail.com");
  const [userPassword, setUserPassword] = useState("StronG@812888");
  const [errorMessage, setErrorMessage] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const handleLoginClick = async () => {
    try {
      setIsLoading(true);
      const response = await axios.post(
        "http://localhost:7777/auth/login",
        {
          email: userName,
          password: userPassword,
        },
        { withCredentials: true }
      );
      console.log("auth response:", response);

      if (response.status === 200) {
        // Handle successful login
        console.log("Login successful:", response.data);
        setErrorMessage("");
        dispatch(addUser(response.data.user));
        navigate("/");
      }
    } catch (error) {
      console.error("Login failed:", error);
      setErrorMessage("Invalid credentials or server error.");
    } finally {
      setIsLoading(false);
    }
  };
  return (
    <div className="flex justify-center items-center w-full h-full mt-30">
      <div>
        <SideImageCard
          card_title={"Login to see magic!"}
          card_description={"signup or login to use the app."}
          card_image_url={
            "https://img.daisyui.com/images/stock/photo-1635805737707-575885ab0820.webp"
          }
        >
          <div className="flex-col gap-10">
            <div className="mb-2">
              <UserNameInput value={userName} setValue={setUserName} />
            </div>
            <div className="mb-2">
              <PasswordInput value={userPassword} setValue={setUserPassword} />
            </div>
            <div className="mt-10 text-center">
              <button className="btn btn-primary" onClick={handleLoginClick}>
                Login
              </button>
            </div>
          </div>
        </SideImageCard>
      </div>
    </div>
  );
};

export default Login;
