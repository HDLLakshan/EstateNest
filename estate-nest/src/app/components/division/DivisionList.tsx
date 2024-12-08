'use client';

import React, { useMemo } from 'react';
import useSWR from 'swr';
import {
  MaterialReactTable,
  useMaterialReactTable,
  type MRT_ColumnDef,
} from 'material-react-table';
import { Division } from '@/app/models/division';
import Button from '../form/Button';
import { useRouter } from 'next/navigation';
import { fetcher } from '@/app/utils/fetcher';
import Link from 'next/link';

const DivisionList = () => {
  const router = useRouter();
  const { data, isLoading } = useSWR<Division[]>('/api/division', fetcher);

  const columns = useMemo<MRT_ColumnDef<Division>[]>(
    () => [
      {
        accessorKey: 'name',
        header: 'Division Name',
      },
      {
        accessorKey: 'code',
        header: 'Division Code',
      },
      {
        accessorKey: 'size',
        header: 'Size',
      },
    ],
    [],
  );

  const table = useMaterialReactTable({
    columns,
    data: data || [],
    state: {
      isLoading: isLoading,
    },
    renderTopToolbarCustomActions: () => (
      <Link href="/estate-management/manage">
        <Button className="ml-1">New Division</Button>
      </Link>
    ),
    muiTableBodyRowProps: ({ row }) => ({
      onClick: () => router.push(`/estate-management/manage/${row.original.id}`),
      sx: { cursor: 'pointer' },
    }),
  });

  return (
    <div className="mt-4">
      <MaterialReactTable table={table} />;
    </div>
  );
};

export default DivisionList;
