"use client";

import { useEffect, useState } from "react";
import axios from "axios";
import { auth } from "../../config/firebaseApp"; // adjust path as needed
import { onAuthStateChanged } from "firebase/auth";

export default function EditPost() {
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    author: "",
    author_email: "",
  });

  const [loading, setLoading] = useState(true);
  const [userEmail, setUserEmail] = useState(null);
  const [isAuthorized, setIsAuthorized] = useState(false);

  // Get ID from URL path
  const id =
    typeof window !== "undefined"
      ? window.location.pathname.split("/").pop()
      : null;

  // Get current user from Firebase
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        setUserEmail(user.email);
      } else {
        setUserEmail(null);
      }
    });

    return () => unsubscribe();
  }, []);

  // Fetch post data
  useEffect(() => {
    if (!id) return;

    const fetchPost = async () => {
      try {
        const response = await axios.get(`http://localhost:8080/getPost/${id}`);
        if (response.status === 200) {
          setFormData({
            title: response.data.title,
            description: response.data.description,
            author: response.data.author,
            author_email: response.data.author_email,
          });

          // Check if the logged-in user is the post creator
          if (response.data.author_email === userEmail) {
            setIsAuthorized(true);
          }
        }
      } catch (err) {
        console.error("Error fetching post", err);
        alert("Failed to load post");
      } finally {
        setLoading(false);
      }
    };

    if (userEmail) {
      fetchPost();
    }
  }, [id, userEmail]);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const { title, description, author, author_email } = formData;

    if (!title || !description) {
      return alert("Please fill all the fields");
    }

    if (!isAuthorized) {
      return alert("You are not authorized to edit this post.");
    }

    try {
      const response = await axios.put(
        `http://localhost:8080/updatePost/${id}`,
        { title, description, author, author_email }
      );

      if (response.status === 200) {
        alert("Post updated successfully");
        window.location.href = "/";
      }
    } catch (err) {
      console.error(err);
      alert("Internal server error");
    }
  };

  if (loading) return <div className="p-10">Loading...</div>;

  if (!isAuthorized) {
    return (
      <div className="p-10 text-red-500">
        ❌ You are not authorized to edit this post.
      </div>
    );
  }

  return (
    <div className="mx-24 my-10">
      <h1 className="text-2xl font-bold mb-12">Edit Post</h1>
      <form className="flex flex-col gap-4 w-1/2" onSubmit={handleSubmit}>
        <label htmlFor="title">Title</label>
        <input
          className="border-b-2 border-gray-300 p-2"
          type="text"
          name="title"
          placeholder="Title"
          onChange={handleChange}
          value={formData.title}
        />
        <label htmlFor="description">Description</label>
        <input
          className="border-b-2 border-gray-300 p-2"
          type="text"
          name="description"
          placeholder="Description"
          onChange={handleChange}
          value={formData.description}
        />
        <button
          className="bg-blue-500 text-white p-2 rounded-md hover:bg-blue-600 transition-all duration-200"
          type="submit"
        >
          Update Post
        </button>
      </form>
    </div>
  );
}
