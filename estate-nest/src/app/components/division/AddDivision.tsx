'use client';

import React from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import InputField from '../form/InputField';
import Button from '../form/Button';
import { LoadingSVG } from '../form/Loading';
import { toastify } from '../Toast';

const divisionSchema = z.object({
  name: z.string(),
  code: z.string(),
  size: z.number(),
  numberOfPlants: z.number(),
  targetKlios: z.number(),
});

type divisionFormValues = z.infer<typeof divisionSchema>;

const AddDivision = () => {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<divisionFormValues>({
    resolver: zodResolver(divisionSchema),
  });

  const onSubmit = async (divisionValues: divisionFormValues) => {
    const { name, code, size, numberOfPlants, targetKlios } = divisionValues;

    try {
      const res = await fetch('/api/division', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name, code, size, numberOfPlants, targetKlios }),
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
    <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
        <InputField
          id="name"
          type="text"
          label="Division Name"
          {...register('name')}
          placeholder="Enter your email"
          error={errors?.name?.message}
          disabled={isSubmitting}
        />

        <InputField
          id="code"
          type="text"
          label="code"
          {...register('code')}
          placeholder="Enter code for the division"
          error={errors?.code?.message}
          disabled={isSubmitting}
        />

        <InputField
          id="size"
          type="number"
          label="Division Size"
          {...register('size', { valueAsNumber: true })}
          placeholder="Size of the division"
          error={errors?.size?.message}
          disabled={isSubmitting}
        />

        <InputField
          id="numberOfPlants"
          type="number"
          label="Number Of Plants"
          {...register('numberOfPlants', { valueAsNumber: true })}
          placeholder="Number Of Plants in the Division Size"
          error={errors?.numberOfPlants?.message}
          disabled={isSubmitting}
        />

        <InputField
          id="targetKlios"
          type="number"
          label="Target Kilos"
          {...register('targetKlios', { valueAsNumber: true })}
          placeholder="Target Klios from the division"
          error={errors?.size?.message}
          disabled={isSubmitting}
        />

        <Button type="submit" disabled={isSubmitting}>
          {isSubmitting ? <LoadingSVG text="Submit ..." /> : 'Submit'}
        </Button>
      </form>
    </div>
  );
};

export default AddDivision;
