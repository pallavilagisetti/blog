"use client";
import { useState, useEffect } from "react";
import Post from "@/components/Post";
import axios from "axios";
import Image from "next/image";

export default function Home() {
  const [posts, setData] = useState(null);


  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get("http://localhost:8080/getPosts");
        setData(response.data);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, []);
  console.log(posts)


  // const posts = [
  //   {title: "Dinesh", description: "Babau", date: "2025-04-20"},
  //   {title: "Pallavi", description: "l", date: "2025-04-20"},
  //   {title: "Raj", description: "sfd", date: "2025-04-20"},
  // ]
  return (
    <div className="mx-24 my-10 flex gap-4">
      {posts === null ? <div className="flex justify-center items-center h-[80%]"> Loading </div> : <div className="flex flex-wrap gap-12 w-screen justify-center"> {
        posts.map((i, index) => {
          return (
            <Post key={index} title={i.title} description={i.description} date={i.created_at} author={i.author} id= {i.id}/>
          )
        })
      } </div>}
    </div>
  );
}
