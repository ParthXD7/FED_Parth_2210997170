import Layout from "../../Layout/Layout";
import Card from "../Card/Card";
import SongBar from "../MasterBar/SongBar";
import { useEffect } from "react";
import Navbar from "../Navbar";
import { useGlobalContext } from "../../states/Contet";
import Footer from "../Footer/Footer";

export const songs = [

  {
    id: Math.random() * Date.now(),
    title: "Ae Dil Hai Mushkil",
    artist: "Arijit",
    mp3: new Audio("/assets/mp3/ae.mp3"),
    img: "/assets/card.jpg",
  },

  {
    id: Math.random() * Date.now(),
    title: "Judaiyaan",
    artist: "Sidhu Moose Wala ",
    mp3: new Audio("/assets/mp3/Judaiyaan.mp3"),
    img: "/assets/sidhu.jpg",
  },
  {
    id: Math.random() * Date.now(),
    title: "Heeriye",
    artist: "Karan Aujila",
    mp3: new Audio("/assets/mp3/Heeriye.m4a"),
    img: "/assets/images.jpeg",
  },
  {
    id: Math.random() * Date.now(),
    title: "Mushkil",
    artist: "Arijit",
    mp3: new Audio("/assets/mp3/ae.mp3"),
    img: "/assets/card.jpg",
  },

  {
    id: Math.random() * Date.now(),
    title: "Judai",
    artist: "Sidhu Moose Wala ",
    mp3: new Audio("/assets/mp3/Judaiyaan.mp3"),
    img: "/assets/sidhu.jpg",
  },
  {
    id: Math.random() * Date.now(),
    title: "Heer",
    artist: "Karan Aujila",
    mp3: new Audio("/assets/mp3/Heeriye.m4a"),
    img: "/assets/images.jpeg",
  },
];

const Home = () => {
  useEffect(() => {
    
  }, []);
  return (
    <Layout>
      <Navbar />

      <div className="tertiary_bg ml-2 px-4 py-4 home ">

        <div className="flex justify-between my-4 items-center">
          <span className="text-xl font-bold hover:underline cursor-pointer">
          List
          </span>
         
        </div>
        <div className="grid  gap-6 grid-cols-5">
          {songs.map((song, i) => {
            return <Card key={song.id} idx={i} song={song} />;
          })}
        </div>
      </div>
      <Footer/>
      <SongBar />
    </Layout>
  );
};

export default Home;
