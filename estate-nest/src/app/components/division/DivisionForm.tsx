'use client';

import React from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import InputField from '../form/InputField';
import Button from '../form/Button';
import { LoadingSVG } from '../form/Loading';
import { toastify } from '../Toast';
import { Division } from '@/app/models/division';
import useSWR from 'swr';
import { fetcher } from '@/app/utils/fetcher';

const divisionSchema = z.object({
  name: z.string(),
  code: z.string(),
  size: z.number(),
  numberOfPlants: z.number(),
  targetKilos: z.number(),
});

const DivisionForm = ({ id }: { id?: string }) => {
  const { data, isLoading } = useSWR<Division>(
    id ? `/api/division/${id}` : null,
    fetcher,
  );

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<Division>({
    resolver: zodResolver(divisionSchema),
    values: data as Division,
  });

  const onSubmit = async (divisionValues: Division) => {
    const { name, code, size, numberOfPlants, targetKilos } = divisionValues;

    try {
      const res = await fetch(id ? `/api/division/${id}` : '/api/division', {
        method: id ? 'PUT' : 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name, code, size, numberOfPlants, targetKilos }),
      });

      const data = await res.json();

      if (!res.ok) toastify(data.message || 'Division saved failed');
      else window.location.href = '/estate-management';
    } catch (error) {
      console.log(error);
      toastify('Something went wrong');
    }
  };

  const loading = isSubmitting || isLoading;

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
          disabled={loading}
        />

        <InputField
          id="code"
          type="text"
          label="code"
          {...register('code')}
          placeholder="Enter code for the division"
          error={errors?.code?.message}
          disabled={loading}
        />

        <InputField
          id="size"
          type="number"
          label="Division Size"
          {...register('size', { valueAsNumber: true })}
          placeholder="Size of the division"
          error={errors?.size?.message}
          disabled={loading}
        />

        <InputField
          id="numberOfPlants"
          type="number"
          label="Number Of Plants"
          {...register('numberOfPlants', { valueAsNumber: true })}
          placeholder="Number Of Plants in the Division Size"
          error={errors?.numberOfPlants?.message}
          disabled={loading}
        />

        <InputField
          id="targetKlios"
          type="number"
          label="Target Kilos"
          {...register('targetKilos', { valueAsNumber: true })}
          placeholder="Target Klios from the division"
          error={errors?.size?.message}
          disabled={loading}
        />

        <Button type="submit" disabled={loading}>
          {loading ? <LoadingSVG text="Loading ..." /> : 'Submit'}
        </Button>
      </form>
    </div>
  );
};

export default DivisionForm;
