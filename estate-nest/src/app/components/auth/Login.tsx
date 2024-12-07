'use client';

import React from 'react';
import Image from 'next/image';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import Button from '../form/Button';
import InputField from '../form/InputField';
import { toastify } from '../Toast';
import { LoadingSVG } from '../form/Loading';

const loginSchema = z.object({
  email: z.string().email('Invalid email address'),
  password: z.string().min(6, 'Password must be at least 6 characters'),
});

type LoginFormValues = z.infer<typeof loginSchema>;

const Login = () => {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
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

      if (!res.ok) toastify(data.message || 'Login failed');
      else window.location.href = '/dashboard';
    } catch (error) {
      console.log(error);
      toastify('Something went wrong');
    }
  };

  return (
    <div className="w-full max-w-sm p-4 bg-white border border-primary-light rounded-lg shadow sm:p-6 md:p-8 dark:bg-primary-dark dark:border-gray-700 m-auto">
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
            {...register('email')}
            placeholder="Enter your email"
            error={errors?.email?.message}
            disabled={isSubmitting}
          />

          <InputField
            id="password"
            type="password"
            label="Password"
            {...register('password')}
            placeholder="Enter your password"
            error={errors?.password?.message}
            disabled={isSubmitting}
          />

          <Button type="submit" disabled={isSubmitting}>
            {isSubmitting ? <LoadingSVG text="Sign in ..." /> : 'Sign in'}
          </Button>
        </form>
      </div>
    </div>
  );
};

export default Login;
