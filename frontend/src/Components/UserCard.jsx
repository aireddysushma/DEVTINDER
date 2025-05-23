import React from "react";

const UserCard = ({ user }) => {
  const { photoURL, firstName, lastName, gender, age, about } = user;
  return (
    <div className="card bg-base-300 w-96 shadow-sm">
      <figure className="w-full h-80 overflow-hidden">
        <img
          src={photoURL}
          alt="profile_pic"
        />
      </figure>
      <div className="card-body">
        <h2 className="card-title">{firstName + " " + lastName}</h2>
        {age && gender && <p>{age + " " + gender}</p>}
        <p>{about}</p>
        <div className="card-actions justify-center">
          <button className="btn btn-primary">Ignore</button>
          <button className="btn btn-secondary">Interested</button>
        </div>
      </div>
    </div>
  );
};

export default UserCard;
