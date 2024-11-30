import { NextPage } from 'next';

import { SEO } from '@/components';
import EarnDetails from '@/views/earn/details';

const EarnDetailsPage: NextPage = () => {
  return (
    <>
      <SEO pageTitle="Earn Details" />
      <EarnDetails />
    </>
  );
};

export default EarnDetailsPage;
