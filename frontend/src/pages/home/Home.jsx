import "./home.css";
import Header from "../../components/header/Header";
import Posts from "../../components/posts/Posts";
import Sidebar from "../../components/sidebar/Sidebar";
import { useEffect, useState } from "react";
import axios from "axios";
import { useLocation } from "react-router-dom";

export default function Home() {
  const [posts, setPosts] = useState([]);
  const { search } = useLocation();
  // console.log("search", search);

  useEffect(() => {
    const fetchPosts = async () => {
      const resp = await axios.get("/posts" + search);
      // console.log("resp", resp);
      setPosts(resp.data);
    };
    fetchPosts();
  }, [search]);
  return (
    <>
      <Header />
      <div className="home">
        <Posts posts={posts} /> <Sidebar />
      </div>{" "}
    </>
  );
}
