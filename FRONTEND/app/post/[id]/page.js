"use client";


import React, { useState, useEffect } from "react";
import axios from "axios";

export default function CreatePost({ params: paramsPromise }) {
  const params = React.use(paramsPromise);
  const { id } = params;
  console.log(id);
  const [post, setPost] = useState(null);
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(`http://localhost:8080/getPost/${id}`);
        setPost(response.data);
        console.log(data);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };
    fetchData();
  }, []);

  const handleDelete = async () => {
    console.log("Delete triggered");
    if (!isAuthorized) {
      alert("You are not authorized to delete this post.");
      return;
    }
  
    const confirmDelete = window.confirm("Are you sure you want to delete this post?");
    if (!confirmDelete) return;
  
    try {
      const response = await axios.delete(`http://localhost:8080/deletePost/${id}`);
      console.log("Delete response:", response);
      if (response.status === 200) {
        alert("Post deleted successfully");
        window.location.href = "/";
      }
    } catch (error) {
      console.error("Error deleting post:", error);
    }
  };
  
  
  return (
    <div className="mx-24 my-24 lg:mx-42">
      {post === null ? (
        <div className="flex justify-center items-center h-[80%]">
          {" "}
          Loading{" "}
        </div>
      ) : (
        <div className="flex flex-wrap gap-4">
          <h1 className="text-5xl font-bold mb-6">{post.title}</h1>
          <p className="text-gray-200">{post.description}</p>
          <p className="text-gray-500">{new Date(post.created_at).toLocaleDateString()}</p>
          <div className="flex justify-between w-screen">
            <p className="text-gray-500">@{post.author}</p>
            <div className="flex gap-4">
            <button className="bg-slate-200 text-black p-2 rounded-md hover:cursor-pointer hover:scale-110 transition-all delay-75" onClick={() =>window.location.href = `/editPost/${post.id}`}>Edit</button>
            <button className="bg-slate-200 text-black p-2 rounded-md hover:cursor-pointer hover:scale-110 transition-all delay-75" onClick={handleDelete}>Delete</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
