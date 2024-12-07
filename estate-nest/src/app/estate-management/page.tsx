import React from 'react';
import { PageTitle } from '../components/typography';
import AddDivision from '../components/division/AddDivision';

const Estate = async () => (
  <div className="w-full">
    <PageTitle title="Estate Management" />
    <AddDivision />
  </div>
);

export default Estate;
