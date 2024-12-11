"use client";

import { useAuth } from "@/lib/AuthContext";
import { useRouter } from "next/navigation";
import Button from "@/components/Button";
import { useUserData } from "../hooks/useUserData";
import { useDeleteUser } from "../hooks/useDeleteUser";

export default function Profile() {
  const { user } = useAuth();
  const { push } = useRouter();
  const { userData, isLoading } = useUserData(user?.uid);
  const handleDeleteUser = useDeleteUser();

  if (!user || isLoading) {
    return <p>Loading...</p>;
  }

  return (
    <div className="flex items-center justify-center py-52 bg-gradient-to-r from-indigo-600 via-blue-500 to-teal-400">
      <div className="w-full max-w-md bg-stone-950 rounded-lg shadow-lg p-8">
        <h1 className="text-3xl font-semibold text-center text-slate-200 mb-6">Profile</h1>
        <div className="space-y-4">
          <div className="flex justify-between">
            <span className="font-medium text-gray-500">Name:</span>
            <span className="text-gray-400">{user.displayName || "No name provided"}</span>
          </div>
          <div className="flex justify-between">
            <span className="font-medium text-gray-500">Email:</span>
            <span className="text-gray-400">{user.email}</span>
          </div>
          <div className="flex justify-between">
            <span className="font-medium text-gray-500">City:</span>
            <span className="text-gray-400">{userData?.city}</span>
          </div>
          <div className="flex justify-between">
            <span className="font-medium text-gray-500">Street:</span>
            <span className="text-gray-400">{userData?.street}</span>
          </div>
          <div className="flex justify-between">
            <span className="font-medium text-gray-500">zipCode:</span>
            <span className="text-gray-400">{userData?.zipCode}</span>
          </div>
        </div>

        <div className="mt-6 flex flex-col gap-4 text-center">
          <Button onClick={() => push("changepassword")}>Change Password</Button>

          <Button onClick={handleDeleteUser}>Delete User</Button>

          <Button onClick={() => push("updateprofile")}>Update Profile</Button>
        </div>
      </div>
    </div>
  );
}
