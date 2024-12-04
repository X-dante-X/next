'use client'

import { useState } from 'react';
import { useAuth } from "@/lib/AuthContext";
import { updateProfile } from 'firebase/auth';
import { getAuth } from 'firebase/auth';
import Image from 'next/image';
import { redirect } from 'next/navigation';
import { doc, getDoc, setDoc } from 'firebase/firestore';
import { db } from '@/lib/firebase';
import { IUserData } from '@/types/user.types';

export default function UpdateProfile() {
  const { user } = useAuth();
  const [name, setName] = useState<string>(user?.displayName || '');
  const [email, setEmail] = useState<string>(user?.email || '');
  const [avatar, setAvatar] = useState<string>(user?.photoURL || "/avatar.jpg");
  const [city, setCity] = useState<string>('');
  const [street, setStreet] = useState<string>('');
  const [zipCode, setZipCode] = useState<string>('');
  const [loading, setLoading] = useState<boolean>(false);

  const [userData, setUserData] = useState<IUserData | null>(null);
  const auth = getAuth();


  if (user?.uid) {
    const fetchUserData = async () => {
      try {
        const snapshot = await getDoc(doc(db, "users", user.uid));
        if (snapshot.exists()) {
          const address = snapshot.data().address;
          setCity(address.city);
          setStreet(address.street);
          setZipCode(address.zipCode);
          setUserData(address)
        }
      } catch (error) {
        console.error("Error fetching user data:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchUserData();
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      if (name !== user?.displayName || email !== user?.email || avatar !== user?.photoURL) {

        if (auth.currentUser) {
          await updateProfile(auth.currentUser, {
            displayName: name,
            photoURL: avatar,
          });
          
          
          if (city !== userData?.city || street !== userData?.street || zipCode !== userData?.zipCode) {
    
            if (user?.uid) {
              await setDoc(doc(db, "users", user.uid), {
                address: {
                  city: city,
                  street: street,
                  zipCode: zipCode,
                },
              });
            }
          }

          await auth.currentUser.reload();
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
    <div className="flex items-center justify-center py-52 bg-gradient-to-r from-teal-400 via-blue-500 to-indigo-600">
      <div className="w-full max-w-md bg-white rounded-lg shadow-lg p-8">
        <h1 className="text-3xl font-semibold text-center text-gray-800 mb-6">Update Profile</h1>
        <form onSubmit={handleSubmit} className="space-y-6">
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
              className="text-slate-950"
            />
          </div>
  
          <div>
            <label
              htmlFor="name"
              className="block text-sm font-medium text-gray-700 mb-2"
            >
              Name
            </label>
            <input
              id="name"
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="text-slate-950 w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            />
          </div>
  
          <div>
            <label
              htmlFor="email"
              className="block text-sm font-medium text-gray-700 mb-2"
            >
              Email
            </label>
            <input
              id="email"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              className="text-slate-950 w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            />
          </div>

          <div>
            <label
              htmlFor="city"
              className="block text-sm font-medium text-gray-700 mb-2"
            >
              City
            </label>
            <input
              id="city"
              type="city"
              value={city}
              onChange={(e) => setCity(e.target.value)}
              required
              className="text-slate-950 w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            />
          </div>

          <div>
            <label
              htmlFor="street"
              className="block text-sm font-medium text-gray-700 mb-2"
            >
              Street
            </label>
            <input
              id="street"
              type="street"
              value={street}
              onChange={(e) => setStreet(e.target.value)}
              required
              className="text-slate-950 w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            />
          </div>

          <div>
            <label
              htmlFor="zipCode"
              className="block text-sm font-medium text-gray-700 mb-2"
            >
              Zip Code
            </label>
            <input
              id="zipCode"
              type="zipCode"
              value={zipCode}
              onChange={(e) => setZipCode(e.target.value)}
              required
              className="text-slate-950 w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            />
          </div>
  
          <button
            type="submit"
            disabled={loading}
            className={`w-full py-3 bg-blue-500 text-white font-semibold rounded-lg ${
              loading ? "cursor-not-allowed" : "hover:bg-blue-600"
            } transition duration-300`}
          >
            {loading ? "Updating..." : "Update Profile"}
          </button>
        </form>
      </div>
    </div>
  );
}
