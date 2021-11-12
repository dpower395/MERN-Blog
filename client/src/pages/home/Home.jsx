import { useEffect, useState } from "react";
import axios from "axios";
import { useLocation } from "react-router";
import "./home.css";
import Header from "../../components/header/Header";
import Posts from "../../components/posts/Posts";
import Sidebar from "../../components/sidebar/Sidebar";

export default function Home() {
  const [posts,setPosts] = useState([]);
  const {search} = useLocation();

  useEffect(function() {
    const fetchPosts = async function() {
      const res = await axios.get("/posts" + search);
      setPosts(res.data);
    }
    fetchPosts();
  }, [search])

  return (
    <>
      <Header />
      <div className="home">
        <Posts posts={posts}/>
        <Sidebar />
      </div>
    </>
  )
}
