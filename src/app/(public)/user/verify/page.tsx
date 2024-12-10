'use client'

import { useAuth } from "@/lib/AuthContext";
import { useEffect, useState } from "react";
import { redirect } from 'next/navigation';
import { sendEmailVerification } from "firebase/auth";
import Button from "@/components/Button";

export default function VerifyEmail() {
  const { user } = useAuth(); 
  const [isEmailVerified, setIsEmailVerified] = useState(false);
  const [loading, setLoading] = useState(true);

  const verifyEmail = async () => {
    if (user && !user.emailVerified) {
      await sendEmailVerification(user);
    }
  };

  useEffect(() => {
    if (user) {
      setIsEmailVerified(user.emailVerified);

      const interval = setInterval(() => {
        if (user && user.emailVerified) {
          clearInterval(interval);
          setIsEmailVerified(true);
          redirect("/user/profile");
        }
      }, 3000); 

      return () => clearInterval(interval);
    }
  }, [user]);

  if (!user) {
    return <p>Loading...</p>;
  }

  return (
    <div className="flex items-center justify-center py-52 bg-gradient-to-r from-indigo-400 via-purple-500 to-pink-600">
      <div className="w-full max-w-md bg-white rounded-lg shadow-lg p-8">
        <h1 className="text-3xl font-semibold text-center text-gray-800 mb-6">
          Email not verified
        </h1>
        <p className="text-center text-gray-700 mb-6">
          Please verify your email by clicking the link sent to your address: <strong>{user?.email}</strong>
        </p>

        {!isEmailVerified && (
          <div className="text-center">
            <p className="text-sm text-gray-500 mb-4">
              You can also try resending the verification link.
            </p>
            <Button
              onClick={async () => {
                setLoading(true);
                try {
                  await verifyEmail();
                  setLoading(false);
                } catch (err) {
                  setLoading(false);
                  console.log("Error sending verification email");
                  console.log(err);
                }
              }}
              disabled={loading}
            >
              {loading ? 'Sending Verification Email...' : 'Resend Verification Email'}
            </Button>
          </div>
        )}

        {isEmailVerified && (
          <p className="text-center text-green-500 font-semibold mt-4">Your email is verified!</p>
        )}
      </div>
    </div>
  );
}
