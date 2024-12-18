"use client";

import { useAuth } from "@/lib/AuthContext";
import { updateProfile } from "firebase/auth";
import { getAuth } from "firebase/auth";
import Image from "next/image";
import { redirect } from "next/navigation";
import { useState } from "react";
import InputField from "@/components/InputField";
import { IUserData } from "@/types/user.types";
import DropZone from "@/components/DropZone";
import Button from "@/components/Button";
import { useForm, Controller } from "react-hook-form";
import { useUserData } from "../hooks/useUserData";
import { useUpdateUserData } from "../hooks/useUpdateUserData";
import { SkeletonAvatar, SkeletonField } from "@/components/Skeleton";

interface FormData {
  username: string;
  email: string;
  userData: IUserData;
}

export default function UpdateProfile() {
  const { user, isLoading: authLoading } = useAuth();
  const auth = getAuth();
  const [avatar, setAvatar] = useState<string>(user?.photoURL || "/avatar.jpg");
  const { userData, isLoading: userDataLoading } = useUserData(user?.uid);

  const isLoading = authLoading || userDataLoading;

  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<FormData>();
  const { updateUserData, isUpdating } = useUpdateUserData(userData);

  const onSubmit = async (data: FormData) => {
    try {
      if (data.username !== user?.displayName || avatar !== user?.photoURL) {
        if (auth.currentUser) {
          await updateProfile(auth.currentUser, {
            displayName: data.username,
            photoURL: avatar,
          });
        }
      }

      await updateUserData(data.userData);
    } catch (error) {
      console.error("Error updating profile:", error);
    }
    redirect("profile");
  };

  const handleAvatarChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const avatarUrl = URL.createObjectURL(file);
      setAvatar(avatarUrl);
    }
  };

  return (
    <div className="flex items-center justify-center py-16 bg-gradient-to-r from-teal-400 via-blue-500 to-indigo-600">
      <div className="w-full max-w-md bg-stone-950 rounded-lg shadow-lg p-8">
        <h1 className="text-3xl font-semibold text-center text-slate-200 mb-6">Update Profile</h1>
        <form
          onSubmit={handleSubmit(onSubmit)}
          className="space-y-6">
          <div className="flex justify-center">
            {!user || isLoading ? (
              <SkeletonAvatar className="w-12 h-12 mb-4" />
            ) : (
              <Image
                src={avatar}
                alt="Profile"
                width={48}
                height={48}
                className="object-cover w-12 h-12 rounded-full mb-4"
              />
            )}
          </div>

          <DropZone onChange={handleAvatarChange} />
          {!user || isLoading ? (
            <SkeletonField />
          ) : (
            <Controller
              name="username"
              control={control}
              defaultValue={user.displayName || ""}
              render={({ field }) => (
                <InputField
                  {...field}
                  label="Username"
                  type="text"
                  placeholder={user?.displayName || "John Doe"}
                  error={errors.username?.message}
                />
              )}
            />
          )}

          {!user || isLoading ? (
            <SkeletonField />
          ) : (
            <Controller
              name="email"
              control={control}
              defaultValue={user.email || ""}
              render={({ field }) => (
                <InputField
                  {...field}
                  label="Email"
                  type="email"
                  placeholder={user?.email || "example@email.com"}
                  error={errors.email?.message}
                />
              )}
            />
          )}
          {!user || isLoading ? (
            <SkeletonField />
          ) : (
            <Controller
              name="userData.city"
              control={control}
              defaultValue={userData?.city || ""}
              render={({ field }) => (
                <InputField
                  {...field}
                  label="City"
                  type="text"
                  placeholder="Enter your city"
                  error={errors.userData?.city?.message}
                />
              )}
            />
          )}
          {!user || isLoading ? (
            <SkeletonField />
          ) : (
            <Controller
              name="userData.street"
              control={control}
              defaultValue={userData?.street || ""}
              render={({ field }) => (
                <InputField
                  {...field}
                  label="Street"
                  type="text"
                  placeholder="Enter your street"
                  error={errors.userData?.street?.message}
                />
              )}
            />
          )}
          {!user || isLoading ? (
            <SkeletonField />
          ) : (
            <Controller
              name="userData.zipCode"
              control={control}
              defaultValue={userData?.zipCode || ""}
              render={({ field }) => (
                <InputField
                  {...field}
                  label="Zip-code"
                  type="text"
                  placeholder="Enter your zip-code"
                  error={errors.userData?.zipCode?.message}
                />
              )}
            />
          )}

          <Button
            type="submit"
            disabled={isUpdating}>
            {isUpdating ? "Updating..." : "Update Profile"}
          </Button>
        </form>
      </div>
    </div>
  );
}
