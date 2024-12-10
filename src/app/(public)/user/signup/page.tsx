'use client'
import { useState } from 'react';
import { createUserWithEmailAndPassword, getAuth, sendEmailVerification } from "firebase/auth";
import { redirect } from 'next/navigation';
import Button from '@/components/Button';
import InputField from '@/components/InputField';
import { useForm } from 'react-hook-form';

interface FormData {
  email: string;
  password: string;
  confirmPassword: string;
}

export default function SignUpForm() {
  const { register, handleSubmit, formState: { errors } } = useForm<FormData>();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleSignUp = async (data: FormData) => {
    setLoading(true);
    setError(null);

    if (data.password !== data.confirmPassword) {
      setError("Passwords do not match.");
      setLoading(false);
      return;
    }

    const auth = getAuth();

    try {
      await createUserWithEmailAndPassword(auth, data.email, data.password);
      console.log("User registered!");
      if (auth.currentUser) {
        sendEmailVerification(auth.currentUser)
          .then(() => {
            console.log("Email verification sent!");
            redirect("/user/verify");
          });
      } else {
        setError("User not found.");
      }
    } catch (error) {
      if (error instanceof Error) {
        setError(error.message);
      } else {
        setError('An unknown error occurred');
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex items-center justify-center py-52 bg-gradient-to-r from-indigo-400 via-purple-500 to-pink-600">
      <div className="w-full max-w-md bg-white rounded-lg shadow-lg p-8">
        <h1 className="text-3xl font-semibold text-center text-gray-800 mb-6">Sign Up</h1>
        <form onSubmit={handleSubmit(handleSignUp)} className="space-y-4">
          
          <InputField
            type="email"
            label="Email"
            id="email"
            {...register('email', { required: 'Email is required' })}
            error={errors.email?.message}
          />

          <InputField
            type="password"
            label="Password"
            id="password"
            {...register('password', { required: 'Password is required' })}
            error={errors.password?.message}
            placeholder="********"
          />

          <InputField
            type="password"
            label="Confirm Password"
            id="confirmPassword"
            {...register('confirmPassword', { required: 'Confirm password is required' })}
            error={errors.confirmPassword?.message}
            placeholder="********"
          />

          {error && <p className="text-red-500 text-sm">{error}</p>}

          <Button type="submit" disabled={loading}>
            {loading ? 'Signing up...' : 'Sign Up'}
          </Button>
        </form>
      </div>
    </div>
  );
}
