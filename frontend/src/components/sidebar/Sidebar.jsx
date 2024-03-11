import { useEffect, useState } from "react";
import "./sidebar.css";
import axios from "axios";
import { Link } from "react-router-dom";

export default function Sidebar() {
  const [cats, setCats] = useState([]);

  useEffect(() => {
    const getCats = async () => {
      const res = await axios.get("/category");
      // console.log("res is", res);
      setCats(res.data);
    };
    getCats();
  }, []);
  return (
    <div className="sidebar">
      <div className="sidebarItem">
        <span className="sidebarTitle"> ABOUT ME </span>{" "}
        <img
          className="sidebarImg"
          src="https://cdn.pixabay.com/photo/2016/06/09/17/45/hacker-1446193_1280.jpg"
          alt=""
        />
        <p>
          Green vines attached to the trunk of the tree had wound themselves
          toward the top of the canopy.{" "}
        </p>{" "}
      </div>{" "}
      <div className="sidebarItem">
        <span className="sidebarTitle"> CATEGORIES </span>{" "}
        <ul className="sidebarList">
          {" "}
          {cats.map((c, index) => {
            return (
              <Link to={`/?cat=${c.name}`} className="link">
                <li key={index} className="sidebarListItem">
                  {" "}
                  {c.name}{" "}
                </li>{" "}
              </Link>
            );
          })}{" "}
        </ul>{" "}
      </div>{" "}
      <div className="sidebarItem">
        <span className="sidebarTitle"> FOLLOW US </span>{" "}
        <div className="sidebarSocial">
          <i className="sidebarIcon fa-brands fa-square-facebook"> </i>{" "}
          <i className="sidebarIcon fa-brands fa-square-twitter"> </i>{" "}
          <i className="sidebarIcon fa-brands fa-square-pinterest"> </i>{" "}
          <i className="sidebarIcon fa-brands fa-square-instagram"> </i>{" "}
        </div>{" "}
      </div>{" "}
    </div>
  );
}
