"use client";
import { useAuth } from "@/lib/AuthContext";
import { deleteUser } from "firebase/auth";
import { redirect } from "next/navigation";
import { useState } from "react";
import { getDoc, doc } from "firebase/firestore";
import { db } from "@/lib/firebase";
import { IUserData } from "@/types/user.types";

export default function Profile() {
  const { user } = useAuth();
  const [isLoading, setIsLoading] = useState(true);
  const [userData, setUserData] = useState<IUserData | null>(null);

  if (user?.uid) {
    const fetchUserData = async () => {
      try {
        const snapshot = await getDoc(doc(db, "users", user.uid));
        if (snapshot.exists()) {
          const address = snapshot.data().address;
          setUserData(address);
        }
      } catch (error) {
        console.error("Error fetching user data:", error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchUserData();
  }

  const handleDeleteUser = async () => {
    if (
      confirm(
        "Are you sure you want to delete your account? This action cannot be undone."
      )
    ) {
      try {
        if (user) {
          await deleteUser(user);
          redirect("/user/signin");
        }
      } catch (error) {
        console.error("Error deleting user:", error);
      }
    }
  };

  if (!user || isLoading) {
    return <p>Loading...</p>;
  }

  return (
    <div className="flex items-center justify-center py-52 bg-gradient-to-r from-indigo-600 via-blue-500 to-teal-400">
      <div className="w-full max-w-md bg-white rounded-lg shadow-lg p-8">
        <h1 className="text-3xl font-semibold text-center text-gray-800 mb-6">
          Profile
        </h1>
        <div className="space-y-4">
          <div className="flex justify-between">
            <span className="font-medium text-gray-700">Name:</span>
            <span className="text-gray-600">
              {user.displayName || "No name provided"}
            </span>
          </div>
          <div className="flex justify-between">
            <span className="font-medium text-gray-700">Email:</span>
            <span className="text-gray-600">{user.email}</span>
          </div>
          <div className="flex justify-between">
            <span className="font-medium text-gray-700">City:</span>
            <span className="text-gray-600">{userData?.city}</span>
          </div>
          <div className="flex justify-between">
            <span className="font-medium text-gray-700">Street:</span>
            <span className="text-gray-600">{userData?.street}</span>
          </div>
          <div className="flex justify-between">
            <span className="font-medium text-gray-700">zipCode:</span>
            <span className="text-gray-600">{userData?.zipCode}</span>
          </div>
        </div>

        <div className="mt-6 text-center">
          <button
            onClick={() => redirect("changepassword")}
            className="px-6 py-3 w-full bg-red-400 text-white font-semibold rounded-lg hover:bg-red-600 transition duration-300"
          >
            Change Password
          </button>

          <button
            onClick={handleDeleteUser}
            className="px-6 mt-6 py-3 w-full bg-red-500 text-white font-semibold rounded-lg hover:bg-red-700 transition duration-300"
          >
            Delete User
          </button>

          <button
            onClick={() => redirect("updateprofile")}
            className="px-6 mt-6 py-3 w-full bg-amber-600 text-white font-semibold rounded-lg hover:bg-amber-800 transition duration-300"
          >
            Update Profile
          </button>
        </div>
      </div>
    </div>
  );
}
