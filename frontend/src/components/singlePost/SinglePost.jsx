import { useLocation, Link } from "react-router-dom";
import "./singlePost.css";
import { useEffect, useState, useContext } from "react";
import axios from "axios";
import { Context } from "../../context/Context";

export default function SinglePost() {
  const location = useLocation();
  const post_id = location.pathname.split("/")[2];
  const [post, setPost] = useState({});
  const PF = "http://localhost:8000/images/";
  const { user } = useContext(Context);
  const [title, setTitle] = useState("");
  const [desc, setDesc] = useState("");
  const [updatemode, setUpdatemode] = useState(false);
  console.log("user is", user);

  useEffect(() => {
    const getPost = async () => {
      const res = await axios.get("/posts/" + post_id);
      console.log(res.data);
      setPost(res.data);
    };
    getPost();
  }, [post_id]);
  const handleDelete = async () => {
    // console.log("handledelete", `/posts/${post._id}`, post, post_id);
    try {
      console.log("try working");
      await axios.delete(`/posts/${post_id}`, {
        data: { username: user.username },
      });
      window.location.replace("/");
    } catch (err) {
      console.log("the error is", err);
    }
  };
  const handleUpdate = async () => {
    console.log(title, desc, post_id, user.username);
    try {
      await axios.put(`/posts/${post_id}`, {
        username: user.username,
        title,
        desc,
      });
      window.location.reload();
      setUpdatemode(false);
    } catch (err) {
      console.log("the error is", err);
    }
  };
  return (
    <div className="singlePost">
      <div className="singlePostWrapper">
        {" "}
        {post.photo && (
          <img className="singlePostImg" src={PF + post.photo} alt="" />
        )}{" "}
        {updatemode ? (
          <input
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className="singlePostTitleInput"
          />
        ) : (
          <h1 className="singlePostTitle">
            {" "}
            {post.title}{" "}
            {user && post.username === user.username && (
              <div className="singlePostEdit">
                <i
                  className="singlePostIcon fa-regular fa-pen-to-square"
                  onClick={() => setUpdatemode(true)}
                >
                  {" "}
                </i>{" "}
                <i
                  className="singlePostIcon fa-solid fa-trash"
                  onClick={handleDelete}
                >
                  {" "}
                </i>{" "}
              </div>
            )}{" "}
          </h1>
        )}{" "}
        <div className="singlePostInfo">
          <span className="singlePostAuthor">
            {" "}
            Author:
            <Link to={`/?user=${post.username}`} className="link">
              {" "}
              <b> {post.username} </b>{" "}
            </Link>{" "}
          </span>{" "}
          <span className="singlrPostDate">
            {" "}
            {new Date(post.createdAt).toDateString()}{" "}
          </span>{" "}
        </div>{" "}
        <div className="singlePostDescContainer">
          {" "}
          {updatemode ? (
            <textarea
              value={desc}
              className="singlePostDescInput"
              onChange={(e) => {
                setDesc(e.target.value);
              }}
            />
          ) : (
            <p className="singlePostDesc"> {post.desc} </p>
          )}{" "}
          {updatemode && (
            <button className="singlePostButton" onClick={handleUpdate}>
              {" "}
              Update{" "}
            </button>
          )}{" "}
        </div>{" "}
      </div>{" "}
    </div>
  );
}
