import axios from "axios";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import "./sidebar.css";

export default function Sidebar() {
  const [cats, setCats] = useState([]);

  useEffect(function() {
    const getCats = async function() {
      const res = await axios.get("/categories");
      setCats(res.data);
    }
    getCats();
  },[])

  return (
    <div className="sidebar">
      <div className="sidebarItem">
        <span className="sidebarTitle">ABOUT ME</span>
        <img src="https://reductress.com/wp-content/uploads/2019/06/ManWhite.jpg"
          alt="" />
        <p>
          Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.
          Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.
         </p>
      </div>
      <div className="sidebarItem">
        <span className="sidebarTitle">CATEGORIES</span>
        <ul className="sidebarList">
        {cats.map(function(c) {
          return (
            <Link to={`/?cat=${c.name}`} className="link" key={`${c._id}`}>
              <li className="sidebarListItem">{c.name}</li>
            </Link>
          )
        })}
        </ul>
      </div>
      <div className="sidebarItem">
        <span className="sidebarTitle">FOLLOW US</span>
        <div className="sidebarSocial">
          <i className="sidebarIcon fab fa-accessible-icon"></i>
          <i className="sidebarIcon far fa-angry"></i>
          <i className="sidebarIcon fas fa-anchor"></i>
          <i className="sidebarIcon fas fa-ankh"></i>
         </div>
      </div>
    </div>
  )
}
