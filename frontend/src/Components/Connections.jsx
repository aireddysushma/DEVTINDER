import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import axios from "axios";
import BASE_URL from "../utils/constant";
import { addConnections } from "../utils/connectionSlice";

const Connections = () => {
  const dispatch = useDispatch();
  const connectionData = useSelector((store) => store.connections);

  const fetchConnections = async () => {
    try {
      const res = await axios.get(BASE_URL + "/user/connections", {
        withCredentials: true,
      });
      dispatch(addConnections(res.data.data));
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    fetchConnections();
  }, []);

  if (!connectionData) return null;
  if (connectionData.length === 0) {
    return <div>no connections found</div>;
  }

  return (
    <div className="flex flex-col justify-center items-center my-10 ">
      <h2 className="text-4xl text-zinc-500 mb-6">Connections</h2>
      {connectionData.map((user) => {
        const { firstName, lastName, photoURL, age, about, gender } =
          user;
        return (
          <div className="flex w-1/2  mb-5 gap-5 bg-base-200" key={user._id}>
            <div className="avatar">
              <div className="w-24 h- full rounded">
                <img className="w-full h-full" src={photoURL} />
              </div>
            </div>
            <div className="my-3">
              <div>{firstName + " " + lastName}</div>
              {age && gender && <div> {age + " " + gender}</div>}
              <div>{about}</div>
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default Connections;
