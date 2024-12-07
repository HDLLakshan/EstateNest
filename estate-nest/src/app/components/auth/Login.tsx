'use client';

import React from 'react';
import Image from 'next/image';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { toast } from 'react-toastify';
import Button from '../form/Button';
import InputField from '../form/InputField';

const loginSchema = z.object({
  email: z.string().email('Invalid email address'),
  password: z.string().min(6, 'Password must be at least 6 characters'),
});

type LoginFormValues = z.infer<typeof loginSchema>;

const Login = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginFormValues>({
    resolver: zodResolver(loginSchema),
  });

  const handleLogin = async (loginValues: LoginFormValues) => {
    const { email, password } = loginValues;

    try {
      const res = await fetch('/api/auth/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password }),
      });

      const data = await res.json();

      if (!res.ok) {
        toast(data.message || 'Login failed');
      } else {
        toast('Login successful');
        window.location.href = '/dashboard'; // Redirect on success
      }
    } catch (error) {
      console.log(error);
      toast('Something went wrong');
    }
  };

  return (
    <div className="flex min-h-full flex-1 flex-col justify-center px-6 py-12 lg:px-8">
      <div className="sm:mx-auto sm:w-full sm:max-w-sm">
        <Image
          alt="Estate Nest"
          src="/estatenest1.svg"
          width={160}
          height={160}
          className="mx-auto"
        />
        <h2 className="mt-10 text-center text-2xl/9 font-bold tracking-tight text-gray-900">
          Sign in to your account
        </h2>
      </div>

      <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
        <form onSubmit={handleSubmit(handleLogin)} className="space-y-6">
          <InputField
            id="email"
            type="email"
            label="Email address"
            {...register('email')} // Integrate with React Hook Form
            placeholder="Enter your email"
          />
          {errors.email && <p className="text-sm text-red-600">{errors.email.message}</p>}

          <InputField
            id="password"
            type="password"
            label="Password"
            {...register('password')} // Integrate with React Hook Form
            placeholder="Enter your password"
          />
          {errors.password && (
            <p className="text-sm text-red-600">{errors.password.message}</p>
          )}

          <Button type="submit">Sign in</Button>
        </form>
      </div>
    </div>
  );
};

export default Login;
