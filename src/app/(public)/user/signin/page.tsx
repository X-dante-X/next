"use client";
import Button from "@/components/Button";
import InputField from "@/components/InputField";
import { signInWithEmailAndPassword, setPersistence, browserSessionPersistence } from "firebase/auth";
import { getAuth } from "firebase/auth";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { useState } from "react";

interface FormData {
  email: string;
  password: string;
}

export default function SignInForm() {
  const auth = getAuth();
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [authError, setAuthError] = useState<string | null>(null);
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormData>();

  const onSubmit = async (data: FormData) => {
    const { email, password } = data;
    setLoading(true);
    setAuthError(null);

    try {
      await setPersistence(auth, browserSessionPersistence);
      await signInWithEmailAndPassword(auth, email, password);
      router.push("/user/profile");
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (error: any) {
      setAuthError(error!.message || "An error occurred. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex items-center justify-center py-52 bg-gradient-to-r from-teal-400 via-blue-500 to-indigo-600">
      <div className="w-full max-w-md bg-white rounded-lg shadow-lg p-8">
        <h1 className="text-3xl font-semibold text-center text-gray-800 mb-6">Sign In</h1>
        <form
          onSubmit={handleSubmit(onSubmit)}
          className="space-y-4">
          <InputField
            type="email"
            label="Email"
            id="email"
            {...register("email", { required: "Email is required" })}
            error={errors.email?.message}
          />

          <InputField
            type="password"
            label="Password"
            id="password"
            {...register("password", { required: "Password is required" })}
            error={errors.password?.message}
          />

          {authError && <p className="text-red-600 text-sm text-center">{authError}</p>}

          <Button
            type="submit"
            disabled={loading}>
            {loading ? "Signing In..." : "Sign In"}
          </Button>
        </form>
      </div>
    </div>
  );
}
