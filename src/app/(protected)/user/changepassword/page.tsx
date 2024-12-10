"use client";
import { useState } from "react";
import { EmailAuthProvider, reauthenticateWithCredential, updatePassword } from "firebase/auth";
import { useAuth } from "@/lib/AuthContext";
import { useRouter } from "next/navigation";
import Button from "@/components/Button";
import InputField from "@/components/InputField";
import { useForm } from "react-hook-form";

export default function ChangePassword() {
  const { user } = useAuth();
  const router = useRouter();
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm({
    defaultValues: {
      oldPassword: "",
      newPassword: "",
      confirmPassword: "",
    },
  });

  const newPassword = watch("newPassword");

  const onSubmit = async (data: { oldPassword: string; newPassword: string; confirmPassword: string }) => {
    setLoading(true);
    setError(null);

    if (!user || !user.email) {
      setError("You must be logged in to change your password.");
      setLoading(false);
      return;
    }

    if (data.newPassword !== data.confirmPassword) {
      setError("New passwords do not match.");
      setLoading(false);
      return;
    }

    try {
      const credential = EmailAuthProvider.credential(user.email, data.oldPassword);
      await reauthenticateWithCredential(user, credential);
      await updatePassword(user, data.newPassword);

      router.push("/user/profile");
    } catch (error) {
      if (error instanceof Error) {
        setError(error.message);
      } else {
        setError("An unknown error occurred");
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex items-center justify-center py-52 bg-gradient-to-r from-green-400 via-blue-500 to-purple-600">
      <div className="w-full max-w-lg bg-white rounded-lg shadow-lg p-8">
        <h1 className="text-3xl font-semibold text-center text-gray-800 mb-6">Change Password</h1>
        <form
          onSubmit={handleSubmit(onSubmit)}
          className="space-y-4">
          <InputField
            label="Old Password"
            type="password"
            placeholder="Enter your old password"
            {...register("oldPassword", { required: "Old password is required" })}
            error={errors.oldPassword?.message}
          />
          <InputField
            label="New Password"
            type="password"
            placeholder="Enter your new password"
            {...register("newPassword", {
              required: "New password is required",
              minLength: { value: 6, message: "Password must be at least 6 characters" },
            })}
            error={errors.newPassword?.message}
          />
          <InputField
            label="Confirm Password"
            type="password"
            placeholder="Confirm your new password"
            {...register("confirmPassword", {
              required: "Confirm password is required",
              validate: (value) => value === newPassword || "Passwords do not match",
            })}
            error={errors.confirmPassword?.message}
          />

          {error && <p className="text-red-500 text-sm">{error}</p>}

          <Button
            type="submit"
            disabled={loading}>
            {loading ? "Changing password..." : "Change Password"}
          </Button>
        </form>
      </div>
    </div>
  );
}
