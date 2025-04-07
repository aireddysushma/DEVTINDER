import axios from "axios";
import React, { useEffect } from "react";
import BASE_URL from "../utils/constant";
import { useDispatch, useSelector } from "react-redux";
import { addRequest, removeRequest } from "../utils/requestsSlice";

const Requests = () => {
  const dispatch = useDispatch();
  const requestData = useSelector((store) => store.requests);

  const fetchRequests = async () => {
    try {
      const res = await axios.get(BASE_URL + "/user/requests", {
        withCredentials: true,
      });
      dispatch(addRequest(res.data.connectionRequest));
    } catch (error) {
      console.log(error);
    }
  };

  const handleRequest = async (_id, status) => {
    try {
      await axios.post(
        BASE_URL + "/request/review/" + status + "/" + _id,
        {},
        { withCredentials: true }
      );
      dispatch(removeRequest(_id));
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchRequests();
  }, []);

  if (!requestData) return null;
  if (requestData.length === 0) {
    return <div>no requests found</div>;
  }
  return (
    <div className="flex flex-col justify-center items-center my-10 ">
      <h2 className="text-4xl text-zinc-500 mb-6">Requests</h2>
      {requestData.map(({ fromUserId, _id }) => {
        const { firstName, lastName, photoURL, age, about, gender } =
          fromUserId;
        return (
          <div
            className="flex w-full md:w-3/4 lg:w-1/2 p-4 mb-5 gap-5 bg-base-200 items-center flex-col md:flex-row"
            key={fromUserId._id}
          >
            <div className="avatar">
              <div className="w-24 h- full rounded">
                <img className="w-full h-full" src={photoURL} />
              </div>
            </div>
            <div className="my-3 flex-1 text-center md:text-left">
              <div>{firstName + " " + lastName}</div>
              {age && gender && <div> {age + " " + gender}</div>}
              <div>{about}</div>
            </div>
            <div className="flex gap-3 mr-5">
              <button
                className="btn btn-primary"
                onClick={() => handleRequest(_id, "accepted")}
              >
                Accept
              </button>
              <button
                className="btn btn-secondary"
                onClick={() => handleRequest(_id, "rejected")}
              >
                Reject
              </button>
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default Requests;
