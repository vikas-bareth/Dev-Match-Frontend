import React from "react";
import SideImageCard from "./common/SideImageCard";
import UserNameInput from "./common/Inputs/UserNameInput";
import PasswordInput from "./common/Inputs/PasswordInput";

const Login = () => {
  return (
    <div className="flex justify-center items-center w-full h-full mt-30">
      <div>
        <SideImageCard
          card_title={"Login to see magic!"}
          card_description={"signup or login to use Dev-Match app."}
          card_image_url={
            "https://img.daisyui.com/images/stock/photo-1635805737707-575885ab0820.webp"
          }
        >
          <div className="flex-col gap-10">
            <div className="mb-2">
              <UserNameInput />
            </div>
            <div className="mb-2">
              <PasswordInput />
            </div>
            <div className="mt-10 text-center">
              <button className="btn btn-primary">Login</button>
            </div>
          </div>
        </SideImageCard>
      </div>
    </div>
  );
};

export default Login;
