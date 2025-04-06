import { useEffect, useState } from "react";
import UserCard from "./UserCard";
import { useDispatch } from "react-redux";
import BASE_URL from "../utils/constant";
import axios from "axios";
import { addFeed } from "../utils/feedSlice";

const EditProfile = ({ user }) => {
  const [firstName, setFirstName] = useState(user.firstName);
  const [lastName, setLastName] = useState(user.lastName);
  const [photoURL, setPhotoURL] = useState(user.photoURL);
  const [about, setAbout] = useState(user.about);
  const [age, setAge] = useState(user.age);
  const [gender, setGender] = useState(user.gender);
  const [toast, setToast] = useState(false);

  const dispatch = useDispatch();

  const profileUpdateAPI = async () => {
    try {
      const res = await axios.patch(
        BASE_URL + "/profile/edit",
        {
          firstName,
          lastName,
          photoURL,
          about,
          age,
          gender,
        },
        { withCredentials: true }
      );
      dispatch(addFeed(res.data.data));
      setToast(true);
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    const timer = setTimeout(() => {
      setToast(false);
    }, 2000);
    return () => clearTimeout(timer);
  }, [toast]);

  return (
    <div className="flex justify-center items-center  my-10 gap-20">
      <div className="flex justify-center">
        <div className="card card-border bg-base-300 w-96">
          <div className="card-body">
            <h2 className="card-title justify-center text-zinc-500 text-2xl ">
              Edit Profile
            </h2>
            <div className="flex flex-col gap-5 my-3">
              <label className="floating-label">
                <input
                  type="text"
                  placeholder="First Name"
                  className="input input-md"
                  value={firstName}
                  onChange={(e) => setFirstName(e.target.value)}
                />
                <span>First Name</span>
              </label>
              <label className="floating-label">
                <input
                  type="text"
                  placeholder="Last Name"
                  className="input input-md"
                  value={lastName}
                  onChange={(e) => setLastName(e.target.value)}
                />
                <span>Last Name</span>
              </label>
              <label className="floating-label">
                <input
                  type="text"
                  placeholder="PhotoURL"
                  className="input input-md"
                  value={photoURL}
                  onChange={(e) => setPhotoURL(e.target.value)}
                />
                <span>PhotoURL</span>
              </label>
              <label className="floating-label">
                <input
                  type="text"
                  placeholder="About"
                  className="input input-md"
                  value={about}
                  onChange={(e) => setAbout(e.target.value)}
                />
                <span>About</span>
              </label>
              <label className="floating-label">
                <input
                  type="text"
                  placeholder="Age"
                  className="input input-md"
                  value={age}
                  onChange={(e) => setAge(e.target.value)}
                />
                <span>Age</span>
              </label>
              <label className="floating-label">
                <input
                  type="text"
                  placeholder="Gender"
                  className="input input-md"
                  value={gender}
                  onChange={(e) => setGender(e.target.value)}
                />
                <span>Gender</span>
              </label>
            </div>
            <div className="card-actions justify-center mt-5">
              <button className="btn btn-outline" onClick={profileUpdateAPI}>
                Submit
              </button>
            </div>
          </div>
        </div>
      </div>
      {user && (
        <UserCard
          user={{ firstName, lastName, age, about, photoURL, gender }}
        />
      )}
      {toast && (
        <div className="toast toast-top toast-center">
          <div className="alert alert-success">
            <span>Profile Updated Successfully</span>
          </div>
        </div>
      )}
    </div>
  );
};

export default EditProfile;
