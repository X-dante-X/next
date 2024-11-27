'use client'

import { useState } from 'react';
import { useAuth } from "@/lib/AuthContext";
import { updateProfile } from 'firebase/auth';
import { getAuth } from 'firebase/auth';
import Image from 'next/image';
import { redirect } from 'next/navigation';

export default function UpdateProfile() {
  const { user } = useAuth();
  const [name, setName] = useState<string>(user?.displayName || '');
  const [email, setEmail] = useState<string>(user?.email || '');
  const [avatar, setAvatar] = useState<string>(user?.photoURL || '/default-avatar.png');
  const [loading, setLoading] = useState<boolean>(false);
  const auth = getAuth();

  // Handle form submission
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      if (name !== user?.displayName || email !== user?.email || avatar !== user?.photoURL) {
        const updatedUser = auth.currentUser;

        if (updatedUser) {
          await updateProfile(updatedUser, {
            displayName: name,
            photoURL: avatar,
          });

        }
      } else {
      }
    } catch (error) {
      console.error("Error updating profile: ", error);
    } finally {
      setLoading(false);
      redirect("profile")
    }
  };

  const handleAvatarChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {

      const avatarUrl = URL.createObjectURL(file);
      setAvatar(avatarUrl);
    }
  };
  if (!user) {
    return <p>Loading...</p>;
  }

  return (
    <div className="max-w-lg mx-auto p-6 bg-white rounded-lg shadow-lg">
      <h1 className="text-2xl font-semibold mb-4 text-center">Update Profile</h1>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div className="flex justify-center">
          <Image
            src={avatar}
            alt="Profile"
            width={100}
            height={100}
            className="rounded-full object-cover mb-4"
          />
        </div>
        <div className="flex justify-center">
          <input
            type="file"
            accept="image/*"
            onChange={handleAvatarChange}
            className="mb-4"
          />
        </div>

        <div>
          <label htmlFor="name" className="block text-sm font-medium text-gray-700">Name</label>
          <input
            id="name"
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
          />
        </div>

        <div>
          <label htmlFor="email" className="block text-sm font-medium text-gray-700">Email</label>
          <input
            id="email"
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
          />
        </div>

        <button
          type="submit"
          disabled={loading}
          className={`w-full py-3 mt-6 bg-blue-500 text-white font-semibold rounded-lg ${loading ? 'cursor-not-allowed' : 'hover:bg-blue-600'} transition duration-300`}
        >
          {loading ? 'Updating...' : 'Update Profile'}
        </button>
      </form>
    </div>
  );
}
