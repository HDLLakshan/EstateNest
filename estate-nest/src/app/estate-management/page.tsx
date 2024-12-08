import React from 'react';
import { PageTitle } from '../components/typography';
import DivisionList from '../components/division/DivisionList';

const Estate = async () => (
  <div className="w-full">
    <PageTitle title="Estate Divisions" />
    <DivisionList />
  </div>
);

export default Estate;
