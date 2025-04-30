"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { auth } from "../config/firebaseApp";
import { useAuthState } from "react-firebase-hooks/auth";
import axios from "axios";

export default function CreatePost() {
  const [user, loading] = useAuthState(auth);
  const router = useRouter();

  const [formData, setFormData] = useState({
    title: "",
    description: ""
  });

  useEffect(() => {
    if (!loading && !user) {
      router.push("/login");
    }
  }, [user, loading]);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const { title, description } = formData;

    if (!title || !description) {
      return alert("Please fill in all the required fields.");
    }

    try {
      const response = await axios.post("http://localhost:8080/createPost", {
        title,
        description,
        author: user.displayName,      // ✅ Automatically added
        author_email: user.email        // ✅ Automatically added
      });

      if (response.status === 200) {
        alert("Post created successfully!");
        setFormData({ title: "", description: "" });
        router.push("/");
      }
    } catch (error) {
      console.error("Error creating post:", error);
      alert("Internal server error.");
    }
  };

  if (loading) return <p className="text-center mt-20">Loading...</p>;

  return (
    <div className="min-h-screen px-8 py-12 bg-[#f3f4f6] text-gray-800">
      <h1 className="text-3xl font-bold mb-8">Create Your Post</h1>
      <form className="flex flex-col gap-5 max-w-xl" onSubmit={handleSubmit}>
        <div>
          <label htmlFor="title" className="block text-sm font-semibold mb-1">Title</label>
          <input
            name="title"
            type="text"
            className="w-full p-3 rounded border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-400"
            placeholder="Enter your title..."
            onChange={handleChange}
            value={formData.title}
          />
        </div>

        <div>
          <label htmlFor="description" className="block text-sm font-semibold mb-1">Description</label>
          <input
            name="description"
            type="text"
            className="w-full p-3 rounded border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-400"
            placeholder="Write a short description..."
            onChange={handleChange}
            value={formData.description}
          />
        </div>

        <button
          type="submit"
          className="mt-4 bg-blue-600 text-white py-3 rounded hover:bg-blue-700 transition"
        >
          PUBLISH
        </button>
      </form>
    </div>
  );
}
