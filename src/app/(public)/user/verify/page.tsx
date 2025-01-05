"use client";

import { useAuth } from "@/lib/AuthContext";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { sendEmailVerification } from "firebase/auth";
import Button from "@/components/Button";

export default function VerifyEmail() {
  const { user } = useAuth();
  const [isEmailVerified, setIsEmailVerified] = useState(false);
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const verifyEmail = async () => {
    if (user && !user.emailVerified) {
      try {
        await sendEmailVerification(user);
        alert("Verification email sent!");
      } catch (err) {
        console.error("Error sending verification email", err);
      }
    }
  };

  useEffect(() => {
    if (user) {
      const checkEmailVerification = async () => {
        await user.reload();
        if (user.emailVerified) {
          setIsEmailVerified(true);
          router.push("/user/profile");
        }
      };

      const interval = setInterval(checkEmailVerification, 3000);
      return () => clearInterval(interval);
    }
  }, [user, router]);

  if (!user) {
    return <p>Loading...</p>;
  }

  return (
    <div className="flex items-center justify-center py-52 bg-gradient-to-r from-indigo-400 via-purple-500 to-pink-600">
      <div className="w-full max-w-md bg-stone-950 rounded-lg shadow-lg p-8">
        <h1 className="text-3xl font-semibold text-center text-slate-200 mb-6">Email not verified</h1>
        <p className="text-center text-gray-400 mb-6">
          Please verify your email by clicking the link sent to your address: <strong>{user?.email}</strong>
        </p>

        {!isEmailVerified && (
          <div className="text-center">
            <p className="text-sm text-gray-300 mb-4">You can also try resending the verification link.</p>
            <Button
              onClick={async () => {
                setLoading(true);
                await verifyEmail();
                setLoading(false);
              }}
              disabled={loading}>
              {loading ? "Sending..." : "Resend Verification Email"}
            </Button>
          </div>
        )}

        {isEmailVerified && <p className="text-center text-green-500 font-semibold mt-4">Your email is verified! Redirecting...</p>}
      </div>
    </div>
  );
}
