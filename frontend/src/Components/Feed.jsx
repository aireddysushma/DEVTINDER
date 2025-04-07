import { useEffect } from "react";
import BASE_URL from "../utils/constant";
import { useDispatch, useSelector } from "react-redux";
import axios from "axios";
import { addFeed } from "../utils/feedSlice";
import UserCard from "./UserCard";

const Feed = () => {
  const dispatch = useDispatch();
  const feed = useSelector((store) => store.feed);
  const handleProfileFeed = async () => {
    try {
      if (feed) return;
      const res = await axios.get(BASE_URL + "/feed", {
        withCredentials: true,
      });
      dispatch(addFeed(res.data));
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    handleProfileFeed();
  }, []);
  
  if (!feed) return null;
  if (feed.length === 0) {
    return <div className="flex justify-center my-20">No feed found</div>;
  }

  return (
    feed && (
      <div className="flex justify-center my-20">
        <UserCard user={feed[0]} />
      </div>
    )
  );
};

export default Feed;