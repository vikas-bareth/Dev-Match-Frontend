import React from "react";

const RequestCard = ({ request }) => {
  const { fromUserId, status } = request;
  const { firstName, lastName, age, gender, photoUrl, skills } = fromUserId;

  return (
    <div className="card flex flex-row items-center bg-base-100 shadow-md w-full max-w-2xl p-4 mb-6">
      <figure className="w-32 h-32 flex-shrink-0">
        <img
          src={photoUrl}
          alt={`${firstName} ${lastName}`}
          className="w-full h-full object-cover rounded-full"
        />
      </figure>
      <div className="ml-6 flex-grow">
        <h2 className="card-title text-lg font-semibold">
          {firstName} {lastName}
        </h2>
        <p className="text-sm">Age: {age}</p>
        <p className="text-sm">Gender: {gender}</p>
        <p className="text-sm">Status: {status}</p>
        <div className="text-sm mt-2">Skills:</div>
        <ul className="list-disc list-inside pl-4 text-sm">
          {skills?.length > 0 ? (
            skills.map((skill, index) => <li key={index}>{skill}</li>)
          ) : (
            <li>No skills listed</li>
          )}
        </ul>
        <div className="card-actions mt-4 flex space-x-2">
          <button className="btn btn-secondary btn-xs">Decline</button>
          <button className="btn btn-primary btn-xs">Accept</button>
        </div>
      </div>
    </div>
  );
};

export default RequestCard;
