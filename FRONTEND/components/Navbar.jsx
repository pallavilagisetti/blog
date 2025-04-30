"use client";

import Link from "next/link";
import { useRouter } from "next/navigation"; // ✅ App Router
import { auth } from "../app/config/firebaseApp"; // ✅ Updated path
import { useAuthState } from "react-firebase-hooks/auth";
import { signOut } from "firebase/auth";

export default function Navbar() {
  const [user] = useAuthState(auth);
  const router = useRouter();

  const signUserOut = async () => {
    await signOut(auth);
    router.push("/login"); // ✅ Redirect to login after sign out
  };

  return (
    <div className="flex justify-between items-center bg-[#f7f7f7] px-10 py-6 shadow-sm">
      <div className="text-xl font-bold">My Blog</div>
      <div className="flex gap-6 items-center">
        <Link href="/" className="text-gray-700 hover:text-blue-600 transition">Home</Link>
        {user && (
          <Link href="/createPost" className="text-gray-700 hover:text-blue-600 transition">
            Create Post
          </Link>
        )}
        {user ? (
          <>
            <Link href="/profile" className="text-gray-700 hover:text-blue-600 transition">
              Profile
            </Link>
            <button
              onClick={signUserOut}
              className="text-red-500 hover:text-red-700 transition"
            >
              Sign Out
            </button>
          </>
        ) : (
          <Link href="/login" className="text-blue-600 hover:underline">Login</Link>
        )}
      </div>
    </div>
  );
}
