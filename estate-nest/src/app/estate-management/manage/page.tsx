import DivisionForm from '@/app/components/division/DivisionForm';
import { PageTitle } from '@/app/components/typography';
import React from 'react';

const Estate = async () => (
  <div className="w-full">
    <PageTitle title="Add Division" />
    <DivisionForm />
  </div>
);

export default Estate;
