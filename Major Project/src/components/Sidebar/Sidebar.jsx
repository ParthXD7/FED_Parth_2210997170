import React, { useEffect, useState } from "react";
import { BiSolidHome, BiLibrary } from "react-icons/bi";
import { FiSearch } from "react-icons/fi";
import { FaPlus } from "react-icons/fa";
import { TbWorld } from "react-icons/tb";
import "./Sidebar.css";
import { Link } from "react-router-dom";

const Sidebar = () => {
  const [playlists, setPlaylists] = useState([]);
  const getPlaylists = async () => {
    const res = await fetch("http://localhost:5000/api/playlist/", {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    });

    let d = await res.json();
    console.log(d);
    setPlaylists(d.playlists);
  };
  useEffect(() => {
    getPlaylists();
  }, []);
  return (
    <div className="w-1/4 fixed left-0 mt-2 top-0 sidebar ">
      <div className="nav secondary_bg rounded-lg p-6">
      <img src="./assets/jio_saavn_logo.png" width={300} style={{ padding: '10px', margin: '20px' }}/>

        <Link to={"/"} className="flex items-center gap-6">
          <BiSolidHome className="font-bold text-2xl" />
          <span className="text-lg">Home</span>
        </Link>
        <Link to={"/search"} className="flex mt-4 items-center gap-6">
          <FiSearch className="font-bold text-2xl" />
          <span className="text-lg">Search</span>
        </Link>
      </div>   
      <button className="mx-4 mt-12 text-sm border-white border rounded-full flex gap-2 px-3 py-1 items-center  text-white ">
        <TbWorld />
        <span className="text-white font-bold">English</span>
      </button>

   
    </div>
  );
};

export default Sidebar;
