import React from "react";

const UserCard = ({ user }) => {
  const { photoUrl, firstName, lastName, age, gender, skills, about } = user;
  return (
    <div className="card bg-base-300 w-96 shadow-sm">
      <figure className="max-h-96">
        <img src={photoUrl} alt="profile-image" />
      </figure>
      <div className="card-body">
        <h2 className="card-title">{firstName + " " + lastName}</h2>
        <p>
          {age}, {gender}
        </p>
        <p>{about}</p>
        <div className="card-actions justify-center mt-10">
          <button className="btn btn-error">Ignore</button>
          <button className="btn btn-primary">Interested</button>
        </div>
      </div>
    </div>
  );
};

export default UserCard;
