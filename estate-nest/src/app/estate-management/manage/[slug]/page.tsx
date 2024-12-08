import DivisionForm from '@/app/components/division/DivisionForm';
import { PageTitle } from '@/app/components/typography';
import React from 'react';

interface PageProps {
  params: {
    slug: string;
  };
}

const Estate: React.FC<PageProps> = async ({ params }) => {
  const { slug } = await params;
  return (
    <div className="w-full">
      <PageTitle title="Edit Division" />
      <DivisionForm id={slug} />
    </div>
  );
};

export default Estate;
