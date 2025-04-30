"use client";

import { signInWithPopup } from "firebase/auth";
import { auth, provider } from "../config/firebaseApp"; // ✅ Firebase setup
import { useRouter } from "next/navigation"; // ✅ App Router navigation
import { useAuthState } from "react-firebase-hooks/auth";
import { useEffect } from "react";

export default function Login() {
  const [user] = useAuthState(auth);
  const router = useRouter();

  const signInWithGoogle = async () => {
    try {
      await signInWithPopup(auth, provider);
      router.push("/"); // ✅ Go to home after login
    } catch (err) {
      console.error("Login error:", err);
    }
  };

  useEffect(() => {
    if (user) {
      router.push("/"); // ✅ Redirect if already logged in
    }
  }, [user]);

  return (
    <div className="flex flex-col justify-center items-center h-screen bg-black text-white">
      <p className="text-lg mb-6 font-semibold opacity-90">Sign in with Google to continue</p>
      <button
        onClick={signInWithGoogle}
        className="px-6 py-2 bg-white text-black font-medium rounded hover:bg-gray-200 transition"
      >
        Sign in with Google
      </button>
    </div>
  );
}
